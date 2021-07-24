'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const handler = require('../../lib/handlers')

describe('handler', () => {
  describe('check_health()', () => {
    it('should response message', () => {
      const expected = { message: "I am Good." }
      const result = handler.check_health()

      assert.deepEqual(result, { message: "I am Good." })
    })
  })

  describe('page_not_found()', () => {
    it('should response message', () => {
      const expected = { message: "Page Not Found." }
      const result = handler.page_not_found()
      
      assert.deepEqual(result, expected)
    })
  })

  describe('format_data()', () => {
    it('should map example data to tree', () => {
      const request = {
        payload: {
          "0": [{
            id: 1,
            parent_id: null,
            children: []
          }],
          "2": [{
            id: 2,
            parent_id: null,
            children: []
          }],
        }
      }
      const expected = [{
        id: 1,
        parent_id: null,
        children: []
      }, {
        id: 2,
        parent_id: null,
        children: []
      }]
      const result = handler.format_data(request)

      assert.deepEqual(result, expected)
    })

    it('should map data to tree', () => {
      const request = {
        payload: {
          "0": [{
            "id": 10,
            "title": "House",
            "level": 0,
            "children": [],
            "parent_id": null
          }],
          "1": [{
            "id": 12,
            "title": "Red Roof",
            "level": 1,
            "children": [],
            "parent_id": 10
          },{
            "id": 18,
            "title": "Blue Roof",
            "level": 1,
            "children": [],
            "parent_id": 10
          },{ 
            "id": 13,
            "title": "Wall",
            "level": 1,
            "children": [],
            "parent_id": 10
          }],
          "2": [{
            "id": 17,
            "title": "Blue Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          }, {
            "id": 16,
            "title": "Door",
            "level": 2,
            "children": [],
            "parent_id": 13
          }, {
            "id": 15,
            "title": "Red Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          }]
        }
      }
      const expected = [{
        "id": 10,
        "title": "House",
        "level": 0,
        "children": [{
          "id": 12,
          "title": "Red Roof",
          "level": 1,
          "children":[{
            "id": 17,
            "title": "Blue Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          },{
            "id": 15,
            "title": "Red Window",
            "level": 2,
            "children": [],
            "parent_id": 12
          }],
          "parent_id": 10
        },{
          "id": 18,
          "title": "Blue Roof",
          "level": 1,
          "children": [],
          "parent_id": 10
        }, {
          "id": 13,
          "title": "Wall",
          "level": 1,
          "children":[{
            "id": 16,
            "title": "Door",
            "level": 2,
            "children": [],
            "parent_id": 13
          }],
          "parent_id": 10
        }],
        "parent_id": null
      }]
      const result = handler.format_data(request)

      assert.deepEqual(result, expected)
    })
  })
})