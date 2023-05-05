import { sendData } from './per.js';
// 防抖函数
function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
}
// 节流函数
function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (flag) {
      setTimeout(() => {
        fn.call(this)
        flag = true
      }, delay)
    }
    flag = false
  }
}

// 监听点击事件
document.addEventListener('click', function(event) {
  // 获取点击的元素
  var target = event.target;
  console.log('我点击了',event);

  // 获取元素的相关信息，例如ID、类名等
  var id = target.id;
  var className = target.className;

  // 构造要发送的数据
  var data = {
    type: 'click',
    id: id,
    className: className,
    // 其他您想要收集的信息
  };

  // 发送数据
  sendData(data);
});

// 监听滚动事件
document.addEventListener('scroll', throttle(function(event) {
  // 获取滚动位置
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  // 构造要发送的数据
  var data = {
    type: 'scroll',
    scrollTop: scrollTop,
    // 其他您想要收集的信息
  };

  // 发送数据
  sendData(data);
},2000));

// 监听输入事件
// document.addEventListener('input', debounce(function(event) {
//   // 获取输入的元素和值
//   var target = event.target;
//   var value = target.value;

//   // 构造要发送的数据
//   var data = {
//     type: 'input',
//     value: value,
//     // 其他您想要收集的信息
//   };

//   // 发送数据
//   sendData(data);
// },2000));