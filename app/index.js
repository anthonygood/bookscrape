const puppeteer = require('puppeteer')
const Scraper = require('./Scraper')
const readersfirst = require('./readersfirst')
const amazon = require('./amazon')
const goodreads = require('./goodreads')

const scrape = async () => {
  const scraper = new Scraper()

  await scraper.scrape(readersfirst)
  await scraper.scrape(amazon)
  await scraper.scrape(goodreads)

  await scraper.close()
}

scrape().then(() => console.log('Done scraping.'))
