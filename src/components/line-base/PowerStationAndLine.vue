<!-- 电站/线路选择弹框 -->
<template>
  <div class="select-line-sticky-header">
    <div class="select-line_title">选择所属线路</div>
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      shape="round"
    >
      <template #action>
        <div @click="onClickButton">查询</div>
      </template>
    </van-search>
  </div>
  <van-list>
    <div
      v-for="(item, index) in facilityEntity?.rows"
      class="select-line-item"
      @click="onItemClick(item, index)"
    >
      <van-row justify="space-between" class="select-line-item-relative">
        <van-col span="6" class="select-line-item-title"
          ><van-icon
            :name="getCheckInfo(index).name"
            :color="getCheckInfo(index).color"
          ></van-icon
        ></van-col>
        <van-col span="18" class="select-line-item-right-content"
          ><van-tag type="primary">序号{{ index + 1 }}</van-tag></van-col
        >
      </van-row>
      <div class="select-line-size-box-10"></div>
      <van-row justify="space-between" class="select-line-item-relative">
        <van-col span="6" class="select-line-item-title">线路名称</van-col>
        <van-col span="18" class="select-line-item-right-content">{{
          item.name
        }}</van-col>
      </van-row>
      <div class="select-line-size-box-10"></div>
      <van-row justify="space-between" class="select-line-item-relative">
        <van-col span="6" class="select-line-item-title">电压等级</van-col>
        <van-col span="18" class="select-line-item-right-content">{{
          item.voltageLevel_
        }}</van-col>
      </van-row>
      <van-divider class="select-line-divider"> </van-divider>
    </div>
  </van-list>
  <div class="select-line-sticky-footer" v-if="facilityEntity">
    <van-pagination
      v-model="currentPage"
      :total-items="facilityEntity?.total"
      :items-per-page="15"
      :change="loadPageData()"
    />
    <van-button
      type="primary"
      native-type="submit"
      block
      :disabled="checkRowIndex === -1"
      @click="confirm()"
      >确定</van-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FacilityEntity, FacilityRow } from "../../types/ActivityEntity";
import Api from "../../http/Api";
import { ApiResponse } from "../../http/request";
const keyword = ref();
//当前页面
const currentPage = ref(1);
//记录最后一次获取到的页码，如果和上次获取的一样，就不需要再请求数据
let lastPage = -1;
//请求的电站/线路数据
const facilityEntity = ref<FacilityEntity>();
const checkRowIndex = ref<number>(-1);
const pageShow = ref(false);

function onSearch(keyword: string) {}
function onClickButton() {
  //搜索的时候重置一下页码
  lastPage = 1;
  currentPage.value = 1;
  onLoad();
}

class CheckInfo {
  name: string;
  color: string;
  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}
function getCheckInfo(index: number): CheckInfo {
  if (index === checkRowIndex.value) {
    return new CheckInfo("checked", "#409eff");
  }
  return new CheckInfo("circle", "black");
}

function onItemClick(row: FacilityRow, index: number) {
  checkRowIndex.value = index;
}

function onLoad() {
  lastPage = currentPage.value;
  Api.getFacilityList(
    currentPage.value,
    keyword.value,
    function (res: ApiResponse<FacilityEntity>) {
      if (!res.success) {
        return;
      }
      facilityEntity.value = res.data;
    }
  );
}
onLoad();
function loadPageData() {
  console.log("点击了分页=====>", currentPage.value);
  if (lastPage === currentPage.value) {
    return;
  }
  onLoad();
}

const emit = defineEmits(["confirm"]);
function confirm() {
  emit("confirm", facilityEntity.value?.rows[checkRowIndex.value]);
}
</script>

<style>
/* .main {
  display: block;
  height: 200px;
} */
.select-line_title {
  text-align: center;
}
.select-line-sticky-header {
  padding-top: 15px;
  position: sticky;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: white;
}
.select-line-sticky-footer {
  position: sticky;
  z-index: 1;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: white;
  /* margin-top: -50px; */
}

.select-line-item-title {
  font-size: 14px;
  color: #9f9f9f;
  text-align: start;
}
.select-line-item-right-content {
  color: black;
  font-size: 14px;
  text-align: right;
}
.select-line-item {
  text-align: left;
  background-color: white;
  border-radius: 6px;
  margin: 10px 12px;
}
.select-line-divider {
  border-style: none;
  height: 1px;
  padding: 0;
  margin-top: 10px;
  background-color: #f2f3f5;
}
.select-line-size-box-10 {
  height: 10px;
}
.select-line-item-relative {
  position: relative;
  display: flex;
  margin-bottom: 10px;
}
</style>
