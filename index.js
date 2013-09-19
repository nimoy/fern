var Stream = require('stream').Stream
var inherits = require('inherits')

inherits(Fern,Stream)

module.exports = Fern

function Fern (name, obj) {
  Stream.call(this) 
  this.readable = true
  this.writable = true
  var self = this  
  
  this.write = function (chunk) {
    if (typeof chunk === 'string') var d = JSON.parse(chunk)
    if (d instanceof Object && d[name]) {
      var a = d[name]
      var cmd = a[0]
      var param = a[1]
      var cb = a[2]
      API[cmd](param, function handleResult (val) {
        self.emit('data',JSON.stringify({res:val,fn: cmd}))
      })
    } else {
      self.emit('data',chunk)
    } 
  } 
  this.end = function () {} 
} 
