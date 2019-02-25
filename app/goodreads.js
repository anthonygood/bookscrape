module.exports = {
  sitename: 'Goodreads',
  filename: 'goodreads.json',
  url: 'https://www.goodreads.com/book/show/40964543-kill-redacted',
  selector: 'meta[itemprop=reviewCount]',
  getElContent: el => el.content,
  getNum: Number
}
