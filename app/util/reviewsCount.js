const { outputPath } = require('../util/fs')

const getTextContent = el => el.textContent

const getNumFromText = text => {
  const string = text.trim().match(/\d+/)[0]
  return string && Number(string)
}

const scrapeReviewsCount = async ({
  page,
  selector,
  getNum = getNumFromText,
  getElContent = getTextContent
}) => {
  try {
    const reviewsCountEl = await page.$(selector)
    const reviewsCountText = await page.evaluate(getElContent, reviewsCountEl)
    const reviewsCount = getNum(reviewsCountText)
    return reviewsCount
  } catch (err) {
    const path = outputPath(`screenshots/error-${new Date()}.png`)
    console.error(`Failed to scrape reviews: ${err.toString()}`)
    console.log(`Saving screenshot to ${path}.`)
    return page.screenshot({ path })
  }
}

module.exports = {
  scrapeReviewsCount
}
