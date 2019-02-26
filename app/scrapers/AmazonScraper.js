const Scraper = require('./Scraper')
const config = require('../config/amazon')
const parseBestSellersRank = require('../util/parseBestSellersRank')
const dirty = require('../util/dirty')

class AmazonScraper extends Scraper {
  constructor(page) {
    super(page)

    this.on('change:rank', this.onChangeRank)
  }

  get config() {
    return config
  }

  async scrape(timeNow = new Date()) {
    const scrapeData = await super.scrape(timeNow)
    const rankStats = await this.scrapeBestsellerStats()
    return {
      ...scrapeData,
      ...rankStats
    }
  }

  async scrapeReviewsCount() {
    return
  }

  async scrapeBestsellerStats() {
    // TODO
    const page = await this.page
    const hardcoverStats = await this.scrapeStatsOnPage()

    await page.goto(this.config.kindleUrl)

    const kindleStats = await this.scrapeStatsOnPage()

    const newScrape = {
      ...hardcoverStats,
      ...kindleStats
    }

    if (
      this.prevScrape &&
      dirty(newScrape, this.prevScrape)
    ) {
      this.emit('change:rank', this.prevScrape, newScrape)
    }

    return newScrape
  }

  async scrapeStatsOnPage() {
    const page = await this.page
    const bestSellerStatsEl = await page.$('#SalesRank')
    const bestSellerText = await page.evaluate(_ => _.innerText, bestSellerStatsEl)
    return parseBestSellersRank(bestSellerText)
  }

  async onChangeRank(prevVal, nextVal) {
    {
      prevVal = prevVal || { createdAt: 'Never!' }
      console.log(
        `
        Last change of ${this.config.sitename} rank scraped at: ${prevVal.createdAt}
        Now:\n${
          Object.keys(nextVal).map(key =>
            `          ${key}: ${nextVal[key]}\n`).join('')
        }
        `
      )
    }
  }
}

module.exports = AmazonScraper
