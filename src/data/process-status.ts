export const PROCESS_TROUBLE = {
  STEP_1: 1, // draft
  STEP_2: 2, // userTask1 电力设施产权人提报
  STEP_3: 3, // userTask2 执法办经办审核
  STEP_4: 4, // userTask3 执法办负责人审核
  STEP_5: 5, // userTask4 执法办经办处置
  STEP_6: 6, // userTask6 电力设施产权人核实
  STEP_7: 7, // end 归档
};

export const PROCESS_BROKEN = {
  STEP_1: 1, // userTask1 电力设施产权人提报
  STEP_2: 2, // userTask2 执法办经办审核
  STEP_3: 3, // userTask3 执法办负责人审核
  STEP_4: 4, // userTask4 执法办经办处置
  STEP_5: 5, // userTask5 行政立案申请
  // STEP_5x: 12, // userTask5 公安受理反馈
  STEP_6: 6, // userTask6 行政立案调查
  STEP_7: 7, // userTask7 行政立案结案
  STEP_8: 8, // userTask8 电力设施产权人处置
  STEP_9: 9 // end 归档
};