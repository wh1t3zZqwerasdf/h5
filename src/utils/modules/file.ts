/* a 标签下载文件 */
import { stringToBase64 } from '@/utils';

export function downloadFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = `${url}?response-content-type=application/octet-stream`;
  a.download = filename;
  a.click();
  a.remove();
}

/* 批量创建a标签下载文件 */
export function batchDownloadFile(fileList: string[]) {
  let count = 0;
  downItem(fileList[count]);

  function downItem(file: string) {
    count++;
    const fileNameArr = file.split('/');
    downloadFile(file, fileNameArr[fileNameArr.length - 1]);
    if (count < fileList.length) {
      setTimeout(() => {
        downItem(fileList[count]);
      }, 300);
    }
  }
}

/* 大小转换 */
const SIZE_KB = 1024;
const SIZE_MB = 1024 * 1024;
const SIZE_GB = 1024 * 1024 * 1024;

export function convertSize(size: number) {
  if (!size) return '';

  if (size < SIZE_KB) return `${size}B`;
  else if (size < SIZE_MB) return `${(size / SIZE_KB).toFixed(2)}KB`;
  else if (size < SIZE_GB) return `${(size / SIZE_MB).toFixed(2)}MB`;
  else return `${(size / SIZE_GB).toFixed(2)}GB`;
}

export function previewFile(fileUrl: string) {
  const baseURL = import.meta.env.VITE_APP_FILE_PREVIEW_URL;
  window.open(
    `${baseURL}/onlinePreview?url=${stringToBase64(fileUrl)}`,
    'target'
  );
}
