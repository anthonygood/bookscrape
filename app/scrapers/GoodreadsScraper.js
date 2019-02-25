const Scraper = require('./Scraper')
const config = require('../config/goodreads')

class GoodreadsScraper extends Scraper {
  get config() {
    return config
  }
}

module.exports = GoodreadsScraper
