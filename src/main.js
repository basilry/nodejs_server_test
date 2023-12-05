//@ts-check

/**
 * 블로그 포스팅 서비스
 *
 * 로컬 파일을 데이터베이스로 활용할 예정 json
 * 인증 로직 제외
 * RESTful api 사용
 */

const http = require('http')
const { routes } = require('./api')

/**
 * Post
 *
 * GET / posts
 * GET / posts/:id
 * POST / posts
 */

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) => req.url && req.method && _route.url.test(req.url) && _route.method === req.method,
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    /**@type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              throw new Error('Ill-fromed json')
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regexResult, reqBody)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})
