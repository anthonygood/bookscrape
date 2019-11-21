const PersistentArray = require('./PersistentAray')
const { scrapeReviewsCount } = require('./reviewsCount')
const { output, readOrInitJsonArray } = require('./fs')
const tryScrapeCatchScreenshot = require('./tryScrapeCatchScreenshot')

module.exports = {
  PersistentArray,
  output,
  readOrInitJsonArray,
  scrapeReviewsCount,
  tryScrapeCatchScreenshot
}
