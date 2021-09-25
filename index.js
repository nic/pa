const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cheerio = require('cheerio');
const got = require('got');


const schema = buildSchema(`
  type Query {
    scraper (url: String): Scraper
  }
  
  type Scraper {
     selectString(of: String!, attribute: String): String
     selectList(of: String!, limit: Int = 5, ignoreEmpty:Boolean = false): [Scraper]

     size:Int
     raw:String
     url:String
  }
`);


const scraper = async ({url}) => {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  return {
    url: () => url,
    size: () => response.body.length,
    raw: () => response.body,
    selectString: ({of, attribute}) => (attribute ? $(of).attr(attribute) : $(of).text()),
    selectList: ({of, limit, ignoreEmpty}) => {
      let list = [];
      $(of).each(function (i, e) {
        if(list.length>=limit) return;
        if(ignoreEmpty && !$(this).text().length) return;
        list.push({
          raw: () => $(this).html(),
          selectString: ({of, attribute}) => (attribute ? $(this).find(of).attr(attribute) : $(this).find(of).text()),
        });
      });
      return list;
    },
  }
};

const root = {
  scraper
};


const app = express();
app.use('/graphql', graphqlHTTP({
  schema   : schema,
  rootValue: root,
  graphiql : true,
}));
app.listen(4000);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
