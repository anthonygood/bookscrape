const EventEmitter = require('events')
const { scrapeReviewsCountFromSite } = require('../util')

class Scraper extends EventEmitter {
  constructor(page) {
    super()
    this.page = page
    this.on('change', this.onChange)
  }

  get config() {
    throw new Error('Config missing for scraper.')
  }

  onChange(sitename, prevVal, nextVal) {
    prevVal = prevVal || { createdAt: 'Never!', reviewsCount: 'n/a' }
    console.log(
      `
      Last change of ${sitename} scraped at: ${prevVal.createdAt}
      Number of reviews was: ${prevVal.reviewsCount}
      Number of reviews now: ${nextVal.reviewsCount}
      `
    )
  }

  async scrape() {
    const page = await this.page
    // TODO tidy
    return scrapeReviewsCountFromSite(page, this)(this.config)
  }
}

module.exports = Scraper
