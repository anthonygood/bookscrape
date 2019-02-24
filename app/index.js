const puppeteer = require('puppeteer')
const { scrapeReadersFirst } = require('./readersfirst')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await scrapeReadersFirst(page)
  await browser.close()
}

scrape().then(() => console.log('done scraping.'))
