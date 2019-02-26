const path = require('path')
const { writeFileSync } = require('fs')

const OUTPUT_DIR = 'output'

const outputPath = filename =>
  path.resolve(__filename, '../../../', OUTPUT_DIR, filename)

const output = (filename, object) =>
  writeFileSync(
    outputPath(filename),
    JSON.stringify(object, null, 2)
  )

const readOrInitJsonArray = filename => {
  const path = outputPath(filename)
  try {
    return require(path)
  } catch (err) {
    writeFileSync(path, '[]')
    return require(path)
  }
}

module.exports = {
  output,
  readOrInitJsonArray
}