const {
  output,
  scrapeReviewsCount
} = require('./util')

const NAME = 'Readers First'
const FILENAME = 'readersfirst.json'
const BOOK_URL = 'https://www.readersfirst.co.uk/books/kill-redacted'

const scrapeReadersFirst = async page => {
  await page.goto(BOOK_URL)

  const scrapes = await scrapeReviewsCount({
    selector: '.star-rating--large .star-rating__total',
    sitename: NAME,
    filename: FILENAME,
    page,
  })

  return output(FILENAME, scrapes)
}

module.exports = {
  scrapeReadersFirst
}
