const { output, readOrInitJsonArray } = require('./fs')

class PersistentArray {
  constructor(filename) {
    this.filename = filename
    console.log('readOrInit: ', readOrInitJsonArray)
    this._arr = readOrInitJsonArray(filename)
  }

  push(...items) {
    return output(
      this.filename,
      this._arr.concat(...items)
    )
  }

  values() {
    return this._arr
  }

  get length() {
    return this._arr.length
  }
}

module.exports = PersistentArray
