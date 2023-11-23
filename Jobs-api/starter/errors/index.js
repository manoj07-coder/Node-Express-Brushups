const CustomAPIError = require('./custom-error')
const badRequestError = require('./badRequest')
const authorizationError = require('./unAuthenticated')
const notFoundError = require('./notFound-error')


module.exports = {
    CustomAPIError,
    badRequestError,
    authorizationError,
    notFoundError
}