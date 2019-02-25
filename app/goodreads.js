const {
  output,
  scrapeReviewsCount
} = require('./util')

const NAME = 'Goodreads'
const FILENAME = 'goodreads.json'
const BOOK_URL = 'https://www.goodreads.com/book/show/40964543-kill-redacted'

const scrapeGoodreads = async page => {
  await page.goto(BOOK_URL)

  const scrapes = await scrapeReviewsCount({
    selector: 'meta[itemprop=reviewCount]',
    getElContent: el => el.content,
    getNum: Number,
    sitename: NAME,
    filename: FILENAME,
    page,
  })

  output(FILENAME, scrapes)
}

module.exports = {
  scrapeGoodreads
}
