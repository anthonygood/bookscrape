Number.prototype.commaSeparated = function() {
  const asString = this.toString()
  const chars = []
  let count = 1
  for (let i = asString.length - 1; i >= 0; i-- && count++) {
    const shouldPlaceCommaHere = count % 3 === 0 && count !== asString.length
    const nextChar = shouldPlaceCommaHere ? `,${asString[i]}` : asString[i]
    chars[i] = nextChar
  }
  return chars.join('')
}