const report_status = new Map<string, any>([
  ["1", { value: 1, text: "草稿", label: "草稿", title: "草稿" }],
  [
    "2",
    { value: 2, text: "举报人录入", label: "举报人录入", title: "举报人录入" }
  ],
  [
    "3",
    {
      value: 3,
      text: "执法办经办审核",
      label: "执法办经办审核",
      title: "执法办经办审核"
    }
  ],
  [
    "4",
    {
      value: 4,
      text: "电力设施产权人核实",
      label: "电力设施产权人核实",
      title: "电力设施产权人核实"
    }
  ],
  ["5", { value: 5, text: "归档", label: "归档", title: "归档" }],
  ["6", { value: 6, text: "不受理", label: "不受理", title: "不受理" }]
]);

enum Role {
  ROLE_HANDLE = "ROLE_HANDLE",
  ROLE_PROPERTY_RIGHT = "ROLE_PROPERTY_RIGHT"
}

const getStatus = (status: number) => {
  switch (status) {
    case 2:
      return "举报人录入";
    case 3:
      return "执法办经办处理中";
    case 4:
      return "电力设施产权人处理中";
    // case 4:
    //   return "执法办经办处理中";
    case 5:
    case 6:
      return "执法办经办处理中";
    // case 5:
    //   return "已完结";
    case 7:
      return "已完结";
    case 8:
      return "已拒绝";
  }
  return "草稿";
};

const getSource = (source: any) => {
  if (!source) {
    return;
  }
  switch (source) {
    case 2:
      return "电话举报";
    case 3:
      return "其他平台转办";
  }
  return "电力企业自主提报";
};

export default { getStatus, getSource };
