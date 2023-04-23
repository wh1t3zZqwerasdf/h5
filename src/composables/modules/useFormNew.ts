import type {
    BooleanAndFn,
    FormConfigType,
    FormOptionsType,
    FormPropGroupType,
    FormPropType,
    SelectOptionType,
    ValidateCbNameType,
} from '@/types';
import type {FormInstance} from 'vant';
import Schema, {Rules, ValidateError} from 'async-validator';
import _ from 'lodash';

export const FORM_CONFIG: FormConfigType = {
    inline: false,
    labelWidth: '124px',
    disabled: false,
};

export function useFormNew(config?: FormConfigType) {
    const formData = ref<any>({});

    const formInstance = ref<FormInstance>();

    // const formRef = ref<any>();
    function setFormInstance(instance: FormInstance | undefined) {
        if (!instance) return;
        formInstance.value = instance;
    }

    const formConfig = ref<FormConfigType>(
        Object.assign({}, FORM_CONFIG, config)
    );

    // 设置表单配置
    function setFormConfig(config: FormConfigType) {
        formConfig.value = Object.assign({}, FORM_CONFIG, config);
    }

    // if (config) Object.assign(formConfig, config);
    // console.log('🛠 -> useFormNew -> config', config);
    // console.log('🛠 -> useFormNew -> formConfig', formConfig);

    /* 校验表单 */
    const validateFlag = ref(false);

    const validateConfig = ref<{
        cbName: ValidateCbNameType;
        cbParams: any;
    }>({
        cbName: 'submit',
        cbParams: {},
    });

    function validateRender(fnName?: ValidateCbNameType, params?: any) {
        validateFlag.value = true;
        validateConfig.value.cbName = fnName || 'submit';
        validateConfig.value.cbParams = params ?? {};
    }

    async function validateForm(formEl?: FormInstance) {
        if (!formEl) return false;
        if (formEl) formInstance.value = formEl;
        // 先清除验证信息
        formEl.resetValidation();
        try {
            await formEl.validate()
            return true
        } catch (e) {
            return false
        }
    }

    /* 重置表单 */
    function resetForm(formEl?: FormInstance) {
        formEl?.resetValidation();
    }

    /* 重置表单 重置表单的实例 与重置表单结果一样 resetForm 带参 resetFields 不带参 */
    function resetFields() {
        if (!formInstance) return false;
        if (formInstance) formInstance.value?.resetValidation();
    }

    /* 清除表单验证信息 */
    function clearValidate(formEl?: FormInstance, name?: string) {
        if (formEl && name) {
            formEl.resetValidation(name);
        } else if (formEl) {
            formEl.resetValidation();
        }
    }

    /* 滚动到某个字段 */
    function scrollToField(name: string) {
        formInstance.value?.scrollToField(name);
    }

    /* 设置表单数据 */
    function setFormData(data: any) {
        formData.value = data;
    }

    function assignFormData(data: any) {
        Object.assign(formData.value, data);
    }

    /**
     * 处理group使用方法返回
     * @param item 当前 groupProp
     * @param data 当前 formData
     * @returns group
     */
    function handleGroup(item: FormPropGroupType, data: any = {}) {
        // let arr = [];
        // if (typeof item.group === 'function') arr = item.group(data);
        // else arr = item.group;
        // return arr;
        return item.group;
    }

    /* 打平数组 */
    function flatGroup(propsGroup: FormPropGroupType[], data: any = {}) {
        let arr: FormPropType[] = [];
        propsGroup.forEach((item) => {
            const group = handleGroup(item, data);
            arr = arr.concat(group);
        });
        return arr;
    }

    /*  */
    function unionRule(props: FormPropType[]): Rules {
        const rules = {};
        props.forEach((item) => {
            if (item.rules) {
                rules[item.name] = item.rules.map((v) => {
                    const copy = _.cloneDeep(v);
                    if (copy.trigger) delete copy.trigger;
                    if (copy.required)
                        copy.message = copy.message || `${item.label}不能为空`;

                    return copy;
                });
            }
        });
        return rules;
    }

    /* 执行验证 */
    function handleValidator(
        data: any,
        props: FormPropType[]
    ): Promise<{
        valid: boolean;
        errors?: ValidateError[];
        fields?: Rules;
    }> {
        const rules = unionRule(props);

        const validator = new Schema(rules);
        return validator
            .validate(data)
            .then(() => {
                // validation passed or without error message
                return {valid: true};
            })
            .catch(({errors, fields}) => {
                return {valid: false, errors, fields};
            });
    }

    function handlePropsFilter(
        list: FormPropType[],
        data: any,
        options?: FormOptionsType
    ) {
        if (options?.op === undefined) return list;

        if (['search'].includes(options.op)) return list;
        if (Array.isArray(list)) {
            return list.filter((item: FormPropType) => {
                const flag = isDisplay(item, data, options);
                // 删除隐藏的属性
                // if (!flag) {
                //   delete data[item.name];
                // }
                return flag;
            });
        } else {
            return [];
        }
    }

    function handlePropsGroupFilter(
        list: FormPropGroupType[],
        data: any,
        options?: FormOptionsType
    ) {
        if (options?.op === undefined) return list;
        if (['', 'search'].includes(options.op)) return list;
        return list
            .filter((item: FormPropGroupType) => {
                const flag = isDisplay(item, data, options);
                // 隐藏的group 删除里面字段
                // if (!flag) {
                //   item.group.forEach(v => {
                //     delete data[v.name];
                //   });
                // }
                return flag;
            })
            .map((item: FormPropGroupType) => {
                const group = handleGroup(item, data);

                return Object.assign({}, item, {
                    group: handlePropsFilter(group, data, options),
                });
            });
    }

    // 补丁-  0928 这边对数据进行处理 有配置组中 存在 type则不过滤
    function handlePropsGroupFilter2(
        list: FormPropGroupType[],
        data: any,
        options?: FormOptionsType
    ) {
        if (options?.op === undefined) return list;

        if (['', 'search'].includes(options.op)) return list;

        return list
            .filter((item: FormPropGroupType) => {
                if (item.type) return true;

                const flag = isDisplay(item, data, options);
                // 隐藏的group 删除里面字段
                // if (!flag) {
                //   item.group.forEach(v => {
                //     delete data[v.name];
                //   });
                // }
                return flag;
            })
            .map((item: FormPropGroupType) => {
                const group = handleGroup(item, data);

                if (item.type) {
                    return Object.assign({}, item, {
                        group,
                    });
                }
                return Object.assign({}, item, {
                    group: handlePropsFilter(group, data, options),
                });
            });
    }

    /* 是否不可用 */
    function isDisabled(
        item: FormPropType,
        data: Record<string, unknown>,
        options?: FormOptionsType
    ) {
        // if (item.type === 'upload') {
        //   console.log(
        //     '🛠 -> useFormNew -> isDisabled',
        //     formConfig.value.disabled,
        //     item.name
        //   );
        // }
        // 判断表单是否禁用
        if (formConfig.value.disabled) return formConfig.value.disabled;
        // 判断单项是否禁用
        if (item.disabled === undefined) return false;
        if (typeof item.disabled === 'boolean') return item.disabled;
        return item.disabled(data, options?.op);
    }

    /* 是否显示 */
    function isDisplay(
        item: { display?: BooleanAndFn; [key: string]: any },
        data: Record<string, unknown>,
        options?: FormOptionsType
    ) {
        if (item.display === undefined) return true;
        if (typeof item.display === 'boolean') return item.display;

        // 这边是用于多组配置项目的处理 需要两个字段进行适配处理
        // if (item.dynamic && item.showPropKey) {
        if (item.showPropKey) {
            let name = item.name as string;
            let index: number = name.indexOf('_');
            if (index > 0) {
                let data_count = name.slice(index, name.length);
                // 获取是否显示时依赖的字段 如installType_2 installType_3
                let relyName: any = item.showPropKey + data_count;
                return item.display(data, options?.op, relyName);
            } else {
                return item.display(data, options?.op, item.showPropKey);
            }
        } else {
            // 常用的情况
            return item.display(data, options?.op);
        }
        // return item.display(data, options?.op);
    }

    /* 是否只读 */
    function isReadonly(
        item: { readonly?: BooleanAndFn; [key: string]: any },
        data: Record<string, unknown>,
        options?: FormOptionsType
    ) {
        if (item.readonly === undefined) return false;
        if (typeof item.readonly === 'boolean') return item.readonly;
        return item.readonly(data, options?.op);
    }

    /* 是否必填 */
    function isRequired(
        item: { required?: BooleanAndFn; [key: string]: any },
        data: Record<string, unknown>,
        options?: FormOptionsType
    ) {
        if (item.required === undefined) return false;
        if (typeof item.required === 'boolean') return item.required;
        return item.required(data, options?.op);
    }

    function getOptions(
        item: FormPropType,
        data: Record<string, unknown>,
        options?: FormOptionsType
    ): SelectOptionType[] {
        if (item.options === undefined) return [];
        if (typeof item.options === 'function')
            return item.options(data, options?.op);

        return item.options;
    }

    /* 初始化 */
    function handleInit(data?: any) {
        // ...
    }

    /* 设置默认值 */
    function handleSetDefault(props: FormPropType[], data?: any) {
        // ...
    }

    /* 过滤字段 */
    function filterData(data: any, props?: FormPropType[]) {
        if (!props) {
            if (Object.hasOwn(data, 'createTime')) delete data.createTime;
            if (Object.hasOwn(data, 'createBy')) delete data.createBy;
            if (Object.hasOwn(data, 'updateTime')) delete data.updateTime;
            if (Object.hasOwn(data, 'updateBy')) delete data.updateBy;
        }
        return data;
    }

    return {
        /* handler */
        formData,
        formConfig,
        validateFlag,
        validateConfig,
        validateRender,
        validateForm,
        resetForm,
        clearValidate,
        scrollToField,
        setFormData,
        assignFormData,
        handleValidate: validateForm,
        /*  */
        formInstance,
        formRef: formInstance,
        setFormInstance,
        resetFields,
        flatGroup,
        handleValidator,
        filterData,
        handleDataFilter: filterData,
        handlePropsFilter,
        handlePropsGroupFilter,
        handlePropsGroupFilter2,
        isDisabled,
        isDisplay,
        isReadonly,
        isRequired,
        getOptions,
        setFormConfig,
    };
}
