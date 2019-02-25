const { writeFileSync } = require('fs')
const path = require('path')

const OUTPUT_DIR = 'output'

const outputPath = filename =>
  path.resolve(OUTPUT_DIR, filename)

const getNumFromText = text => {
  const string = text.trim().match(/\d+/)[0]
  return string && Number(string)
}

const output = (filename, object) =>
  writeFileSync(
    outputPath(filename),
    JSON.stringify(object, null, 2)
  )

const readOrInitJsonArray = filename => {
  const path = outputPath(filename)
  try {
    return require(path)
  } catch (err) {
    writeFileSync(path, '[]')
    return require(path)
  }
}

const scrapeReviewsCount = async ({
  page,
  sitename,
  filename,
  selector,
  getNum = getNumFromText,
  getElContent = el => el.textContent
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

module.exports = {
  output,
  readOrInitJsonArray,
  scrapeReviewsCount
}