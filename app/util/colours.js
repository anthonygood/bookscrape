const reset = '\x1b[0m'
const fgRed = '\x1b[31m'
const fgGreen = '\x1b[32m'

function colour(col) {
  return function() {
    return `${col}${this}${reset}`
  }
}

String.prototype.red = colour(fgRed)
String.prototype.green = colour(fgGreen)
