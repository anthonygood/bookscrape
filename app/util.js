const path = require('path')

const output = (filename, object) =>
  writeFileSync(filename, JSON.stringify(object, null, 2))

const readOrInitJsonArray = filename => {
  try {

    return require(
      path.resolve(filename)
    )

  } catch (err) {

    console.log(`Error reading '${filename}': ${err.toString()}`)
    writeFileSync(filename, '[]')

    return require(
      path.resolve(filename)
    )
  }
}

module.exports = {
  output,
  readOrInitJsonArray
}