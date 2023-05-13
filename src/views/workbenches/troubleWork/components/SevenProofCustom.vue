<template>
    <div class="contentBox">
        <van-button
            type="primary"
            native-type="submit"
            @click="openPop"
            :disabled="props.disabled"
            >法律法规</van-button
        >
        <div class="showBox">
            <h2 v-if="lawDia.nationLaw.length > 0" class="lawTitle">
                    国家法律
            </h2>
            <div class="showIndex" v-for="(item,index) in lawDia.nationLaw" :key="index">
                <div class="faTitle">
                    {{index+ 1 + '、' +   item.name }}
                </div>
                <div class="childrenTitle" v-for="(mc,key) in item.children" :key="key">
                    {{ key+ 1 + '、' +  mc.name }}
                </div>
            </div>
            <h2 v-if="lawDia.placeLaw.length > 0" class="lawTitle">
                地方性法规
            </h2>
            <div class="showIndex" v-for="(item,index) in lawDia.placeLaw" :key="index">
                <div class="faTitle">
                    {{index+ 1 + '、' +   item.name }}
                </div>
                <div class="childrenTitle" v-for="(mc,key) in item.children" :key="key">
                    {{ key+ 1 + '、' +  mc.name }}
                </div>
            </div>
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '90%' }" :close-on-click-overlay="false" :closeable="true">
            <div class="secBOx">
                <tabPanel
                    :tabsParams="tabsParams"
                    :defaultView="defaultView"
                    @defaultViewChange="defaultViewChange"
                >
                </tabPanel>

                <div class="lawBox" >
                    <div class="lawCard" v-loading="loading" v-for="(item,index) in tableMap" :key="item.id">
                        <div class="title">
                            {{ index + 1 + '、' + item.name }}
                        </div>
                        <div class="intoImg" @click="openChildPop(item)">
                            一>
                        </div>
                    </div>
                </div>

                <van-sticky  position="bottom">
                        <van-button
                        type="primary"
                        @click="updateEmit"
                        class="mc"
                        v-debounce
                        >已选择{{countIndex}}条,确认选择</van-button
                        >
                    </van-sticky>
            </div>
            <van-popup v-model:show="show1" position="right" :style="{  height: '100%', width:'80%'}" >
                <div class="secBOx">
                    <div class="lawBox" >
                        <van-checkbox-group v-model="checked"  >
                            <van-checkbox :name="item.id" v-for="(item,index) in tableDataChild" :key="item.id">{{ index + 1 + '、' + item.name }}</van-checkbox>
                        </van-checkbox-group>

                    </div>
                    <van-sticky  position="bottom">
                        <van-button
                        type="primary"
                        @click="xxx"
                        class="mc"
                        v-debounce
                        >确认</van-button
                        >
                    </van-sticky>
                </div>
            </van-popup> 
        </van-popup> 
    </div>
</template>
  
<script lang="ts" setup>
import tabPanel from '@/components/hy/tabPanel/index.vue'
import api from '@/api';
import { useAuthStore, useSystemStore } from '@/store';

