function ncr(n, r) {
  return fact(n) / (fact(r) * fact(n - r));
}

function fact(n) {
  let res = 1;
  for (let i = 2; i < n; i++) {
    res = res * i;
  }
  return res;
}

let number = 12;
let count = 0;
let numFunc = (num) => Number(num);
let arr = Array.from(String(number), numFunc);
let flag1 = 0;
let flag2 = 0;
let k = 2;
let n = arr.length;

function sequenceSum(arr, k, n) {
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += arr[i];
  }
  let SubseqLen;
  SubseqLen = ncr(n, k);

  let ans = sum * ((k * SubseqLen) / n);
  return ans;
}

for (let ele of arr) {
  if (ele >= 0 && ele <= 9) {
    if (ele == 1) {
      flag1 = 1;
    }
    if (ele == 2) {
      flag2 = 1;
    }
  }
}
if (flag1 == 1 && flag2 == 1) {
    console.log(sequenceSum(arr, k, n) % 998244353);
}
