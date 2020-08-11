'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const {buildSchema} = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/events");
const db = 'mongodb://waletayo:hidogs1@ds213612.mlab.com:13612/hidogs';


/**
 * @function express function
 * */
const app = express();
/**
 * @function graphql middleware
 * */

app.use("/graphql", graphqlHttp({
    schema: buildSchema(`
    type Event{
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String
    }
    input EventInput{
    title:String!
    description:String!
    price:Float!
    date:String
    
    }
    type RootQuery {
         events:[Event!]!
    }
    type RootMutation {
       createEvent(eventInput:EventInput): Event
    }
    schema{
    query:RootQuery
    mutation:RootMutation
    }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(response => {
                    return response.map(event => {
                        return {...event._doc};
                    })
                }).catch(err => {
                    return err
                })
        },
        createEvent: (args) => {
            const event = {
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
            };
            const save_event = new Event(event);
            return save_event.save()
                .then(result => {
                    return {...result._doc};
                }).catch(err => {
                    throw err
                })

        }
    },
    graphiql: true
}))
app.use(bodyParser.json());

mongoose.connect(db, function (err, connected) {
    if (err) throw err
    console.log("connect to mongodb")
    app.listen(3000, console.log("connected"));

})
