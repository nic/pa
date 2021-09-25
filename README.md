<p align="center" style="margin-bottom: -20px">
  <img src="https://user-images.githubusercontent.com/66042/134787099-7f7caebb-798f-422a-a865-932a3fa0872a.png"/>
</p>


Let's try to make this happen: https://twitter.com/upNic/status/1440450181980295175


![pa example](https://user-images.githubusercontent.com/66042/134760105-b090749f-f9f4-496c-aaf0-ed33a6208ee1.png)

## How to run
```bash
$ yarn && yarn start
```

## Execute your first scraper
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
