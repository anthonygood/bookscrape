const assert = require('assert')
const parseBestSellersRank = require('./parseBestSellersRank')

const kindlePageInput = `Amazon Bestsellers Rank: #6,617 Paid in Kindle Store (See Top 100 Paid in Kindle Store)
#53 in Kindle Store > Books > Literature & Fiction > Genre Fiction > Political
#58 in Kindle Store > Books > Crime, Thriller & Mystery > Thrillers > Terrorism
#61 in Kindle Store > Books > Literature & Fiction > Literary Fiction > Humour
`

const expectedKindlePageOutput = {
  'Paid in Kindle Store': 6617,
  'Kindle Store > Books > Literature & Fiction > Genre Fiction > Political': 53,
  'Kindle Store > Books > Crime, Thriller & Mystery > Thrillers > Terrorism': 58,
  'Kindle Store > Books > Literature & Fiction > Literary Fiction > Humour': 61
}

assert.deepStrictEqual(
  parseBestSellersRank(kindlePageInput),
  expectedKindlePageOutput
)

const hardbackPageInput = `Amazon Bestsellers Rank: 20,869 in Books (See Top 100 in Books)
#197 in Books > Fiction > Political
#263 in Books > Crime, Thrillers & Mystery > Political
#756 in Books > Fiction > Humour`

const expectedHardbackOutput = {
  'Books': 20869,
  'Books > Fiction > Political': 197,
  'Books > Crime, Thrillers & Mystery > Political': 263,
  'Books > Fiction > Humour': 756
}

assert.deepStrictEqual(
  parseBestSellersRank(hardbackPageInput),
  expectedHardbackOutput
)

// August 2020: Page markup changed, container id is now #detailBulletsWrapper_feature_div
const detailsContainerText = `Product details
File Size : 2365 KB
Print Length : 417 pages
Word Wise : Enabled
Publisher : Atlantic Books; Main Edition (7 Feb. 2019)
Enhanced Typesetting : Enabled
ASIN : B07DK49PYN
Language: : English
X-Ray : Not Enabled
Text-to-Speech : Not enabled
Best-sellers rank 73,444 in Kindle Store (See Top 100 in Kindle Store)
189 in Terrorism Thrillers (Kindle Store)
315 in Political Fiction (Kindle Store)
345 in Humourous Literary Fiction
Customer reviews: 3.8 out of 5 stars    48 ratings
`

assert.deepStrictEqual(
  parseBestSellersRank(detailsContainerText),
  {
    'Kindle Store': 73444,
    'Terrorism Thrillers (Kindle Store)': 189,
    'Political Fiction (Kindle Store)': 315,
    'Humourous Literary Fiction': 345
  }
)
