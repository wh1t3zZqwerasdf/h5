//通知管理页面列表请求type
export type noticeListData = {
    //页数
    page: number;
    //页码
    size: number;
    //标题
    tittle?: string;
    //提报单位
    sourceUnit?: string;
    //发布时间
    sendTime?:string;
    //通知的类型
    infoType?:number;
    //通知内容
    infoInit?:string;
    //接受单位
    objUnits?:string;
  };
  
  //通知列表返回的类型
  export type noticeListReturnData = {
    //会议id
    id:string;
    //标题
    title:string;
    //通知的类型 0 会议通知  1保护区消息
    busType?:number;
    //发布单位id
    sender: string;
    //发布状态
    sendStatus: number; //0未发起  1已发起  2已撤回
    //发布时间
    SendTime:string;
    //通知内容
    msgContent:string;
    //接收单位id
    userIds:string;
    //是否定时发送
    SendTimeBool:number



    // // 以下是头部通知的额外参数需求
    // read: number;//消息是否已读 1已读 0未读
    // managerType: number;//是否进行了处理 1已进行 0未进行 
    // readTime?: string,//通知已读的时间
    // managerTime?: string,//进行处理的时间
  };

 
    // 新增/修改 通知类型
    export type addNotice = {
        //修改时id
        id?: string;
        //发布单位name
        sender:string;
        //发布单位id
        orgId:string
        //通知类型
        busType:string;
        //接受单位
        userIds:string;
        //标题
        tittle:string;
            //内容
        content:string;
        //     //附件
        // accessory:string;
            //发布时间
        sendTime:string;
        //是否定时发送
        sendTimeBool:number;
        //通知对象类型
        msgType:string
    };