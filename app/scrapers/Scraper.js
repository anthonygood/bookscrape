const EventEmitter = require('events')
const { scrapeReviewsCount, PersistentArray } = require('../util')
const dirty = require('../util/dirty')
const { logDiff } = require('../util/diff')

class Scraper extends EventEmitter {
  // Factory method
  static scrape(page) {
    return new this(page).scrapeAndSave()
  }

  constructor(page) {
    if (!page) throw new TypeError('The \'page\' parameter must be passed to scraper constructor.')

    super()
    this.page = page
    this.on('change:reviews', this.onChangeReviews)
  }

  get scrapes() {
    // Transparently wrap JSON array on disc and treat as normal array (sort of)
    this._persistentArray = this._persistentArray || new PersistentArray(this.config.filename)

    return this._persistentArray
  }

  get prevScrape() {
    return this.scrapes.last
  }

  get config() {
    throw new Error('Config missing for scraper.')
  }

  async scrapeAndSave() {
    const data = await this.scrape()

    if (data && this.dirty(data)) {
      this.scrapes.push(data)
    }
  }

  async scrape(timeNow = new Date()) {
    const page = await this.page
    await page.goto(this.config.url)

    const reviewsCount = await scrapeReviewsCount({ page, ...this.config })

    const newScrape = { reviewsCount, createdAt: timeNow }

    if (this.prevScrape && reviewsCount > this.prevScrape.reviewsCount) {
      this.emit(
        'change:reviews',
        this.prevScrape,
        newScrape
      )
    }

    return newScrape
  }

  dirty(data) {
    return dirty(data, this.prevScrape, { ignore: ['createdAt'] })
  }

  onChangeReviews(prevVal, nextVal) {
    prevVal = prevVal || { createdAt: 'Never!' }

    console.log(
      `Last change of ${this.config.sitename} reviews scraped at: ${prevVal.createdAt}.
This scrape at: ${nextVal.createdAt}.
${logDiff({ reviewsCount: prevVal.reviewsCount }, { reviewsCount: nextVal.reviewsCount })}`)
  }
}

module.exports = Scraper
