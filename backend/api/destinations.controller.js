import DestinationsDAO from "../dao/destinationsDAO.js"

export default class DestinationsCtrl {
  static async apiGetDestinations(req, res, next) {
    const destinationsPerPage = req.query.destinationsPerPage ? parseInt(req.query.destinationsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.state) {
      filters.state = req.query.state
    } else if (req.query.zone) {
      filters.zone = req.query.zone
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { destinationsList, totalNumDestinations } = await DestinationsDAO.getDestinations({
      filters,
      page,
      destinationsPerPage,
    })

    let response = {
      destinations: destinationsList,
      page: page,
      filters: filters,
      entries_per_page: destinationsPerPage,
      total_results: totalNumDestinations,
    }
    res.json(response)
  }
  static async apiGetDestinationById(req, res, next) {
    try {
      let id = req.params.id || {}
      let destination = await DestinationsDAO.getDestinationByID(id)
      if (!destination) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(destination)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetDestinationStates(req, res, next) {
    try {
      let states = await DestinationsDAO.getStates()
      res.json(states)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}