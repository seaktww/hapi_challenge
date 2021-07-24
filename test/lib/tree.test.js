'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const tree = require('../../lib/tree')

describe('tree', () => {
  describe('initial()', () => {
    it('should transform json data to flat array and create mapper', () => {
      const input = {
        "0": [{
          id: 1,
          children: [],
          parent_id: 2
        }, {
          id: 2,
          children: [],
          parent_id: null
        }],
        "1": [{
          id: 3,
          children: [],
          parent_id: 1
        }, {
          id: 4,
          children: [],
          parent_id: null
        }]
      }
      const expected = {
        list_of_data: [
          { id: 1, children: [], parent_id: 2 },
          { id: 2, children: [], parent_id: null },
          { id: 3, children: [], parent_id: 1 },
          { id: 4, children: [], parent_id: null }
        ],
        mapper: { '1': 0, '2': 1, '3': 2, '4':3 }
      }
      const result = tree.initial(input)
      assert.deepEqual(result, expected)
    })
  })

  describe('map_data()', () => {
    it('should map data to tree by mapper', () => {
      const list_of_data = [
        { id: 1, children: [], parent_id: 2 },
        { id: 2, children: [], parent_id: null },
        { id: 3, children: [], parent_id: 1 },
        { id: 4, children: [], parent_id: null },
        { id: 5, children: [], parent_id: 2 }
      ]
      const mapper = { '1': 0, '2': 1, '3': 2, '4':3 }
      const expected = [
        {
          id: 2,
          children: [{
            id: 1,
            children: [{
              id: 3,
              children: [],
              parent_id: 1
            }],
            parent_id: 2
          }, {
            id: 5,
            children: [],
            parent_id: 2
          }],
          parent_id: null
        }, {
          id: 4,
          children: [],
          parent_id: null
        }
      ]
      const result = tree.map_data(list_of_data, mapper)
      assert.deepEqual(result, expected)
    })
  })
})