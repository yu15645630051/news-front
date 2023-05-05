import './error.js'
import './event.js'
function myNew(constructor, ...args) {
  // Step 1: 创建一个新的空对象
  const obj = {};

  // Step 2: 将这个新对象的 __proto__ 属性设置为构造函数的 prototype 属性
  Object.setPrototypeOf(obj, constructor.prototype);
  // obj.__proto__ = obj.prototype

  // Step 3: 将构造函数的 this 绑定到新创建的对象，并调用构造函数
  const result = constructor.apply(obj, args);

  // Step 4: 如果构造函数返回了一个对象，那么这个对象将作为 new 表达式的结果返回。否则，返回新创建的对象。
  return result instanceof Object ? result : obj;
}

// 使用 myNew 函数来模拟 new 关键字的行为
function Person(name, age) {
// 将Person称之为构造函数
  this.name = name;
  this.age = age;
}

const person1 = myNew(Person, 'Alice', 25);
console.log('name',person1.name); // 输出: Alice
console.log('age', person1.age); // 输出: 25

// 定义一个缓存数组
var cache = [];

// 定义一个发送数据的函数
function sendData(data) {
  // 将数据添加到缓存数组中
  cache.push(data);
}

// 定义一个定时发送数据的函数
async function sendCache() {
  // 判断缓存数组是否为空
  if (cache.length > 0) {
    // 在这里，您可以使用AJAX、Fetch或其他方法将数据发送到服务器
    // 例如：
    // fetch('/api/track', {
    //   method: 'POST',
    //   body: JSON.stringify(cache),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    const res = await send('http://localhost:3000?test=123')
    if (res) {
      // 清空缓存数组
      cache = [];
    }
  }
}
function send(data) {
  // productID 是根据业务产品来的自己的唯一的id
  // baseURL 发送的地址 
  const img = new Image();
  const params = new URLSearchParams(data).toString();
  img.src = `http://localhost:3000/track.gif?${params}`;
}

// 启动定时器，每隔一段时间执行一次sendCache函数
setInterval(sendCache, 10000); // 每隔10秒执行一次

// 监听页面加载事件
window.addEventListener('load', function() {
  const now = Date. now( )
    setTimeout(() => {
    console. log('time10', Date.now() - now)
},10)

setTimeout(() => {
    console. log('time30', Date.now() - now)
},30)


while (true) {
    if (Date.now()- now>=20) {
        break
    }
}


console. log(Date. now() - now) // 输出? ?
  // 获取性能数据
  const [performanceData] = performance.getEntriesByType("navigation");
  // if (performance && performance.getEntriesByType) {
  //   const [performanceData] = performance.getEntriesByType("navigation");
  // }
  // 即将废弃 推荐上面的PerformanceNavigationTiming写法
  // var performanceData = window.performance.timing;
  // 计算页面加载时间
  console.log('performanceData',performanceData);
  console.log('erformanceData.navigationStart',performanceData.navigationStart);
  var pageLoadTime = performanceData.domContentLoadedEventEnd - performanceData.navigationStart;
  // 计算请求响应时间
  const requestResponseTime = performanceData.responseEnd - performanceData.requestStart;

  // 计算DNS查询时间
  var dnsLookupTime = performanceData.domainLookupEnd - performanceData.domainLookupStart;

  // 计算TCP连接时间
  var tcpConnectTime = performanceData.connectEnd - performanceData.connectStart;

  // 计算白屏时间
  // var whiteScreenTime = performanceData.responseStart - performanceData.navigationStart;
  var whiteScreenTime = performanceData.domInteractive - performanceData.responseStart;


  // 获取 FCP 时间
  let fcpTime = 0;
  const [fcpEntry] = performance.getEntriesByName("first-contentful-paint");
  if (fcpEntry) {
    fcpTime = fcpEntry.startTime;
  }

  // 获取 LCP 时间
  let lcpTime = 0;
  const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
  if (lcpEntries.length > 0) {
    lcpTime = lcpEntries[lcpEntries.length - 1].renderTime || lcpEntries[lcpEntries.length - 1].loadTime;
  }
  // 构造要发送的性能数据
  var perfData = {
    type: 'performance',
    pageLoadTime: pageLoadTime,
    dnsLookupTime: dnsLookupTime,
    tcpConnectTime: tcpConnectTime,
    whiteScreenTime: whiteScreenTime,
    requestResponseTime: requestResponseTime,
    // 其他您想要收集的信息
  };

  // 发送性能数据
  sendData(perfData);

});
export {sendData} 
