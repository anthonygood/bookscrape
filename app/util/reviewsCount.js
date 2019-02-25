const getTextContent = el => el.textContent

const getNumFromText = text => {
  const string = text.trim().match(/\d+/)[0]
  return string && Number(string)
}

const scrapeReviewsCount = async ({
  page,
  prevScrape,
  selector,
  getNum = getNumFromText,
  getElContent = getTextContent
}) => {
  const reviewsCountEl = await page.$(selector)
  const reviewsCountText = await page.evaluate(getElContent, reviewsCountEl)
  const reviewsCount = getNum(reviewsCountText)

  if (prevScrape && reviewsCount <= prevScrape.reviewsCount) return null

  return {
    reviewsCount,
    createdAt: new Date()
  }
}

module.exports = {
  scrapeReviewsCount
}
