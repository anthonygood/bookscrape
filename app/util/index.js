const { scrapeReviewsCount } = require('./reviewsCount')
const { output, readOrInitJsonArray } = require('./fs')
const PersistentArray = require('./PersistentAray')

module.exports = {
  PersistentArray,
  output,
  readOrInitJsonArray,
  scrapeReviewsCount
}
