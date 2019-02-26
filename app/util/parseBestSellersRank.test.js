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
