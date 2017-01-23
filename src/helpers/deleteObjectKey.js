import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'

const getKey = function (key) {
  var intKey = parseInt(key)
  if (intKey.toString() === key) {
    return intKey
  }
  return key
}

const del = function (obj, path) {
  if (typeof path === 'number') {
    path = [path]
  }

  if (obj == null) {
    return obj
  }

  if (isEmpty(path)) {
    return obj
  }

  if (typeof path === 'string') {
    return del(obj, path.split('.'))
  }

  var currentPath = getKey(path[0])

  if (path.length === 1) {
    if (isArray(obj)) {
      obj.splice(currentPath, 1)
    } else {
      delete obj[currentPath]
    }
  } else {
    if (obj[currentPath] !== void 0) {
      return del(obj[currentPath], path.slice(1))
    }
  }

  return obj
}

export default del
