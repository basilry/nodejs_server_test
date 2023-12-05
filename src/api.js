// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {*} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {"GET" | "POST"} method
 * @property {() => Promise<APIResponse>} callback
 */

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => {
      // TODO: implement
      return {
        statusCode: 200,
        body: {},
      }
    },
  },

  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // TODO: 정규표현식으로 바꾸기
    method: 'GET',
    callback: async () => {
      return {
        statusCode: 200,
        body: {},
      }
    },
  },

  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => {
      // TODO: implement
      return {
        statusCode: 200,
        body: {},
      }
    },
  }
]

module.exports = {
  routes,
}
