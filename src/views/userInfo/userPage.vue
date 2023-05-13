<script lang="ts" setup>
// import { Toast } from '@vant/compat';
import { Dialog } from '@vant/compat';
import { logout as logoutApi } from '@/utils/AppJs'
import { useMessage } from '@/composables';

const username = ref('')
const office = ref('')

const {
  handleWarning,
  handleError,
  handleSuccess,
  handleDeleteConfirm,
  commHandleConfirm,
  handleResponse
} = useMessage();

const logOut = () => {
  Dialog.config({
    title: '是否退出登录',
  })
    .then(() => {
      logoutApi()
    })
    .catch(() => {
      // Toast('取消')
    });
}


onMounted(() => {
  const userInfoString = localStorage.getItem('auth');
  const userInfo = JSON.parse(userInfoString);
  username.value = userInfo.userInfo.name
  office.value = userInfo.userInfo.organizationPathName
})




const change = () => {
  // handleResponse()
  // handleWarning('警告xxx')
  handleError('功能未开放！')
  // handleSuccess('加载成功')
  // handleDeleteConfirm('删除二次确认')
  // commHandleConfirm('二次确认')
}


</script>


<template>
  <div class="userinfo-bgc">
    <div class="user-profile">
      <div class="avatar">
        <img alt="User Avatar" src="@/assets/images/userInfo/userInfo-1.png">
      </div>
      <div class="user-info">
        <h2>{{ username }}</h2>
        <p>{{ office.split("/").slice(-1)[0] }}</p>
      </div>
    </div>
    <div class="user-center">
      <!-- <van-contact-card type="edit" :tel="tel" :name="name" @click="onEdit" />/ -->
      <div class="user-profile-one">
        <div class="avatar-one">
          <img alt="Avatar" src="@/assets/images/userInfo/message-4.png" />
        </div>
        <div class="info" @click="change">
          <p>个人信息完善</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <div class="user-profile-one">
        <div class="avatar-one">
          <img alt="Avatar" src="@/assets/images/userInfo/files-5.png" />
        </div>
        <div class="info" @click="change">
          <p>个人档案</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <div class="user-profile-one" @click="change">
        <div class="avatar-one">
          <img alt="Avatar" src="@/assets/images/userInfo/changePassword-2.png" />
        </div>
        <div class="info" @click="change">
          <p>修改密码</p>
          <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" />
        </div>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <div class="user-profile-one">
        <div class="avatar-one">
          <img alt="Avatar" src="@/assets/images/userInfo/agreement-6.png" />
        </div>
        <div class="info" @click="change">
          <p>用户协议及隐私政策</p>
          <!-- <van-divider style="margin-top: 20px; margin-bottom: 20px; background-color: #E8E8E8;" /> -->
        </div>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
    </div>

    <div class="user-logout" @click="logOut">
      <span>退出登录</span>
    </div>
  </div>
</template>


<style src="./style/userPage.css"></style>
