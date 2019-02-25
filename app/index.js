const puppeteer = require('puppeteer')
const { scrapeReadersFirst } = require('./readersfirst')
const { scrapeAmazon } = require('./amazon')
const { scrapeGoodreads } = require('./goodreads')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await scrapeReadersFirst(page)
  await scrapeAmazon(page)
  await scrapeGoodreads(page)
  await browser.close()
}

scrape().then(() => console.log('Done scraping.'))
