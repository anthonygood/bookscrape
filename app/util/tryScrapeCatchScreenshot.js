const { outputPath } = require('./fs')

const tryScrapeCatchScreenshot = async (page, fn, screenshotFilename = 'scrape') => {
  try {
    const result = await fn()
    return result
  } catch (err) {
    const path = outputPath(`screenshots/error-${screenshotFilename}-${new Date()}.png`)
    console.error(`Failed to scrape reviews: ${err.toString()}`)
    console.log(`Saving screenshot to ${path}.`)
    return page.screenshot({ path })
  }
}

module.exports = tryScrapeCatchScreenshot
