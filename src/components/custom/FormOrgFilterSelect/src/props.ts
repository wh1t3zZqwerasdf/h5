import {useFormCustomComponents} from '@/components/formBuild/composables';

const formCustomComponents = useFormCustomComponents();
export const orgFilterSelectProps = {
    ...formCustomComponents.defaultProps,
    modelValue: {
        type: String,
        default: ''
    }
};
