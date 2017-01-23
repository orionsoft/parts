import objectPath from 'object-path'
import keys from 'lodash/keys'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import del from './deleteObjectKey'

const filterObject = function (obj, key) {
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue
    if (typeof obj[i] === 'object') {
      filterObject(obj[i], key)
    } else if (i === key) {
      delete obj[key]
    }
  }
  return obj
}

const removeObjectWithKey = function (object, key) {
  del(object, key)
  if (!key.includes('.')) return object
  const preKey = key.replace(/\.\w+$/, '')
  const preValue = objectPath.get(object, preKey)
  if (isEqual(preValue, {}) || preValue === null) {
    return removeObjectWithKey(object, preKey)
  }

  return object
}

const inputToForm = function (input, keysMap) {
  let newInput = filterObject(cloneDeep(input), '__typename')
  keys(keysMap).forEach(schemaKey => {
    const formKey = keysMap[schemaKey]

    if (formKey === '__') {
      del(newInput, schemaKey)
    } else if (formKey === '..') {
      const value = objectPath.get(newInput, schemaKey)
      del(newInput, schemaKey)
      newInput = {...newInput, ...value}
    } else if (schemaKey.includes('.$.')) {
      const newSchemaParts = schemaKey.split('.$.')
      const preKey = newSchemaParts[0]
      const postKey = newSchemaParts[1]
      if (formKey.includes('.$.')) {
        (objectPath.get(newInput, preKey) || []).forEach((item, index) => {
          const value = objectPath.get(item, postKey)
          const newFormKey = formKey.replace('.$.', `.${index}.`)
          const newSchemaKey = schemaKey.replace('.$.', `.${index}.`)
          newInput = removeObjectWithKey(newInput, newSchemaKey)
          objectPath.set(newInput, newFormKey, value)
        })
      } else {
        const value = objectPath.get(newInput, preKey).map(item => {
          return objectPath.get(item, postKey)
        })
        newInput = removeObjectWithKey(newInput, preKey)
        objectPath.set(newInput, formKey, value)
      }
    } else {
      const value = objectPath.get(newInput, schemaKey)
      newInput = removeObjectWithKey(newInput, schemaKey)
      objectPath.set(newInput, formKey, value)
    }
  })

  return newInput
}

export default inputToForm
