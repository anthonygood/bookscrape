const Scraper = require('./Scraper')
const config = require('../config/readersfirst')

class ReadersFirstScraper extends Scraper {
  get config() {
    return config
  }
}

module.exports = ReadersFirstScraper
