export function format(time, format) {
  var t = new Date(time);
  var tf = function(i){return (i < 10 ? '0' : '') + i};
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
      switch(a){
          case 'yyyy':
              return tf(t.getFullYear());
              break;
          case 'MM':
              return tf(t.getMonth() + 1);
              break;
          case 'mm':
              return tf(t.getMinutes());
              break;
          case 'dd':
              return tf(t.getDate());
              break;
          case 'HH':
              return tf(t.getHours());
              break;
          case 'ss':
              return tf(t.getSeconds());
              break;
      }
  })
}

// console.log('format', format(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'))

export function gapTime (time) {
  var h = Math.floor(time / 3600000)
  var m = Math.floor((time - h * 3600000) / 60000)
  var s = Math.floor((time - (h * 3600000 + m * 60000)) / 10000)
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}
