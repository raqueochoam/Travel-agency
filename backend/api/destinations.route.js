import express from "express"
import DestinationsCtrl from "./destinations.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(DestinationsCtrl.apiGetDestinations)
router.route("/id/:id").get(DestinationsCtrl.apiGetDestinationById)
router.route("/states").get(DestinationsCtrl.apiGetDestinationStates)

router
  .route("/reviews")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router