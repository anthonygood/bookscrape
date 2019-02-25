const puppeteer = require('puppeteer')
const {
  AmazonScraper,
  GoodreadsScraper,
  ReadersFirstScraper
} = require('./scrapers')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await AmazonScraper.scrape(page)
  await GoodreadsScraper.scrape(page)
  await ReadersFirstScraper.scrape(page)

  await browser.close()
}

scrape().then(() => console.log('Done scraping.'))
