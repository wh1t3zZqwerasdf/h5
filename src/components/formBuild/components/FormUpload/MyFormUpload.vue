<template>
  <div class="uploadBox">
    <van-uploader
      v-model:model-value="fileList"
      :after-read="afterRead"
      v-if="isFile"
      :disabled="disabledFlag"
      :multiple="props.multiple"
      :max-count="props.limit"
      :before-read="beforeUpload"
      :before-delete="beforeDelete"
    >
      <div class="fileUpSpeal">附件上传</div>
    </van-uploader>
    <van-uploader
      v-model:model-value="fileList"
      :after-read="afterRead"
      v-if="!isFile"
      :disabled="disabledFlag"
      :multiple="props.multiple"
      :max-count="props.limit"
      :before-read="beforeUpload"
      :before-delete="beforeDelete"
    ></van-uploader>
  </div>
</template>

<script lang="ts" setup>
import api from "@/api/index";
import type { UploadProps, UploadRawFile } from "element-plus";
import { FormPropType, UploadResponse, UploadReturnType } from "@/types";
import { useMessage } from "@/composables";

const {
  handleWarning,
  handleError,
  handleSuccess,
  handleDeleteConfirm,
  commHandleConfirm,
} = useMessage();

const props = defineProps({
  modelValue: {
    type: Array as PropType<UploadResponse[] | string[]>,
  },
  itemProp: {
    type: Object as PropType<FormPropType>,
    required: true,
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  limit: {
    type: Number as PropType<number>,
    default: 10,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  originFilesStr: {
    type: String as PropType<string>,
    default: "",
  },

  formRef: {
    type: Object as PropType<any>,
  },
});

const prop = computed(() => props.itemProp);
const name = computed(() => props.itemProp.name);
const config = computed(() => props.itemProp.uploadConfig);
const isFile = computed(() => {
  return props.itemProp.type.includes("file");
});
const isAccept = ref(true);

const ACCEPT_PHOTO = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPT_FILE = [
  ".doc",
  ".docx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pdf",
  "application/pdf",
  ...ACCEPT_PHOTO,
];
// const ONLY_FILE_TIP = "只能上传 DOC、DOCX、JPG、JPEG、PDF、PNG 格式文件";
// const ONLY_PHOTO_TIP = "只能上传 JPG、JPEG、PNG 格式图片";
const ONLY_FILE_TIP = "只能上传word文件";
const ONLY_PHOTO_TIP = "只能上传图片";

const emit = defineEmits<{
  (e: "update:modelValue", data: UploadResponse[] | string[]): void;
  (e: "upLoadArray", fileList: UploadResponse[], name: string): void;
}>();

const disabledFlag = computed(() => {
  return props.disabled;
});

const scopeData = computed<any>({
  get() {
    return props.modelValue;
  },
  set(data: UploadResponse[] | string[]) {
    if (data && data.length > 0) props.formRef?.clearValidate(prop.value.name);
    emit("update:modelValue", data);
  },
});

const fileList = computed({
  get() {
    return scopeData.value;
  },
  set(data: UploadResponse[] | string[]) {
    console.log(data);
    scopeData.value = data;
  },
});

const afterRead = async (file: any) => {
  const can = new FormData();
  can.append("file", file.file);

  const res = await api.object.objectUploadPost(can);
  if (res?.url) {
    fileList.value[fileList.value.length - 1] = {
      ...res,
    };
    emit("upLoadArray", scopeData.value, props.itemProp.name);
  }
};

const beforeUpload = (rawFile: any) => {
  const _accept = config.value?.accept?.length
    ? config.value?.accept
    : isFile.value
    ? ACCEPT_FILE
    : ACCEPT_PHOTO;
  const _tip = config.value?.tipText
    ? config.value?.tipText
    : isFile.value
    ? ONLY_FILE_TIP
    : ONLY_PHOTO_TIP;
  isAccept.value = _accept.includes(rawFile.type);
  const isLt2M = rawFile.size / 1024 / 1024 < 2;

  if (!isAccept.value) {
    handleError(_tip);
    return false;
  }
  return true;
};

const beforeDelete = async (rawFile: any) => {
  let key = await handleDeleteConfirm("是否删除");
  return key;
};
</script>

<style lang="less" scoped>
:deep(.van-uploader__preview) {
  width: 5rem;
  height: 5rem;
}

.uploadBox {
  flex: 1;
  max-height: 40vh;
  overflow: auto;

  :deep(.van-uploader) {
    width: 100%;
    .van-uploader__wrapper {
      position: relative;
      padding-top: 3rem;
      .van-uploader__input-wrapper {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .fileUpSpeal {
    width: 100%;
    height: 3rem;
    text-align: right;
    box-sizing: border-box;
    padding: 0.5rem;
  }
}

.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
