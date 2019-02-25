const EventEmitter = require('events')
const puppeteer = require('puppeteer')
const { scrapeReviewsCountFromSite } = require('./util')

class Scraper extends EventEmitter {
  constructor() {
    super()
    this.browser = puppeteer.launch()
    this.page = this.browser.then(_ => _.newPage())
    this.on('change', this.onChange)
  }

  onChange(sitename, prevVal, nextVal) {
    const { createdAt } = prevVal

    console.log(
      `
      Last change of ${sitename} scraped at: ${createdAt}
      Number of reviews was: ${prevVal.reviewsCount}
      Number of reviews now: ${nextVal.reviewsCount}
      `
    )
  }

  async scrape(config) {
    const page = await this.page
    return scrapeReviewsCountFromSite(page, this)(config)
  }

  async close() {
    const browser = await this.browser
    return browser.close()
  }
}

module.exports = Scraper
