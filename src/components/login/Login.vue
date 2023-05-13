<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="formData.username" :rules="formRules.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="formData.password" :rules="formRules.password" label="密码" placeholder="请输入密码" />
      <van-field v-model="formData.captcha" :rules="formRules.captcha" label="验证码" placeholder="请输入验证码" />
      <van-image :src="captchaImg" height="50" width="100" @click="getCaptcha" />
      <van-button block native-type="submit" type="primary">登录</van-button>
    </van-cell-group>
  </van-form>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { useRoute, useRouter } from "vue-router";
import { useMessage, useState } from '@/composables';
import { useAuthStore } from '@/store';
import { ElMessage, FormRules } from 'element-plus';
import { FormInstance } from 'vant'
import Cookie from 'js-cookie';
import { Base64 } from 'js-base64';
import api from '@/api';
import dayjs from 'dayjs';
const route = useRoute();
const router = useRouter();
const { handleSuccess, handleTodo, handleWarning, handleError } = useMessage();
const redirect = (route.query.redirect as string) || '/';
const { loading, error, finished } = useState();
const loginForm = ref<FormInstance>();
const formRules = ref<FormRules>({
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
    // { min: 6, message: "密码长度最少为 6 位", trigger: "blur" }
  ],
  captcha: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        // if (!captchaID.value) callback(new Error('验证码获取失败'));
        if (!value) callback(new Error('验证码不能为空'));
        // else callback();
      },
      trigger: 'blur'
    }
  ]
});
const loginWayArr = [
  { title: '账号登录', name: 'account' },
  { title: '手机号登录', name: 'sms' }
];
const loginWay = ref('account'); // 登录类型 1-账号，2-短信
function changeLoginWay(item: any): any {
  if (item.paneName === 'sms') {
    setTimeout(() => {
      loginWay.value = 'account';
    }, 50);
    handleTodo();
    return;
  }
  loginWay.value = item.paneName || 'account';
}
const formData = reactive({
  username: '',
  password: '',
  captcha: ''
  // phone: '', // 手机号
  // smsCode: '', // 短信验证码
  // captcha: '',
  // verifiId: ''
});
const isRemember = ref(false); // 记住密码
const authStore = useAuthStore();
async function handleValidator(formEl: FormInstance) {
  const validRes = await formEl.validate((valid, fields) => {
    if (valid) return true;
    else return false;
  });
  if (!validRes) {
    ElMessage.error('验证失败，请检查表单信息');
    return false;
  }
  return true;
}
const onSubmit = _.throttle(SubmitFn, 2000, {
  leading: true,
  trailing: false
});
async function SubmitFn() {
  // 记住密码
  setRemember();
  loading.value = true;
  const loginFlag = await authStore.login(
    Object.assign(formData, {
      checkKey: checkKey.value
    })
  );
  loading.value = false;
  if (!loginFlag) {
    getCaptcha();
    return;
  }
  handleSuccess('登录成功', async () => {
    getRootNodeData();
    // router.push('/');
    router.push(redirect); // 返回上一级菜单
  });
}
function onHelp() {
  ElMessage.warning('请联系管理员');
}
function onFind() {
  ElMessage.warning('请联系管理员找回密码');
}
function setRemember() {
  Cookie.set('username', formData.username);
  Cookie.set('remember', String(isRemember.value));
  if (isRemember.value)
    Cookie.set('password', Base64.encode(formData.password));
  else Cookie.remove('password');
}
async function getRootNodeData() {
  const { success, data } = await api.org.getRootNode();
  if (!success) return;
  localStorage.setItem(
    'ROOT_ORG_ID_LIST',
    JSON.stringify(data.map(item => item.id))
  );
}
/* 验证码 */
const checkKey = ref('');
const captchaImg = ref('');
const getCaptcha = async () => {
  formData.captcha = '';
  captchaImg.value = '';
  checkKey.value = dayjs().valueOf().toString();
  console.log('🛠 -> getCaptcha -> checkKey.value', checkKey.value);
  const res = await api.auth.verificationCode(checkKey.value);
  console.log('getCaptcha: ', res);
  if (!res.success) return handleWarning('验证码获取失败');
  captchaImg.value = res.data;
};
function init() {
  const cookieUsername = Cookie.get('username') ?? '';
  const cookiePassword = Cookie.get('password');
  const cookieRemember = Cookie.get('remember');
  formData.username = cookieUsername;
  isRemember.value = cookieRemember === 'true';
  if (isRemember.value && cookiePassword)
    formData.password = Base64.decode(cookiePassword);
}
onMounted(() => {
  authStore.logout();
  getCaptcha();
  init();
});
</script>
<style>
.van-cell-group {
  position: absolute;
  margin: auto;
  height: 300px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>