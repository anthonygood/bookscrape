const assert = require('assert')
const { diff, logDiff } = require('.')
require('../colours')

let first, second, expected

first = { foo: 1 }
expected = { 'foo:': '1' }

assert.deepStrictEqual(
  diff(first, first),
  expected
)

first = { foo: 10 }
second = { foo: 11 }
expected = { 'foo:': '11 (' + '+1'.green() + ')' }

assert.deepStrictEqual(
  diff(first, second),
  expected
)

first = { foo: 10 }
second = {}
expected = { ['foo:'.red()]: '10'.red() }


assert.deepStrictEqual(
  diff(first, second),
  expected
)

first = {}
second = { foo: 12 }
expected = { ['foo:'.green()]: '12'.green() }

assert.deepStrictEqual(
  diff(first, second),
  expected
)

first = { foo: 55, bar: 2332 }
second = { foo: 12, qux: 4 }
expected = {
  'foo:': '12 (' + '-43'.red() + ')',
  ['bar:'.red()]: '2332'.red(),
  ['qux:'.green()]: '4'.green()
}

assert.deepStrictEqual(
  diff(first, second),
  expected
)
