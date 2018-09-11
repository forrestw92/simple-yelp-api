const searchRoutes = {
  'POST /search': 'SearchController.businessSearch',
  'POST /complete': 'SearchController.autoComplete',
  'POST /delivery': 'SearchController.deliverySearch',
  'POST /lookup': 'SearchController.lookupBusiness',
  'POST /locate': 'SearchController.getLocate',
  'POST /reviews': 'SearchController.getReviews'
}
module.exports = searchRoutes
