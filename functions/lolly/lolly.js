const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require('shortid');

const typeDefs = gql`
  type Query {
    getLolly(id: String!):lolly
  }
  type lolly {
    id: String!
    flvTop: String!
    flvMiddle: String!
    flvBottom: String!
    recName: String!
    msg: String!
    senderName: String!
  }
  type Mutation {
    addLolly(
      flvTop: String!, 
      flvMiddle: String!,
      flvBottom: String!,
      recName: String!,
      msg: String!
      senderName: String!,
      ) : lolly
  }
`

const resolvers = {
  Query: {
    getLolly: async (_,{id}) => {
      
      try {
        const client = new faunadb.Client({ secret: process.env.faunadbKey });
      
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_by_id"), id))
          )

         return result.data
      }
      catch (error) {
        console.log(error)
      }
    }

  },
  Mutation: {
    addLolly: async (_, { flvTop, flvMiddle, flvBottom, recName, msg ,senderName }) => {
      var adminClient = new faunadb.Client({ secret: process.env.faunadbKey });
      const result = await adminClient.query(
        q.Create(
          q.Collection('lollies'),
          {
            data: {
              id: shortid.generate(),
              flvTop, flvMiddle, flvBottom, recName, msg, senderName,
            }
          },
        )
      )

      return {
        id: result.data.id,
      };
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
