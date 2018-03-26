
function StringBuffer(str) {
  var arr = [];
  str = str || "";
  var size = 0; // 存放数组大小
  arr.push(str);
  // 追加字符串
  this.append = function(str1) {
    arr.push(str1);
    return this;
  };
  // 返回字符串
  this.toString = function() {
    return arr.join("");
  };
  // 清空 
  this.clear = function(key) {
    size = 0;
    arr = [];
  };
  // 返回数组大小 
  this.size = function() {
    return size;
  };
  // 返回数组 
  this.toArray = function() {
    return buffer;
  };
  // 倒序返回字符串 
  this.doReverse = function() {
    var str = buffer.join('');
    str = str.split('');
    return str.reverse().join('');
  };
}


module.exports = StringBuffer;
