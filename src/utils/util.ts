/**
 * 判断对象数组每一个对象元素的属性是否为空
 * @param objArr 要处理的对象数组
 * @param arr 你想要判断的属性，不传则判断全部属性
 */
export function isEachItemEmpty(objArr: any, arr?: string[] | undefined) {
  return new Promise((resolve, reject) => {
    try {
      for (const r of objArr) {
        let pickedObj = r;
        if (arr) {
          pickedObj = arr.reduce((iter: any, val: any) => (val in r && (iter[val] = r[val]), iter), {});
        }
        if (Object.values(pickedObj).includes('') || Object.values(pickedObj).includes(null) || Object.values(pickedObj).includes(undefined)) {
          resolve(true);
        }
      }
      resolve(false);
    } catch (error) {
      console.log('error:', error.toString());
      reject(error);
    }
  });
}

/** 从对象数组中，选取我需要的对象属性
 * obj：需要处理的对象
 * arr：需要的字段名
 * exp:  pickINeed({age:1,name:'lisi1'},['age'])  => {age:1}
 */
export function pickINeed(obj: any, arr: string[]) {
  return arr.reduce((iter: any, val: any) => (val in obj && (iter[val] = obj[val]), iter), {});
}
