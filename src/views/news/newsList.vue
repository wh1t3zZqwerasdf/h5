<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from 'vue'
import Api_news from '@/http/http'
import { useRouter } from 'vue-router';
// import { Toast } from 'vant';
import tuozhan1 from '@/assets/images/qiehuan.png'


const router = useRouter();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const offset = ref(0);
var pageSize = 10;
var page = 1;
var form = ref({
  exculdSelf: false,
  queryType: "list",
  size: 15,
})
const dataList = ref([]);
const search_value = ref('');
const showFilterPopup = ref(false)
const tuozhan = tuozhan1
const activeNames = ref(['1', '2', '3', '4', '5'])
const months = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
const selectedMonth = ref('1月')
const selectedAddress = ref('')
const cityList = reactive([])
const news_type = ref(['全部', '内部新闻', '外部新闻'])
const news_status = ref(['头条', '置顶', '普法'])

const news = ref([]);

const filteredNews = reactive([]);
const searchValue = ref('');

watch(() => form, (newVal, oldVal) => {
  page = 1

  news.value = []
  getNewsData(newVal.value)
}, {
  deep: true,
  // immediate: true
})
/* methods */
const handleClickLeft = () => history.back()
const handleClickFilter = () => {
  showFilterPopup.value = true
}

const onRefresh = () => {
  offset.value = 0;
  setTimeout(() => {
    getNewsData(form.value)
    Toast('刷新成功');
    loading.value = false;
  }, 1000);
};


const onLoad = () => {
  console.log("onload")
  setTimeout(() => {
    finished.value = true;
    finished.value = false;
    getNewsData(form.value)
    loading.value = false;
    if (page > 6)
      finished.value = true;
  }, 1000);

};


const getNewsData = async (form: any) => {
  try {
    var json = { ...form }
    json.page = page++
    const res = await Api_news.getNewsList(json);
    const newsData = res.data.rows;
    newsData.map(item => {
      const regex = /<[^>]+>|&nbsp;/g;
      const plainText = item.content.replace(regex, '');

      const imgRegex = /<img.*?src="(.*?)"/g;
      const imgMatches = [...item.content.matchAll(imgRegex)];
      // console.log(imgMatches, 'imgMatches');
      const imageUrl = imgMatches.length > 0 ? imgMatches[0][1] : null;


      news.value.push({
        title: item.title,
        publisher: item.submitOrgName,
        author: item.author,
        publishTime: item.publishTime,
        imageUrl: imageUrl,
        content: plainText.trim(),
        id: item.id,
        status_: item.status_,
        status: item.status
      })
    });
  } catch (error) {
    console.error(error);
  }
};


// 搜索
const onSearch = (value: any) => {
  if (typeof value !== 'string') {
    return; // 如果value不是字符串，则退出函数
  }
  searchValue.value = value.trim(); // 去除空格并更新搜索关键词
  if (searchValue.value !== '') {
    filteredNews.value = news.value.filter(item => {
      // 根据标题或内容是否包含关键词进行过滤
      return item.title.includes(searchValue.value) || item.content.includes(searchValue.value);
    });
  } else {
    // 如果搜索关键词为空，则显示所有新闻
    filteredNews.value = news.value;
  }
}


const showDetail = (item) => {
  router.push({ path: `/newsDetail/${item.id}` });
}

const handleClickAddress = (address) => {
  form.value.orgId = address.id
  selectedAddress.value = address
  // console.log(selectedAddress.value.id, 'selectedAddress.value');
  // Api_news.getNewsList(selectedAddress.value.id).then((res) => {
  //   // console.log(res, '72653443440844800');
  // })
}


// async function fetchNewsData () {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const cityQueryPromise = Api_news.cityQueryList();
//   const res = await cityQueryPromise;
//   const addressData = res.data;
//   const currentUserAddress = findUserAddress(addressData, userInfo.orgInfo.parentId);
//   const childAddressList = currentUserAddress.childList.filter(address => address.level === 3);
//   cityList.push(...childAddressList);

//   function findUserAddress (addressData, addressId) {
//     const stack = [addressData];
//     while (stack.length) {
//       const address = stack.pop();
//       if (address.id === addressId) {
//         return address;
//       }
//       if (address.childList) {
//         stack.push(...address.childList);
//       }
//     }
//     return null;
//   }
//   return cityList;
// }

function fetchNewsData() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const cityQueryPromise = Api_news.cityQueryList();

  // 在获取地址信息数据成功后，查找当前账号所在地址的子地址数组
  return cityQueryPromise.then(res => {
    const addressData = res.data;
    const currentUserAddress = findUserAddress(addressData, userInfo.orgInfo.parentId);

    const childAddressList = currentUserAddress.childList;
    // console.log(childAddressList, 'childAddressList');
    // 筛选 level 为 3 的机构地址对象
    // const agencyAddressList = childAddressList.filter(address => address.level === 3);

    // console.log(agencyAddressList, 'agencyAddressList');
    // 遍历子地址列表，并将其推送到响应式的 cityList 数组中
    childAddressList.forEach((item) => {
      cityList.push(item)
      // console.log(cityList, 'cityList');
    })
    // console.log(childAddressList, 'childAddressList');

    // 辅助函数：在地址数据中查找指定 id 的地址对象
    function findUserAddress(addressData, addressId) {
      if (addressData.id === addressId) {
        return addressData;
      } else if (Array.isArray(addressData.childList)) {
        for (let i = 0; i < addressData.childList.length; i++) {
          const childAddress = findUserAddress(addressData.childList[i], addressId);
          // console.log(childAddress, 'childAddress');
          if (childAddress) {
            return childAddress;
          }
        }
      }
      return null;
    }
  }
  )
}
function handleClickmonth(index) {
  if (index < 10)
    form.value.month = "2023-0" + index
  else form.value.month = "2023-" + index
}

