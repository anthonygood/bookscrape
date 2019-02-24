const { output, readOrInitJsonArray } = require('./util')

const scrapeReadersFirst = async page => {
  const url = 'https://www.readersfirst.co.uk/books/kill-redacted'
  const filename = 'readersfirst.json'
  const getNum = text =>
    text.trim().match(/\d+/)

  await page.goto(url)

  const reviewsCountEl = await page.$('.star-rating--large .star-rating__total')
  const reviewsCountText = await page.evaluate(el => el.textContent, reviewsCountEl)
  const reviewsCount = getNum(reviewsCountText)

  const json = readOrInitJsonArray(filename)
  const latest = json[json.length - 1]

  if (latest) console.log(
    `
    Last scrape was at: ${latest.createdAt}
    Number of reviews was: ${latest.reviewsCount}
    Number of reviews now: ${reviewsCount}
    `
  )

  if (latest && reviewsCount <= latest.reviewsCount) return

  json.push({
    reviewsCount: getNum(reviewsCountText),
    createdAt: new Date()
  })

  return output(
    filename,
    json
  )
}

module.exports = {
  scrapeReadersFirst
}
