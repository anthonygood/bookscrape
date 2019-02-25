const { writeFileSync } = require('fs')
const path = require('path')

const OUTPUT_DIR = 'output'

const outputPath = filename =>
  path.resolve(OUTPUT_DIR, filename)

const getNum = text => {
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
  selector
}) => {
  const reviewsCountEl = await page.$(selector)
  const reviewsCountText = await page.evaluate(el => el.textContent, reviewsCountEl)
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
    reviewsCount: getNum(reviewsCountText),
    createdAt: new Date()
  })

  return scrapes
}

module.exports = {
  getNum,
  output,
  readOrInitJsonArray,
  scrapeReviewsCount
}