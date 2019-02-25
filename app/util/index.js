const { scrapeReviewsCount, scrapeReviewsCountFromSite } = require('./reviewsCount')
const { output } = require('./fs')

module.exports = {
  output,
  scrapeReviewsCount,
  scrapeReviewsCountFromSite
}