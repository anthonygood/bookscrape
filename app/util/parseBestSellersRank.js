class MatchError extends Error {}

const throwMatchErr = (type, str) => {
  throw new MatchError(`No category data found for '${type}' in text: '${str}'`)
}

const stripCommas = str =>
  str.replace(',', '')

const toNum = str =>
  Number(stripCommas(str))

const parseHeadlineRank = str => {
  const match = str.match(/([\d\,]+).+?((Paid in )?Kindle Store|Books)/)

  if (!match) throwMatchErr('headline rank', str)

  const [_, rank, category] = match

  return {
    [category]: toNum(rank)
  }
}

const parseCategories = str => {
  const categoryInfoRegex = /\n#?([\d\,]+) in\s(.+)/g

  let match
  const categoryData = {}

  while (match = categoryInfoRegex.exec(str)) {
    const [_, rank, categories] = match
    categoryData[categories] = toNum(rank)
  }

  if (!Object.keys(categoryData).length) throwMatchErr('categories', str)

  return categoryData
}

const parseBestSellersRank = str => {
  return {
    ...parseHeadlineRank(str),
    ...parseCategories(str)
  }
}

module.exports = parseBestSellersRank