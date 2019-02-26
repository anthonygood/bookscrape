// NB only checks for keys in `prev`,
// ie. additional keys in `next` are ignored.
const dirty = (prev, next) =>
  !!Object.keys(prev).find(key =>
    prev[key] !== next[key]
  )

module.exports = dirty
