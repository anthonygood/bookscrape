const { output, readOrInitJsonArray } = require('./fs')

const getTextContent = el => el.textContent

const getNumFromText = text => {
  const string = text.trim().match(/\d+/)[0]
  return string && Number(string)
}

const scrapeReviewsCount = async ({
  page,
  sitename,
  filename,
  selector,
  getNum = getNumFromText,
  getElContent = getTextContent
}) => {
  const reviewsCountEl = await page.$(selector)
  const reviewsCountText = await page.evaluate(getElContent, reviewsCountEl)
  const reviewsCount = getNum(reviewsCountText)

  const scrapes = readOrInitJsonArray(filename)
  const latest = scrapes[scrapes.length - 1]

  if (latest) console.log(
    `
    Last change of ${sitename} scraped at: ${latest.createdAt}
    Number of reviews was: ${latest.reviewsCount}
    Number of reviews now: ${reviewsCount}
    `
  )

  if (latest && reviewsCount <= latest.reviewsCount) return scrapes

  scrapes.push({
    reviewsCount,
    createdAt: new Date()
  })

  return scrapes
}

const scrapeReviewsCountFromSite = page => async ({
  url,
  selector,
  sitename,
  filename,
  getElContent = getTextContent,
  getNum = getNumFromText
}) => {
  await page.goto(url)

  const scrapes = await scrapeReviewsCount({
    selector,
    sitename,
    filename,
    page,
    getElContent,
    getNum
  })

  return output(filename, scrapes)
}

module.exports = {
  scrapeReviewsCount,
  scrapeReviewsCountFromSite
}
