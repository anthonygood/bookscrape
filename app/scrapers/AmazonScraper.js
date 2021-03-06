const Scraper = require('./Scraper')
const config = require('../config/amazon')
const parseBestSellersRank = require('../util/parseBestSellersRank')
const { logDiffInverse } = require('../util/diff')
const { tryScrapeCatchScreenshot } = require('../util')

const BOOKS_KEY = 'Books'
const PAID_KINDLE_KEY = 'Kindle Store'

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
    const page = await this.page

    const rankStats = await tryScrapeCatchScreenshot(
      page,
      async () => {
        const rankStats = await this.scrapeBestsellerStats(timeNow)
        return {
          ...scrapeData,
          ...rankStats
        }
      },
      'amzn-best-seller-scrape'
    )

    return rankStats
  }

  async scrapeBestsellerStats(timeNow = new Date()) {
    const page = await this.page
    const paperbackStats = await this.scrapeStatsOnPage()

    await page.goto(this.config.kindleUrl)
    const kindleStats = await this.scrapeStatsOnPage()

    const newScrape = {
      ...paperbackStats,
      ...kindleStats,
      createdAt: timeNow
    }

    if (
      this.prevScrape &&
      newScrape[BOOKS_KEY]       !== this.prevScrape[BOOKS_KEY] ||
      newScrape[PAID_KINDLE_KEY] !== this.prevScrape[PAID_KINDLE_KEY]
    ) {
      this.emit('change:rank', this.prevScrape, newScrape)
    }

    return newScrape
  }

  dirty(data) {
    // Amazon returns stats in different format about half the time,
    // but the Books and Paid in Kindle Store are common to both.
    // -- NB. this is no longer the case, perhaps Amazon were A/B testing the format?
    const { prevScrape } = this
    return data.reviewsCount !== prevScrape.reviewsCount ||
      data[BOOKS_KEY] !== prevScrape[BOOKS_KEY] &&
      data[PAID_KINDLE_KEY] !== prevScrape[PAID_KINDLE_KEY]
  }

  async scrapeStatsOnPage() {
    const page = await this.page
    const bestSellerStatsEl = await page.$(this.config.rankDataSelector)
    const bestSellerText = await page.evaluate(_ => _.innerText, bestSellerStatsEl)
    return parseBestSellersRank(bestSellerText)
  }

  async onChangeRank(prevVal, nextVal) {
    prevVal = prevVal || { createdAt: 'Never!' }
    const { createdAt: createdAtPrev, reviewsCount, ...prevRest } = prevVal
    const { createdAt: createdAtNext, ...nextRest } = nextVal
    const diffLog = logDiffInverse(prevRest, nextRest)
    console.log(
      `Last change of ${this.config.sitename} rank scraped at: ${prevVal.createdAt}
This scrape at ${nextVal.createdAt}:\n
${diffLog}`
    )
  }
}

module.exports = AmazonScraper
