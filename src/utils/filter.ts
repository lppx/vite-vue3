import moment from 'moment';

export function numberFormatFilter(value: number) {
  if (!value) {
    return '0';
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  return intPartFormat;
}

function datetime(value: string, pattern = 'YYYY-MM-DD HH:mm:ss'): string | null {
  const result = moment(value).format(pattern);
  if (result === 'Invalid date') {
    return null;
  }
  return result;
}

export function dateFullFilter(dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return datetime(dataStr, pattern);
}

export function dateDateFilter(dataStr: string, pattern = 'YYYY-MM-DD') {
  return datetime(dataStr, pattern);
}

export function dateMonthFilter(dataStr: string, pattern = 'YYYY-MM') {
  return datetime(dataStr, pattern);
}

export function fileSizeFilter(bytes: number | string | undefined) {
  if (!bytes || bytes == 0) {
    return '0 Bytes';
  }
  if (typeof bytes === 'string') {
    bytes = Number(bytes);
  }
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
