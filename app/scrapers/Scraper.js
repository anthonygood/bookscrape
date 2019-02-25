const EventEmitter = require('events')
const { scrapeReviewsCount, PersistentArray } = require('../util')

class Scraper extends EventEmitter {
  // Factory method
  static scrape(page) {
    return new this(page).scrape()
  }

  constructor(page) {
    if (!page) throw new TypeError('The \'page\' parameter must be passed to scraper constructor.')

    super()
    this.page = page
    this.on('change', this.onChange)
  }

  // Transparently wrap JSON array on disc and treat as normal array (sort of)
  get scrapes() {
    this._persistentArray = this._persistentArray || new PersistentArray(this.config.filename)

    return this._persistentArray
  }

  get prevScrape() {
    return this.scrapes[this.scrapes.length - 1]
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

    await page.goto(this.config.url)

    const newScrape = await scrapeReviewsCount({
      prevScrape: this.prevScrape,
      page,
      ...this.config
    })

    if (newScrape) {
      this.emit(
        'change',
        this.config.sitename,
        this.prevScrape,
        newScrape
      )

      this.scrapes.push(newScrape)
    }
  }
}

module.exports = Scraper
