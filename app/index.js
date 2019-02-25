const puppeteer = require('puppeteer')
const {
  AmazonScraper,
  GoodreadsScraper,
  ReadersFirstScraper
} = require('./scrapers')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await new AmazonScraper(page).scrape()
  await new GoodreadsScraper(page).scrape()
  await new ReadersFirstScraper(page).scrape()

  await browser.close()
}

scrape().then(() => console.log('Done scraping.'))
