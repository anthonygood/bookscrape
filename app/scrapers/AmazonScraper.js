const Scraper = require('./Scraper')
const config = require('../config/amazon')

class AmazonScraper extends Scraper {
  get config() {
    return config
  }
}

module.exports = AmazonScraper
