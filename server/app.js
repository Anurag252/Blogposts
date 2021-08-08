import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import blog   from './endpoints/blog.js';
import cors from 'cors'


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Blog {
    id: Int
    heading(id :Int) : String
    imageurl(id :Int) : String
    content(id :Int) : String
    createdDate(id: Int)  : String
  }
  
  type Query {
    blog(id: Int): Blog
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  blog : function (id) {

        let postId = id.id;
        var result = {};

        result.id = postId;
        result.heading = (postId) => { return blog().GetHeading(postId); },
        result.imageurl = (postId) => { return blog().GetImageUrl(postId); },
        result.content = (postId) => { return blog().GetContent(postId); },
        result.createdDate = (postId) => { return blog().GetCreatedDate(postId); };
        return result;
    }
};

var app = express();
app.use(cors());
app.options('*', cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200);
    next();
  });
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));




app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');