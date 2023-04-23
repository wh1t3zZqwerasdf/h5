import { useSystemStore } from '@/store';
import {
  FormPropGroupType,
  FormPropType,
  PropType,
  StructureClassInfo,
  StructureClassTree
} from '@/types';
import { deepClone } from '@/utils';
export function useTroubleBrokenFieldsSet() {
  const systemStore = useSystemStore();
  const checkOptionsMap = reactive({});
  const checkValueList = ref<string[]>([]);
  const businessType = ref('trouble');
  const businessTypeMap = {
    trouble: {
      text: '隐患',
      fieldsMap: {
        typeData: 'hiddenTypeData',
        fileData: 'hiddenTroubleHarmonizeFile',
        check: 'hiddenTroubleHarmonize',
        checkData: 'hiddenTroubleHarmonizeData'
      }
    },
    exter: {
      text: '外破',
      fieldsMap: {
        typeData: 'exterTypeData',
        fileData: 'siteSituationFile',
        check: 'siteSituation',
        checkData: 'siteSituationData'
      }
    }
  };

  const title = computed(() => businessTypeMap[businessType.value].text);
  const fieldsMap = computed(
    () => businessTypeMap[businessType.value].fieldsMap
  );
  const typeDataFields = computed(() => fieldsMap.value.typeData);
  const checkFields = computed(() => fieldsMap.value.check);
  const checkDataFields = computed(() => fieldsMap.value.checkData);
  const fileDataFields = computed(() => fieldsMap.value.fileData);

  /**
   * @Description: 获取处理后的动态字段和
   * @author ZZH
   * @params data: 选中的隐患/外破类型子级数据
   * @date 2023/3/2
   * @return 处理后的动态字段和勾选项
   */
  const getFormFieldsAndCheckData = (data: StructureClassInfo) => {
    const checkOptionsData = data.systemStructureClassDisposeViews;
    const fieldsList = data.systemStructureClassTypes;
    // 勾选项
    const checkOptions = checkOptionsData.map(item => ({
      label: item.name,
      value: item.id,
      children: item.children
    }));
    // 动态字段
    const fieldGroup = {
      title: fieldsList.length ? `${title.value}类型-${data.name}` : '',
      group: fieldsList.map(item => {
        const fieldsItem: FormPropType = {
          label: item.name,
          type: item.formType as PropType,
          name: `dynamic-hiddenTypeData-${item.id}`,
          required: Boolean(item.required),
          rules: item.required ? [{ required: true }] : []
        };
        if (item.dictCode) fieldsItem.options = systemStore.dict[item.dictCode];

        // 文件上传配置
        if (item.formType?.indexOf('upload') !== -1) {
          fieldsItem.uploadConfig = { limit: item.limit || 1000 };
          if (item.accept || item.tipText) {
            fieldsItem.uploadConfig = {
              accept: item.accept ? getFileAccept(JSON.parse(item.accept)) : [],
              tipText: item.tipText,
              limit: item.limit || 1000
            };
          }
        }
        // 时间选择限制放开
        if (item.formType?.indexOf('date-picker') !== -1) {
          fieldsItem.daterangeConfig = {
            startDisabledDate: (date, formData) => {
              const nowDate = new Date().getTime();
              const day = 24 * 60 * 60 * 1000;
              return new Date(nowDate - 1000 * day);
            }
          };
        }

        return fieldsItem;
      })
    };

    setCheckOptionMap(checkOptionsData);

    return { checkOptions, fieldGroup };
  };

  /**
   * @Description: 获取处置情况勾选子级表单动态字段
   * @author ZZH
   * @date 2023/3/2
   */
  const getCheckFormFields = (data: StructureClassTree[]) => {
    const checkFormList = data
      .filter(item => item)
      .map((item, index: number) => {
        const id = item.id || item.value;
        return {
          name: `checkFields-${index}`,
          title: item.children.length
            ? `处置情况-${item.name || item.label}`
            : '',
          group: item.children.map(fields => {
            console.log(fields);
            const fieldsId = fields.id || fields.value;
            const fieldsItem: FormPropType = {
              label: fields.name || (item.label as string),
              type: fields.formType as PropType,
              name: `checkDynamic-${id}-${fieldsId}${
                fields.formType?.indexOf('upload') !== -1 ? '-upload' : ''
              }`,
              required: Boolean(fields.required),
              rules: fields.required ? [{ required: true }] : []
            };
            if (item.dictCode)
              fieldsItem.options = systemStore.dict[item.dictCode];
            if (fields.formType?.indexOf('upload') !== -1) {
              fieldsItem.uploadConfig = { limit: fields.limit || 1000 };
              if (fields.accept || fields.tipText) {
                fieldsItem.uploadConfig = {
                  accept: fields.accept
                    ? getFileAccept(JSON.parse(fields.accept))
                    : [],
                  tipText: fields.tipText,
                  limit: fields.limit || 1000
                };
              }
            }
            // 时间选择限制放开
            if (fields.formType?.indexOf('date-picker') !== -1) {
              fieldsItem.daterangeConfig = {
                startDisabledDate: (date, formData) => {
                  const nowDate = new Date().getTime();
                  const day = 24 * 60 * 60 * 1000;
                  return new Date(nowDate - 1000 * day);
                }
              };
            }

            if (fields.formType === 'daterange-picker') {
              fieldsItem.layoutProps = {
                span: 24
              };
            }

            return fieldsItem;
          })
        };
      })
      .filter(item => item.group.length);
    return checkFormList;
  };

  /**
   * @Description: 重置勾选生成的动态字段
   * @author ZZH
   * @param dialogPropsGroup: 表单字段结构
   * @date 2023/3/2
   */
  const resetCheckFormFields = (dialogPropsGroup: FormPropGroupType[]) => {
    for (let i = 0; i < dialogPropsGroup.length; i++) {
      const item = dialogPropsGroup[i];
      if (item.name.indexOf('checkFields-') !== -1) {
        dialogPropsGroup.splice(i, 1);
        i -= 1;
      }
    }
  };

  /**
   * @Description: 清除表单动态字段数据
   * @author ZZH
   * @date 2023/3/3
   */
  const resetFormData = (formData: { [key: string]: any }) => {
    for (const key in formData) {
      const item = formData[key];
      const keyArr = key.split('-');
      if (['dynamic', 'checkDynamic'].includes(keyArr[0])) delete formData[key];
    }
    formData[checkFields.value] = '';
    return formData;
  };

  /**
   * @Description: 表单提交前的数据处理
   * @author ZZH
   * @date 2023/3/3
   */
  const submitDataFilter = (formData: { [key: string]: any }) => {
    formData = deepClone(formData);
    if (formData.arrayUserTask) return submitArrayDataFilter(formData);

    formData[fileDataFields.value] = [];
    for (const key in formData) {
      const item = formData[key];
      const keyArr = key.split('-');
      // 隐患类型动态字段处理
      if (keyArr.includes('hiddenTypeData')) {
        formData[typeDataFields.value]
          ? (formData[typeDataFields.value][key] = item)
          : (formData[typeDataFields.value] = { [key]: item });
        delete formData[key];
      }

      // 勾选项的动态字段
      if (keyArr.includes('checkDynamic')) {
        formData[checkDataFields.value]
          ? ''
          : (formData[checkDataFields.value] = {});
        formData[checkDataFields.value][keyArr[1]]
          ? (formData[checkDataFields.value][keyArr[1]][key] = item)
          : (formData[checkDataFields.value][keyArr[1]] = {
              [key]: item
            });
        delete formData[key];
      }

      // 后端需要的文件字段冗余
      if (keyArr.includes('upload'))
        formData[fileDataFields.value].push(...item);
    }
    return formData;
  };

  function submitArrayDataFilter(formData: { [key: string]: any }) {
    const lastArrayItem =
      formData.arrayUserTask[formData.arrayUserTask.length - 1]
        .sevenDisposeSituationData;
    formData.sevenDisposeSituation = lastArrayItem?.sevenDisposeSituation;
    formData['sevenDisposeSituationFile'] = [];
    for (const key in lastArrayItem) {
      const item = lastArrayItem[key];
      const keyArr = key.split('-');

      // 后端需要的文件字段冗余
      if (keyArr.includes('upload'))
        formData['sevenDisposeSituationFile'].push(...item);
    }

    return formData;
  }

  const viewDataFilter = (formData: { [key: string]: any }) => {
    let typeData = formData[typeDataFields.value];
    let checkData = formData[checkDataFields.value];
    if (typeof typeData === 'string') typeData = JSON.parse(typeData);

    if (typeof checkData === 'string') checkData = JSON.parse(checkData);

    formData = Object.assign({}, formData, typeData);
    for (const key in checkData)
      formData = Object.assign(formData, checkData[key]);

    delete formData[typeDataFields.value];
    delete formData[checkDataFields.value];
    return formData;
  };

  /**
   * @Description: check数组转map
   * @author ZZH
   * @date 2023/3/2
   */
  const setCheckOptionMap = (checkOptions: StructureClassTree[]) => {
    checkOptions.forEach(item => {
      checkOptionsMap[item.id] = item;
    });
  };

  function getFileAccept(Accept: string[]) {
    const fileTypeArr: string[] = [];
    const fileTypeMap = {
      image: ['image/jpeg', 'image/jpg', 'image/png'],
      pdf: ['.pdf', 'application/pdf'],
      word: [
        '.doc',
        '.docx',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
    };
    Accept?.forEach(item => {
      fileTypeArr.push(...fileTypeMap[item]);
    });
    return fileTypeArr;
  }

  return {
    checkValueList,
    checkOptionsMap,
    getFormFieldsAndCheckData,
    getCheckFormFields,
    resetCheckFormFields,
    resetFormData,
    viewDataFilter,
    submitDataFilter,
    businessType
  };
}
