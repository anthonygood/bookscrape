const KINDLE_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good-ebook/dp/B07DK49PYN/ref=cm_cr_arp_d_product_top?ie=UTF8'
const PAPERBACK_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good/dp/1786495694/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr='

module.exports = {
  sitename: 'Amazon',
  filename: 'amazon.json',
  url: PAPERBACK_URL,
  kindleUrl: KINDLE_URL,
  selector: '#acrCustomerReviewText',
  rankDataSelector: '#detailBulletsWrapper_feature_div',
}
