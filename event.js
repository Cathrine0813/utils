// event.js
let events = {};
/* 这里的 on 用来添加一个事件处理函数，每当 emit() 被调用触发某个事件时，都会执行这些函数，
* 并且以 on() 中存入的 self 作为 this argument， emit() 传入的 data 作为参数。
*/
function on(name, self, callback) {
  let tuple = [self, callback];
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.push(tuple);
  }
  else {
    events[name] = [tuple];
  }
}

function remove(name, self) {
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((tuple) => {
      return tuple[0] != self;
    })
  }
}
/* event.emit('languageChanged');
* 这是为了释放 languageChanged事件，让其他页面感知道，并在下次加载的时候修改语言。
*/
function emit(name, data) {
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.map((tuple) => {
      let self = tuple[0];
      let callback = tuple[1];
      callback.call(self, data);
    })
  }
}

exports.on = on;
exports.remove = remove;
exports.emit = emit;