// NB only checks for keys in `prev`,
// ie. additional keys in `next` are ignored.
const dirty = (prev, next, { ignore = [] } = {}) =>
  !!Object.keys(prev).find(key =>
    !ignore.includes(key) && prev[key] !== next[key]
  )

module.exports = dirty
