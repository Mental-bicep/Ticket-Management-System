let arr=[1,2,3,100,5];
let idx=arr.indexOf(100);
console.log(idx);

// arr.remove(100);
arr.splice(idx,1);
console.log(arr);