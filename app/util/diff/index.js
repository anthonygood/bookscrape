const Node = require('./Node')

const loggableDiff = (
  colouriseIncrease = _ => _.green(),
  colouriseDecrease = _ => _.red()
) => nodeData => {
  let {
    deleted,
    difference,
    dirty,
    newVal,
    oldVal,
    isNew,
    key
  } = nodeData

  if (!dirty) return { [`  ${key}:`]: newVal.toString() }

  let val
  if (isNew) {
    key = `+ ${key}:`.green()
    val = newVal.toString().green()
  } else if (deleted) {
    key = `- ${key}:`.red()
    val = oldVal.toString().red()
  } else {
    difference = difference > 0 ?
      colouriseIncrease(`+${difference}`) :
      colouriseDecrease(`${difference}`)

    key = `  ${key}:`
    val = `${newVal} (${difference})`
  }

  return { [key]: val }
}

const defaultLoggableDiffFn = loggableDiff()
const invertedLoggableDiffFn = loggableDiff(_ => _.red(), _ => _.green())

const diff = loggableDiffFn => (first, second) => {
  return Object.keys({...first, ...second}).reduce(
    (acc, key) => {
      const firstVal = first[key]
      const secondVal = second[key]

      const node = new Node(key, firstVal, secondVal)
      return {
        ...acc,
        ...loggableDiffFn(node.data)
      }
    },
    {}
  )
}

const defaultDiff = diff(defaultLoggableDiffFn)
const inverseDiff = diff(invertedLoggableDiffFn)

const logDiff = diffFn => (first, second) => {
  difference = diffFn(first, second)
  return Object.keys(difference).map(key =>
    `${key} ${difference[key]}`
  ).join('\n')
}

module.exports = {
  diff: defaultDiff,
  logDiff: logDiff(defaultDiff),
  logDiffInverse: logDiff(inverseDiff)
}