const props = defineProps({
  formData: {
    type: Object,
    default: {}
  },
  apiParams: {
    type: Function,
    default: () => {}
  },
  modelValue: {
    type: Array,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const systemStore = useSystemStore();

const show = ref(false)
const show1 = ref(false)
const loading = ref(false)
const tableData = ref<any[]>([])
const tableData1 = ref<any[]>([])
const tableDataChild = ref<any[]>([])
const openFa = ref<any>({})
const btnxxx = ref<{
        nationLaw: any[],
        placeLaw: any[]
      }>({
        nationLaw: [],
        placeLaw: []
      })

const lawDia = computed<any>({
  get() {
    return props.modelValue || {
        nationLaw: [],
        placeLaw: []
      };
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const tableMap = computed(() =>{
    return defaultView.value === 1? tableData.value : tableData1.value
})

const tabsParams = computed(() => {
  return systemStore.dict.law_type.map((e: any) => {
    return {
      slotName: e.value,
      title: e.label,
      visible: true
    };
  });
});
const defaultView = ref(tabsParams.value[0].slotName);
const checked = ref<any[]>([])

const defaultViewChange = (val: any) => {
  defaultView.value = val;
  getApi();
};

const countIndex = computed((e:any) =>{
    let key = 0;
    btnxxx.value.nationLaw.forEach((e:any) =>{
        if(e.children){
            key += e.children.length
        }
    })
    btnxxx.value.placeLaw.forEach((e:any) =>{
        if(e.children){
            key += e.children.length
        }
    })
    return key || 0
})

async function getApi() {
    loading.value = true
    const res = await api.regulationsOutlint.queryAllData({
        type: defaultView.value
    });
    if(defaultView.value === 1) tableData.value = res.data;
    if(defaultView.value === 2) tableData1.value = res.data;
    loading.value = false
}

function openPop(){
    show.value = true
    getApi();
}

function openChildPop(item:any){
    tableDataChild.value = item.children
    openFa.value = item

    show1.value = true
}

function xxx(){
    let showArray: any[] = cilchBtnFn(checked.value, tableData.value);
    let showArray1: any[] = cilchBtnFn(checked.value, tableData1.value);
    show1.value = false;
    btnxxx.value = {
        nationLaw: showArray,
        placeLaw: showArray1
    }
}


function cilchBtnFn(stringArr: string[], mapArray: any[]) {
  let key: any[] = [];
  stringArr.forEach((e: any) => {
    mapArray.forEach((item: any) => {
      item.children.forEach((child: any) => {
        if (e === child.id) {
          let keyFlag = false;
          key.forEach((mck: any, index: any) => {
            if (mck.id === item.id) {
              key[index].children.push(child);
              keyFlag = true;
            }
          });
          if (!keyFlag) {
            key.push({
              ...item,
              children: [child]
            });
          }
        }
      });
    });
  });
  return key;
}

function updateEmit() {
    emit('update:modelValue', btnxxx.value);
    show.value = false
}

</script>
  
<style lang="less" scoped>

.contentBox{
    width: 90vw;
}

.secBOx{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 7% 5% 2% 5%;

    background-color: #f2f2f2;
    display: flex;
    
    flex-direction: column;

    .lawBox{
        flex:1;
        overflow: auto;
        .lawCard{
            width: 100%;
            height: 5rem;
            box-sizing: border-box;
            padding: 0.5rem 1rem;
            display: flex;
            flex-direction: row;
            margin-bottom: 1rem;
            background-color: #fff;
            border-radius: 0.5rem;
            .title{
                flex: 1;
                height: 100%;
                line-height: 1.25rem;
                box-sizing: border-box;
                padding: 0 0.5rem;
                overflow: hidden;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                display: -webkit-box;
            }
            .intoImg{
                width: 10%;
                height: 100%;
                display: flex;
                flex-direction: column-reverse;
                justify-content: center;
                &:hover{
                    color: #0c9bfa;
                }
            }
        }
    }
}

.mc{
    width: 100%;
}

:deep(.van-checkbox){
    width: 100%;
    border-color: #fff;
    margin-bottom: 1.5rem;
}

.showBox{
    box-sizing: border-box;
    padding: 5% 10% 0 0;
    width: 100%;
    overflow: hidden;

    .lawTitle{
        width: 100%;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 0.5rem;
        &::before {
            content: '-';
            height: 100%;
            font-weight: bold;
            color: var(--hy-primary-color);
            margin-right: 8px;
        }
    }

    .showIndex{
        margin-bottom: 1rem;
        width: 100%;
        .faTitle{
                width: 100%;
                font-size: 16px;
                font-weight: 800;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

        }
        .childrenTitle{
            box-sizing: border-box;
                width: 100%;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                display: -webkit-box;
                text-indent: 2em;
        }
    }
}
</style>
  