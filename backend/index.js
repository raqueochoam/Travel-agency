import app from "./server.js"
import mongodb from "mongodb";
import dotenv from "dotenv";
import DestinationsDAO from "./dao/destinationsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.TRAVAGENCY_DB_URI,
    {
        PoolSize:50,
        wtimeout:2500,
        useNewUrlParser:true}
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await DestinationsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })