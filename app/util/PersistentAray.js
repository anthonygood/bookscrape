const { output, readOrInitJsonArray } = require('./fs')

class PersistentArray {
  constructor(filename) {
    this.filename = filename
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

  get last() {
    return this._arr[this._arr.length - 1]
  }
}

module.exports = PersistentArray
