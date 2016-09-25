process.nextTick(function A() {
  process.nextTick(function B() {
    console.log(1);
    process.nextTick(function D() { console.log(2); });
    process.nextTick(function E() { console.log(3); });
  });
  process.nextTick(function C() {
    console.log(4);
    process.nextTick(function F() { console.log(5); });
    process.nextTick(function G() { console.log(6); });
  });
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)