class Node {
  constructor(key, firstVal, secondVal) {
    if (!firstVal && !secondVal) throw new Error(
      `No values to diff (firstVal and secondVal undefined). Check key exists in either object being compared.`
    )

    this.data = {
      key,
      oldVal: firstVal,
      newVal: secondVal,
      dirty: firstVal !== secondVal,
      difference: secondVal - firstVal,
      isNew: false,
      deleted: false
    }

    if (!firstVal)  this.data.isNew   = true
    if (!secondVal) this.data.deleted = true
  }
}

module.exports = Node
