<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Toast } from '@vant/compat';
import { Dialog } from '@vant/compat';
// import api from '@/utils/AppJs';
import api from '@/api'
import { useMessage } from '@/composables';

const username = ref('王嘉尔')
const office = ref('福州市电力执法办公室')
const account = ref('')
const { handleWarning, handleError, handleSuccess, handleDeleteConfirm, commHandleConfirm, handleResponse } = useMessage();

const logOut = () => {
  Dialog.config({
    title: '是否退出登录',
    message:
      `                       当前登录账号:${account.value}                             当前登录名称:${username.value}`,
  })
    .then(() => {
      api.auth.logout()
    })
    .catch(() => {
      // Toast('取消')
    });
}


onMounted(() => {
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  console.log(userInfo, 'userInfo');
  username.value = userInfo.userInfo.name
  account.value = userInfo.userInfo.account
  const officePath = userInfo.userInfo.organizationPathName.split('/')
  office.value = officePath[officePath.length - 1] // 获取最后一个元素
})


const change = () => {
  // handleResponse()
  // handleWarning('警告xxx')
  // handleError('加载失败')
  // handleSuccess('加载成功')
  handleDeleteConfirm('删除二次确认')
  // commHandleConfirm('二次确认')
}


</script>


<template>
  <div class="userinfo-bgc">
    <div class="user-profile">
      <div class="avatar">
        <img src="@/assets/images/userInfo/userInfo-1.png" alt="User Avatar">
      </div>
      <div class="user-info">
        <h2>{{ username }}</h2>
        <p>{{ office }}</p>
      </div>
    </div>
    <div class="user-center">
      <!-- <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />/ -->
      <div class="user-profile-one">
        <div class="avatar-one">
          <img src="@/assets/images/userInfo/message-4.png" alt="Avatar" />
        </div>
        <div class="info" @click="change">
          <p>个人信息完善</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
      <div class="user-profile-one">
        <div class="avatar-one">
          <img src="@/assets/images/userInfo/files-5.png" alt="Avatar" />
        </div>
        <div class="info" @click="change">
          <p>个人档案</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
      <div class="user-profile-one" @click="change">
        <div class="avatar-one">
          <img src="@/assets/images/userInfo/changePassword-2.png" alt="Avatar" />
        </div>
        <div class="info" @click="change">
          <p>修改密码</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
      <div class="user-profile-one">
        <div class="avatar-one">
          <img src="@/assets/images/userInfo/agreement-6.png" alt="Avatar" />
        </div>
        <div class="info" @click="change">
          <p>用户协议及隐私政策</p>
          <!-- <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" /> -->
        </div>
        <van-icon name="arrow" class="arrow-icon" />
      </div>
    </div>

    <div class="user-logout" @click="logOut">
      <span>退出登录</span>
    </div>
  </div>
</template>


<style src="./style/userPage.css"></style>