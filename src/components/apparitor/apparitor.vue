<template>
  <div class="container">
    <div class="content">
      <van-button
        class="scan-button"
        type="primary"
        size="large"
        icon="scan"
        @click="onScanButtonClick"
        color="rgba(249, 185, 73, 1)"
      >
        扫码绑定设备
      </van-button>
    </div>
    <div class="van_Sbtn">
      <van-button class="btn" type="success" size="small" @click="onPhotos"
        >拍照</van-button
      >
      <van-button
        class="btn"
        type="success"
        size="small"
        @click="increaseVolume"
        :disabled="isVolumeMax"
        >调节音量+</van-button
      >
      <van-button
        class="btn"
        type="success"
        size="small"
        @click="decreaseVolume"
        :disabled="isVolumeZero"
        >调节音量-</van-button
      >
      <van-button class="btn" type="success" size="small" @click="checkBattery"
        >查询电量</van-button
      >
      <van-button class="btn" type="success" size="small" @click="startAudio"
        >开始录音</van-button
      >
      <van-button class="btn" type="success" size="small" @click="stopAudio"
        >停止录音</van-button
      >
      <van-button class="btn" type="success" size="small" @click="startVideo"
        >开始录像</van-button
      >
      <van-button class="btn" type="success" size="small" @click="stopVideo"
        >停止录像</van-button
      >
    </div>

    <div>
      <div class="topTitle">
        <h4>开工阶段</h4>
        <div class="location">
          <van-icon name="location-o" size="16" />
          <div class="location-title">定位</div>
          <div class="location-address">{{ address }}</div>
        </div>
      </div>

      <div class="stage-container">
        <h4>票卡单</h4>
        <div class="boxa">
          <img
            class="stage-image"
            src="@/assets/images/20230403162151.jpg"
            alt="图片"
          />
          <img
            class="stage-image"
            src="@/assets/images/202304031621515.jpg"
            alt="图片"
          />
        </div>
      </div>
      <div class="stage-container">
        <h4>提前会安全交流</h4>
        <div class="boxa">
          <img class="stage-image" src="@/assets/images/1.jpg" alt="图片" />
        </div>
      </div>
      <div class="topTitle">
        <h4>作业阶段</h4>
        <div class="boxa"></div>
      </div>
      <div class="topTitle">
        <h4>收工阶段</h4>
        <div>班后会及工作总结</div>
        <div class="stage-container">
          <div class="boxa">
            <img class="stage-image" src="" alt="图片" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, CellGroup, Cell, Icon } from "vant";
import api from "@/utils/AppJs.ts";
import Api from "../../http/Api";
import { Dialog } from "vant";

export default {
  components: {
    VanNavBar: NavBar,
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanIcon: Icon // 引入 VanIcon 组件
  },
  data() {
    return {
      result: "",
      address: "广州市天河区xxxxxxxxxxxxxxxxxxx",
      currentVolume: 50, // 初始音量大小为 50
      isVolumeZero: false, // 初始音量不为 0
      isVolumeMax: false // 初始音量不为 100
    };
  },
  created() {
    this.initializeUserInfo();
  },
  methods: {
    //拿用户信息
    initializeUserInfo() {
      let resultInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (resultInfo && resultInfo !== undefined && resultInfo !== "") {
        console.log(resultInfo, "userInfo");
      }
    },
    //扫码绑定
    onScanButtonClick() {
      api.scan(function (result) {
        console.log("扫描结果：", result);
        Api.getDeviceInfo(result).then(res => {
          if (result && result != undefined && result != "") {
            Dialog.confirm({
              title: "提示",
              message: res.data.message
            })
              .then(() => {
                Api.bindDeviceInfo({
                  userId: "18",
                  clientId: result
                }).then(res1 => {
                  console.log(res1, "res1");
                  Dialog.alert({
                    message: res1.data.message,
                    theme: "button"
                  }).then(() => {
                    //绑定成功后的操作
                  });
                });
              })
              .catch(() => {
                Dialog.alert({
                  message: "取消绑定！"
                });
              });
          } else {
            Dialog.alert({
              message: "扫码获取失败,请重新扫码二维码,尝试继续绑定！"
            });
          }
        });
      });
    },

    //拍照
    onPhotos() {
      Api.takePhoto();
    },

    // 调节音量+
    async increaseVolume() {
      try {
        const increasedVolume = this.currentVolume + 10;
        const res = await Api.adjustVolume(increasedVolume);
        console.log(res);
        this.currentVolume = increasedVolume;
        this.isVolumeMax = this.currentVolume === 100;
        this.isVolumeZero = false;
      } catch (error) {
        console.error(error);
      }
    },
    // 调节音量-
    async decreaseVolume() {
      try {
        const decreasedVolume = this.currentVolume - 10;
        const res = await Api.adjustVolume(decreasedVolume);
        console.log(res);
        this.currentVolume = decreasedVolume;
        this.isVolumeZero = this.currentVolume === 0;
        this.isVolumeMax = false;
      } catch (error) {
        console.error(error);
      }
    },
    // 查询电量
    checkBattery() {
      Api.getBattery().then(res => {
        console.log("电量：", res.message);
      });
    },
    //开始录音
    startAudio() {
      Api.startRecord().then(res => {
        console.log("开始录音结果：", res);
      });
    },
    //停止录音
    stopAudio() {
      Api.stopRecord().then(res => {
        console.log("停止录音结果：", res);
      });
    },
    //开始录像
    startVideo() {
      Api.startCamera().then(res => {
        console.log("开始录像结果：", res);
      });
    },
    //停止录像
    stopVideo() {
      Api.stopCamera().then(res => {
        console.log("停止录像结果：", res);
      });
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scan-button {
  margin-top: 60px;
}

.topTitle {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.location {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.location .location-title {
  margin-left: 5px;
  font-size: 14px;
}

.location .location-address {
  margin-left: 5px;
  font-size: 14px;
}

.stage-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
}

.stage-container .boxa {
  width: auto;
  height: auto;
}

.van_Sbtn {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
}

.btn {
  flex-basis: calc(25% - 10px);
  margin: 5px;
  padding: 5px 10px;
  /* 为按钮设置 5px 的上下内边距和 10px 的左右内边距 */
  box-sizing: border-box;
  /* 让 padding 不会撑开按钮的宽度 */
}

.van-cell--custom {
  margin-left: 10px;
}

img {
  width: 300px;
  height: 200px;
}
</style>
