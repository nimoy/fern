module.exports = function (arr, cb) {
  var len = arr.length
  , cur = 0
  , val = null

  function next (i) {
    var link = arr[i]
    if (i <= len) {
      if (typeof link === 'function') {
        link(val, act)
      } else if (link instanceof Array) { // beef it
        var item = arr[0]
        item[0](item[1], act)
      }
    }
    if (i===len) {
      cb(val)
    }
  }

  function act (arg) {
    val = arg
    var n = cur++
    next(n)
  }

  next(cur)
}
