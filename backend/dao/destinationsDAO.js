import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let destinations

export default class DestinationsDAO {
  static async injectDB(conn) {
    if (destinations) {
      return
    }
    try {
        destinations = await conn.db(process.env.TRAVAGENCY_NS).collection("destinations")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }

  static async getDestinations({
    filters = null,
    page = 0,
    destinationsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("state" in filters) {
        query = { "state": { $eq: filters["state"] } }
      } else if ("zone" in filters) {
        query = { "zone": { $eq: filters["zone"] } }
      }
    }

    let cursor
    
    try {
      cursor = await destinations
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { destinationsList: [], totalNumDestinations: 0 }
    }

    const displayCursor = cursor.limit(destinationsPerPage).skip(destinationsPerPage * page)

    try {
      const destinationsList = await displayCursor.toArray()
      const totalNumDestinations = await destinations.countDocuments(query)

      return { destinationsList, totalNumDestinations }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { destinationsList: [], totalNumRestaurants: 0 }
    }
  }
    static async getDestinationByID(id) {
    try {
       const pipeline = [
         {
            $match: {
                 _id: new ObjectId(id),             },
            },
            {
                $lookup: {
                    from: "reviews",
                    let: {
                        id: "$_id",
                    },
                       pipeline: [
                           {
                               $match: {
                                   $expr: {
                                       $eq: ["$destination_id", "$$id"],
                                   },
                               },
                           },
                           {
                               $sort: {
                                  date: -1,
                               },
                           },
                       ],
                       as: "reviews",
                   },
               },
               {
                   $addFields: {
                       reviews: "$reviews",
                   },
               },
           ]
       return await destinations.aggregate(pipeline).next()
     } catch (e) {
       console.error(`Something went wrong in getRestaurantByID: ${e}`)
       throw e
     }
   }

    static async getStates() {
     let states = []
     try {
       states = await destinations.distinct("state")
       return states
     } catch (e) {
       console.error(`Unable to get cuisines, ${e}`)
       return states
     }
   }
 }