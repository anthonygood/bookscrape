const puppeteer = require('puppeteer')
const { scrapeReviewsCountFromSite } = require('./util')
const readersfirst = require('./readersfirst')
const amazon = require('./amazon')
const goodreads = require('./goodreads')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const scrapeReviews = scrapeReviewsCountFromSite(page)

  await scrapeReviews(readersfirst)
  await scrapeReviews(amazon)
  await scrapeReviews(goodreads)

  await browser.close()
}

scrape().then(() => console.log('Done scraping.'))
