const assert = require('assert')
const dirty = require('./dirty')

assert.equal(
  dirty(
    {},
    {}
  ),
  false
)

assert.equal(
  dirty(
    { foo: 1 },
    { foo: 1 }
  ),
  false
)

assert.equal(
  dirty(
    { foo: 2, bar: true },
    { foo: 2, bar: true }
  ),
  false
)

assert.equal(
  dirty(
    { foo: 2 },
    { foo: 1 }
  ),
  true
)

assert.equal(
  dirty(
    { foo: 2, bar: true },
    { foo: 2, bar: false }
  ),
  true
)

assert.equal(
  dirty(
    { foo: 2, bar: true },
    { foo: 2 }
  ),
  true
)
