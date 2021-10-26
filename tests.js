const assert = require('assert')
const ObjMap = require('./objmap')

const om = new ObjMap({a: 1, b: 2, c: 3, d: 4})

assert.deepEqual(
  om.only('a', 'c').get(),
  {a: 1, c: 3},
  'error',
)
assert.deepEqual(
  om.only(['a', 'c']).get(),
  {a: 1, c: 3},
  'error',
)
assert.deepEqual(
  om.only({a: true, c: true}).get(),
  {a: 1, c: 3},
  'error',
)
