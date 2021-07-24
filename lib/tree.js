'use strict'

exports.initial = (input) => {
  let mapper = {}

  const list_of_data = Object.values(input).reduce((acc, current_value) => {
    return acc.concat(current_value)
  }, [])

  list_of_data.forEach((value, i) => {
    mapper[value.id] = i
  })

  return { list_of_data, mapper }
}

exports.map_data = (list_of_data, mapper) => {
  let result = []

  list_of_data.forEach(value => {
    if (value.parent_id !== null) {
      list_of_data[mapper[value.parent_id]].children.push(value)
    } else {
      result.push(value)
    }
  })

  return result
}