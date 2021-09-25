# Pá ⛏
Scraper as a Service via GraphQL

> Let's try to make this happen: https://twitter.com/upNic/status/1440450181980295175


# How to run
```bash
$ yarn && yarn start
```

# Execute your first scraper
```graphql
{
  hackernews: scraper(url: "https://news.ycombinator.com/") {
    url
    news: selectList(of:"tr.athing") {
      title: selectString(of:"a")
      link: selectString(of:"td.title > a", attribute:"href")
    }
  }
}
```
