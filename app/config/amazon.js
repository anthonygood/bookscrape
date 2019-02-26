const HARDCOVER_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good/dp/1786495678/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr='
const KINDLE_URL = 'https://www.amazon.co.uk/Kill-redacted-Anthony-Good-ebook/dp/B07DK49PYN/ref=cm_cr_arp_d_product_top?ie=UTF8'

module.exports = {
  sitename: 'Amazon',
  filename: 'amazon.json',
  url: HARDCOVER_URL,
  kindleUrl: KINDLE_URL,
  selector: '#acrCustomerReviewText',
}
