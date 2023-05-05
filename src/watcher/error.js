import { sendData } from './per.js';

// 监听错误事件
window.addEventListener('error', function(event) {
  // 获取错误信息
  var message = event.message;
  var filename = event.filename;
  var lineno = event.lineno;
  var colno = event.colno;

  // 构造要发送的数据
  var data = {
    type: 'error',
    message: message,
    filename: filename,
    lineno: lineno,
    colno: colno,
    // 其他您想要收集的信息
  };

  // 发送数据
  sendData(data);
});
// 劫持console.error
const originConsoleError = console.error;
// 上报每个error
console.error = (...errors)=>{
  errors.forEach((e) => {
       handleError(e) // 处理错误并上报emit
  } );
  originConsoleError.apply(console, errors);
};
/*
在实现前端监控时，需要考虑如何避免影响用户体验、如何保证数据的准确性和完整性。下面是一些可能有用的建议：

- **避免影响用户体验**：在实现前端监控时，应尽量避免对用户体验造成影响。例如，您可以使用异步方法来发送数据，以避免阻塞页面的加载和渲染。此外，您还可以考虑使用节流和防抖技术来减少数据发送的频率，以减少对网络带宽的占用。

- **保证数据的准确性**：为了保证收集到的数据的准确性，您应该尽量避免在收集和发送数据的过程中出现错误。例如，您可以使用try-catch语句来捕获可能出现的异常，并在出现异常时进行相应的处理。

- **保证数据的完整性**：为了保证收集到的数据的完整性，您应该尽量确保所有需要收集的数据都能够被正确地获取并发送到服务器。例如，您可以使用队列来缓存需要发送的数据，并在网络连接恢复正常时再将其发送出去。

这些只是一些简单的建议，实际应用中可能会更加复杂。您需要根据您的项目实际情况进行相应的调整和修改。
*/