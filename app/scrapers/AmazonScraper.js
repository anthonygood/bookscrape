const Scraper = require('./Scraper')
const config = require('../config/amazon')

class AmazonScraper extends Scraper {
  get config() {
    return config
  }

  async scrape() {
    await super.scrape()

    this.scrapeBestsellerStats()
  }

  async scrapeBestsellerStats() {
    // TODO
    // const page = await this.page
  }
}

module.exports = AmazonScraper