function handletype(index) {
  if (index != 0)
    form.value.newsType = index
  else form.value.newsType = ""
}
function handleStatus(index) {
  var json = {
    exculdSelf: false,
    queryType: "list",
    size: 15,
    orgId: form.value.orgId || ""
  }

  if (index == 0)
    json.headFlag = "1"
  if (index == 1) {
    json.topFlag = "1"
  }
  if (index == 2) {
    json.lawNewsFlag = "1"
  }
  form.value = json
}

const news_resect = () => {
  router.go(0)
  news.value = []
  setTimeout(() => {
    getNewsData(form.value)
  }, 1000);
  Toast('刷新新闻列表成功');
}
onMounted(() => {
  getNewsData(form.value)
  fetchNewsData()
})

</script>

<template>
  <div class="news_header">
    <van-nav-bar class="search-top" left-text="" left-arrow safe-area-inset-top @click-left="handleClickLeft">
      <template #title>
        <van-search v-model="search_value" shape="round" clearable placeholder="请输入搜索关键词" class="news-search"
          @input="onSearch($event.target.value)" />
      </template>
      <template #right>
        <img :src="tuozhan" alt="" @click="handleClickFilter">
      </template>
    </van-nav-bar>
  </div>
  <div class="wrap"></div>
  <div class="news_conter">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="80">
        <keepalive></keepalive>
        <van-cell v-for="item in news" :key="item.id" :border="false" style="margin-bottom: 8px;">
          <div class="news-detail" @click="showDetail(item)">
            <div class="news-tag" v-if="item.imageUrl">
              <div class="news_tag_one">
                <span class="tag-item" :class="item.status === 5 ? 'tag-item' : 'tag-pending'">
                  {{ {
                    1: '草稿',
                    2: '审核中',
                    3: '已驳回',
                    4: '已取消',
                    5: '已发布'
                  }[item.status] || '' }}
                </span>
                <div>
                  <div class="news-title">{{ item.title }}</div>
                </div>
              </div>
              <img :src="item.imageUrl" class="news_imageUrl">
            </div>
            <div class="news-tag_false" v-else="!item.imageUrl">
              <div class="news_tag_one_false">
                <div class="news-title-false">{{ item.title }}</div>
                <span class="tag-item" :class="item.status === 5 ? 'tag-item' : 'tag-pending'">
                  {{ {
                    1: '草稿',
                    2: '审核中',
                    3: '已驳回',
                    4: '已取消',
                    5: '已发布'
                  }[item.status] || '' }}
                </span>
              </div>
              <div>
                <!-- <img :src="item.imageUrl" class="news_imageUrl"> -->
                <p class="news-content"> {{ item.content }}</p>
              </div>
            </div>
            <div class="news-meta">
              <span>{{ item.publishTime }}</span>
              <span>{{ item.publisher }}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
  <van-popup v-model:show="showFilterPopup" position="right" :style="{ width: '80%', height: '100%' }"
    safe-area-inset-top>
    <!-- 弹出层内容 -->
    <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
      <van-collapse-item title="发布时间" name="1" class="time-title">
        <div class="month-selector">
          <span v-for="(month, index) in months" :class="{ selected: selectedMonth === month }"
            @click="handleClickmonth(index); selectedMonth = month">{{
              month }}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
      <van-collapse-item title="所在地区" name="2" class="time-title">
        <div class="city-selector">
          <span v-for="(address, index) in cityList" :key="index" :class="{ selected: selectedAddress === address }"
            @click="handleClickAddress(address); selectedAddress = address">{{ address.name }}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
      <van-collapse-item title="类型" name="3" class="time-title">
        <div class="month-selector-type">
          <span v-for="(typeindex, index) in news_type" :class="{ selected: selectedMonth === typeindex }"
            @click="handletype(index); selectedMonth = typeindex">{{
              typeindex }}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
      <van-collapse-item title="属性" name="4" class="time-title">
        <div class="month-selector-attribute">
          <span v-for="(status, index) in news_status" :class="{ selected: selectedMonth === status }"
            @click="handleStatus(index); selectedMonth = status">{{
              status }}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" style="margin-top: 26px;" :border="false">
      <van-collapse-item title="操作" name="5" class="time-title" :lazy-render="false">
        <div class="">
          <van-button type="primary" size="large" color="#7D7D7D" class="van-button" @click="news_resect">重置</van-button>
          <!-- <van-button type="success">确定</van-button> -->
        </div>
      </van-collapse-item>
    </van-collapse>
  </van-popup>
</template>

<style scoped src="./style/newsList.css"></style>