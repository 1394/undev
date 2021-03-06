const assert = require('assert')
const ObjMap = require('./objmap')
const Chain = require('./chain')

const om = () => ObjMap.from({a: 1, b: 2, c: 3, d: 4, e: false})

assert.deepEqual(
  om().only('a', 'c').get(),
  {a: 1, c: 3},
  'error',
)
assert.deepEqual(
  om().only(['a', 'c']).get(),
  {a: 1, c: 3},
  'error',
)
assert.deepEqual(
  om().only({a: true, c: true, e: 445}, {useDefs: [false]}).get(),
  {a: 1, c: 3, e: 445},
  'error',
)

assert.deepEqual(
  om().withFields(['a', 'b'], (v) => v.toString()).get(),
  {a: '1', b: '2', c: 3, d: 4, e: false},
  'error',
)


assert.deepEqual(
  Chain.from([1, 2, 3, 4, 5])
    .tom('reduce', (acc, el) => acc + el)
    .get(),
  15,
)
