const fetch = require('node-fetch')
const Yelp = require('yelp-fusion')
const {apiKey, options} = require('../config')
const client = Yelp.client(apiKey)
class SearchController {
  async businessSearch (req, res) {
    const {query, options} = req.body
    if (!query) {
      return res.status(400).json({error: 'QUERY_NOT_FOUND', message: 'Please provide a search query.'})
    }
    if (!options) {
      return res.status(400).json({error: 'OPTIONS_NOT_FOUND', message: 'Please provide a options query.'})
    }
    try {
      const searchResult = await client.search({term: query, ...options})
      if (searchResult.jsonBody) {
        return res.status(200).json(searchResult.jsonBody)
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({error})
    }
  }
  async lookupBusiness (req, res) {
    const { alias } = req.body
    if (!alias) {
      return res.status(400).json({error: 'ALIAS_NOT_FOUND', message: 'Please provide a business alias.'})
    }
    try {
      const lookup = await client.business(alias)
      if (lookup.jsonBody) {
        return res.status(200).json(lookup.jsonBody)
      }
    } catch (error) {
      return res.status(500).json({error})
    }
  }
  async autoComplete (req, res) {
    const {query, options} = req.body
    if (!query) {
      return res.status(400).json({error: 'QUERY_NOT_FOUND', message: 'Please provide a search query.'})
    }
    if (!options) {
      return res.status(400).json({error: 'OPTIONS_NOT_FOUND', message: 'Please provide a options query.'})
    }
    try {
      const response = await client.autocomplete({text: query, ...options})
      if (response.jsonBody) {
        return res.status(200).json(response.jsonBody)
      }
    } catch (error) {
      return res.status(500).json({error})
    }
  }
  async getReviews (req, res) {
    const { alias } = req.body
    if (!alias) {
      return res.status(400).json({error: 'ALIAS_NOT_FOUND', message: 'Please provide a business alias.'})
    }
    try {
      const response = await client.reviews(alias)
      if (response.jsonBody) {
        return res.status(200).json(response.jsonBody.reviews)
      }
    } catch (error) {
      return res.status(500).json({error})
    }
  }
  async deliverySearch (req, res) {
    const {location} = req.body
    try {
      const searchResult = await client.transactionSearch('delivery', location)
      if (searchResult.jsonBody) {
        return res.status(200).json(searchResult.jsonBody)
      }
    } catch (error) {
      return res.status(500).json({error})
    }
  }
  async getLocate (req, res) {
    const {location} = req.body
    try {
      fetch(
        `https://geocoder.api.here.com/6.2/geocode.json?app_id=${
          options.appId
        }&app_code=${options.appCode}&searchtext=${location
          .trim()
          .replace(' ', '+')}`
      )
    } catch (error) {
      return res.status(500).json({error})
    }
  };
}
module.exports = SearchController
