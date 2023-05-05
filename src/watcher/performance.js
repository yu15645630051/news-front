function sendData(data) {
  // 在这里，您可以使用AJAX、Fetch或其他方法将数据发送到服务器
  // 例如：
  // fetch('/api/track', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
}
// 前端监控函数
window.addEventListener('load', function() {
  // 获取 PerformanceNavigationTiming 对象
  const [navigationEntry] = performance.getEntriesByType("navigation");
  console.log('[navigationEntry]',[navigationEntry]);
  // 即将废弃 推荐上面的PerformanceNavigationTiming写法
  // const navigationEntry2 = window.performance.timing;
  // console.log('navigationEntry',navigationEntry2);

  // 计算页面加载时间
  const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;

  // 计算域名解析时间
  const dnsLookupTime = navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart;

  // 计算 TCP 连接时间
  const tcpConnectTime = navigationEntry.connectEnd - navigationEntry.connectStart;

  // 计算请求响应时间
  const requestResponseTime = navigationEntry.responseEnd - navigationEntry.requestStart;
  // 计算 DOM 解析时间
  const domParseTime = navigationEntry.domComplete - navigationEntry.domInteractive;
  // 计算白屏时间
  var whiteScreenTime = navigationEntry.responseStart - navigationEntry.navigationStart;
   console.log('navigationEntry.domComplete ',navigationEntry.domComplete );
   console.log('navigationEntry.domInteractive ',navigationEntry.domInteractive );

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
 // 获取资源性能数据
 var resourceData = window.performance.getEntriesByType('resource');

 // 遍历资源数据
 resourceData.forEach(function(resource) {
   // 获取资源的相关信息，例如名称、类型、大小等
   var name = resource.name;
   var type = resource.initiatorType;
   var size = resource.transferSize;

   // 构造要发送的资源数据
   var resData = {
     type: 'resource',
     name: name,
     resourceType: type,
     size: size,
     // 其他您想要收集的信息
   };
  })
  // 返回性能数据
  return {
    pageLoadTime,
    dnsLookupTime,
    tcpConnectTime,
    requestResponseTime,
    domParseTime,
    fcpTime,
    lcpTime,
    whiteScreenTime,
  };
  // 构造要发送的数据
  // var data = {
  //   type: 'performance',
  //   pageLoadTime: pageLoadTime,
  //   dnsLookupTime: dnsLookupTime,
  //   tcpConnectTime: tcpConnectTime,
  //   whiteScreenTime: whiteScreenTime,
  //   // 其他您想要收集的信息
  // };

  // // 发送数据
  sendData(data);
})



