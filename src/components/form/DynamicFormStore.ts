import { CollapseFormInfo, FormInfo } from "./useDynamicForm";
import { defineStore } from "pinia";
import Api from "../../http/Api";
import { HidInfoEntity } from "../../types/HidEntity";
import { ExterInfoEntity } from "../../types/ExterEntity";
import { ActivityEntity } from "../../types/ActivityEntity";

/**
 * 动态表单
 */
export const useFormStore = defineStore("formStore", {
  state: () => {
    return {
      // formEntitys: "", //Array<FormEntity>转换成字符串
      formInfos: new Array<FormInfo>()
    };
  },
  actions: {
    saveForm(formInfos: Array<FormInfo>) {
      this.formInfos = formInfos;
    }
  }
});

export const useCollapseFormInfoStore = defineStore("collapseFormStore", {
  state: () => {
    return {
      collapseFormInfos: new Array<CollapseFormInfo>()
    };
  },
  actions: {
    saveForm(collapseFormInfos: Array<CollapseFormInfo>) {
      this.collapseFormInfos = collapseFormInfos;
    }
  }
});

/**
 * 流程数据
 */
export const useActivityStore = defineStore("activityStore", {
  state: () => {
    return {
      activityEntity: new ActivityEntity(),
      hidInfoEntity: new HidInfoEntity(),
      exterInfoEntity: new ExterInfoEntity()
    };
  },
  actions: {
    async getActivityInfo(instanceId: string) {
      const apiResponse = await Api.getActivity(instanceId);
      if (apiResponse.success) {
        this.activityEntity = apiResponse.data;
      }
    }
  },
  getters: {
    getActivity: state => state.activityEntity
  }
});
