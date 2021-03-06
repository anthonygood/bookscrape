Number.prototype.commaSeparated = function() {
  const asString = this.toString()
  const chars = []
  let count = 1
  for (let i = asString.length - 1; i >= 0; i-- && count++) {
    const char = asString[i]
    const prevChar = asString[i - 1]
    const shouldPlaceCommaHere = count % 3 === 0 &&
      count !== asString.length &&
      prevChar !== '-'
    const nextChar = shouldPlaceCommaHere ? `,${char}` : char
    chars[i] = nextChar
  }
  return chars.join('')
}
