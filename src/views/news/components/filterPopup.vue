<script setup>
import { ref, watch, computed, defineProps } from "vue";
const activeNames = ref(['1', '2', '3', '4', '5'])

const props = defineProps({
  showFilterPopup: {
    type: Boolean,
    required: true,
  },
  handleClickFilter: {
    type: Function,
    required: true,
  },
});


// 日期
const selectedMonth = ref('')
const months = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
const publishTimeRange = ref([]);
const minDate = ref(new Date(2000, 0, 1));
const maxDate = ref(new Date());
watch(selectedMonth, (month) => {
  if (month !== '') {
    const year = new Date().getFullYear();
    const monthIndex = months.value.indexOf(month);
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    publishTimeRange.value = [firstDay, lastDay];
  } else {
    publishTimeRange.value = [];
  }
});
const selectMonth = (index) => {
  selectedMonth.value = months.value[index];
};


// 类型
const selectedType = ref('')
const news_type = ref(['全部', '内部新闻', '外部新闻'])


// 属性
const selectedStatus = ref('')
const news_status = ref(['头条', '置顶', '普法'])



// 筛选选中的值
computed(() => {
  if (!selectedStatus.value) {
    // 如果selectedStatus为空，不进行筛选，返回全部新闻
    filteredNews.value = news.value
  } else {
    // 如果selectedStatus不为空，根据selectedStatus和对应的lawNewsFlag/topFlag/headFlag来筛选新闻
    filteredNews.value = news.value.filter(item => {
      if (selectedStatus.value === '头条') {
        return item.headFlag === 1
      } else if (selectedStatus.value === '置顶') {
        return item.topFlag === 1
      } else if (selectedStatus.value === '普法') {
        return item.lawNewsFlag === 1
      }
    })
  }
})

function selectStatus (status) {
  console.log(news.value, 'news.value');
  if (status === selectedStatus.value) {
    // 如果点击的状态已经被选中，将其设为''表示取消选择
    selectedStatus.value = ''
    console.log(selectedStatus.value, 'selectedStatus.value');
  } else {
    // 如果点击的状态未被选中，将其设为对应的状态
    selectedStatus.value = status
    console.log(selectedStatus.value, 'selectedStatus.value99');
  }
}
</script>


<template>
  <!-- 弹出层内容 -->
  <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
    <van-collapse-item title="发布时间" name="1" class="time-title">
      <div class="month-selector">
        <span v-for="month in months" :class="{ selected: selectedMonth === month }" @click="selectMonth(index)">{{
          month }}</span>
      </div>
      <van-datetime-picker v-if="selectedMonth" v-model="publishTimeRange" type="date" :min-date="minDate"
        :max-date="maxDate"
        :title="`发布时间(${publishTimeRange[0].toLocaleDateString()} - ${publishTimeRange[1].toLocaleDateString()})`" />
    </van-collapse-item>
  </van-collapse>
  <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
    <van-collapse-item title="类型" name="3" class="time-title">
      <div class="month-selector-type">
        <span v-for="typeindex in news_type" :class="{ selected: selectedType === typeindex }"
          @click="selectedType = typeindex">{{
            typeindex }}</span>
      </div>
    </van-collapse-item>
  </van-collapse>
  <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
    <van-collapse-item title="属性" name="4" class="time-title">
      <div class="month-selector-attribute">
        <span v-for="status in news_status" :class="{ selected: selectedStatus === status }"
          @click="selectStatus(status)">{{
            status }}</span>
      </div>
    </van-collapse-item>
  </van-collapse>
</template>

<style scoped src="../style/editNews.css"></style>