const puppeteer = require('puppeteer')
const { scrapeReviewsCountFromSite } = require('./util')

class Scraper {
  constructor() {
    this.browser = puppeteer.launch()
    this.page = this.browser.then(_ => _.newPage())
  }

  scrape(config) {
    return this.page.then(_ =>
      scrapeReviewsCountFromSite(_)(config)
    )
  }

  close() {
    return this.browser.then(_ => _.close())
  }
}

module.exports = Scraper
