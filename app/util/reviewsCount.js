const { output, readOrInitJsonArray } = require('./fs')

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

const scrapeReviewsCountFromSite = (page, eventEmitter) => async ({
  url,
  selector,
  sitename,
  filename,
  getElContent = getTextContent,
  getNum = getNumFromText
}) => {
  await page.goto(url)

  const scrapes = readOrInitJsonArray(filename)
  const prevScrape = scrapes[scrapes.length - 1]

  const newScrape = await scrapeReviewsCount({
    prevScrape,
    selector,
    sitename,
    page,
    getElContent,
    getNum
  })

  if (newScrape) {
    eventEmitter.emit('change', sitename, prevScrape, newScrape)

    return output(
      filename,
      scrapes.concat(newScrape)
    )
  }
}

module.exports = {
  scrapeReviewsCount,
  scrapeReviewsCountFromSite
}
