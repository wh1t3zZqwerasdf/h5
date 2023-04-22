import type {
    ApiPage,
    noticeListData,
    noticeListReturnData,
    addNotice
  } from '@/types';
  import { API_URL, http } from '@/utils/request';
  
  const PREFIX = `${API_URL.ADMIN}`;
  
  //添加新的会议通知
  export function addNotice(data:addNotice) {
    return http({
      url: `${PREFIX}/system/notice/add`,
      method: 'post',
      data
    });
  }
  
  //查看通知列表
  export function noticeList(data: noticeListData) {
    return http<ApiPage<noticeListReturnData>>({
      url: `${PREFIX}/system/notice/query/list`,
      method: 'post',
      data
    });
  }
//查看通知信息详情
  export function viewNotice(data:{id:string}) {
    return http<noticeListReturnData>({
      url: `${PREFIX}/system/notice/query/info`,
      method: 'post',
      params: data
    });
  }
  //修改会议通知信息
  export function editNotice(data: addNotice) {
    return http({
      url: `${PREFIX}/system/notice/update`,
      method: 'post',
      data
    });
  }
  //删除会议通知信息
  export function deleteNotice(data:any) {
    return http<noticeListReturnData>({
      url: `${PREFIX}/system/notice/deletes`,
      method: 'post',
      data
    });
  }
  
    //发布会议通知信息
    export function issueNotice(data:any) {
      return http<noticeListReturnData>({
        url: `${PREFIX}/system/notice/release/data`,
        method: 'get',
        params: data
      });
    }

        //撤销会议通知信息
    export function revocationNotice(data:any) {
      return http<noticeListReturnData>({
        url: `${PREFIX}/system/notice/revoke/data`,
        method: 'get',
        params: data
      });
    }


    //查看会议通知
    export function checkNotice(data:any) {
      return http({
        url: `${PREFIX}/system/notice/query/message`,
        method: 'post',
        data
      });
    }
        //查看未读消息列表和下标
    export function findNotice(data:any) {
      return http({
        url: `${PREFIX}/system/notice/query/list/user`,
        method: 'post',
        data
      });
    }

    

//更新阅读信息情况
export function updateNotice(data:{noticeId:string}) {
  return http<noticeListReturnData>({
    url: `${PREFIX}/system/notice/send/read/user`,
    method: 'post',
    params: data
  });
}