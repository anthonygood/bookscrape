const {
  output,
  scrapeReviewsCount
} = require('./util')

const NAME = 'Amazon'
const FILENAME = 'amazon.json'
const HARDCOVER_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good/dp/1786495678/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr='
const KINDLE_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good-ebook/dp/B07DK49PYN/ref=cm_cr_arp_d_product_top?ie=UTF8'

const scrapeAmazon = async page => {
  await page.goto(HARDCOVER_URL)

  const scrapes = await scrapeReviewsCount({
    selector: '#acrCustomerReviewText',
    sitename: NAME,
    filename: FILENAME,
    page,
  })

  return output(FILENAME, scrapes)
}

module.exports = {
  scrapeAmazon
}
