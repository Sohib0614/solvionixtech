import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function decorateRes(res) {
  if (!res.status) {
    res.status = function (code) {
      res.statusCode = code
      return res
    }
  }
  if (!res.json) {
    res.json = function (data) {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json')
      }
      res.end(JSON.stringify(data))
      return res
    }
  }
}

function apiDevMiddleware() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''

        if (url === '/api/chat' && req.method === 'POST') {
          let rawBody = ''
          req.on('data', (chunk) => {
            rawBody += chunk
          })
          req.on('end', async () => {
            try {
              req.body = rawBody ? JSON.parse(rawBody) : {}
            } catch {
              req.body = {}
            }
            try {
              decorateRes(res)
              const { default: handler } = await import('./api/chat.js')
              const result = await handler(req, res)
              if (result instanceof Response && !res.writableEnded) {
                res.statusCode = result.status
                result.headers.forEach((val, key) => res.setHeader(key, val))
                const text = await result.text()
                res.end(text)
              }
            } catch (err) {
              if (!res.writableEnded) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            }
          })
          return
        }

        if (url === '/api/contact' && req.method === 'POST') {
          let rawBody = ''
          req.on('data', (chunk) => {
            rawBody += chunk
          })
          req.on('end', async () => {
            try {
              req.body = rawBody ? JSON.parse(rawBody) : {}
            } catch {
              req.body = {}
            }
            try {
              decorateRes(res)
              const { default: handler } = await import('./api/contact.js')
              const result = await handler(req, res)
              if (result instanceof Response && !res.writableEnded) {
                res.statusCode = result.status
                result.headers.forEach((val, key) => res.setHeader(key, val))
                const text = await result.text()
                res.end(text)
              }
            } catch (err) {
              if (!res.writableEnded) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            }
          })
          return
        }

        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    server: {
      port: 5173,
    },
  build: {
    target: 'es2022',
    // The three.js chunk is ~990 kB raw / ~267 kB gzipped. That is the cost of
    // the hero scene, and it is accepted deliberately: it is code-split and
    // only fetched when the hero visual mounts, so it never blocks first paint.
    // The limit is raised to acknowledge it rather than to silence a surprise.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Long-lived vendor code, split from the app so route navigation does
        // not invalidate it. Rolldown requires the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(framer-motion|motion-dom|motion-utils|motion)\//.test(id)) {
            return 'motion'
          }
          if (/node_modules\/(three|@react-three)\//.test(id)) {
            // Long-lived and large, and only needed once the hero scene loads,
            // so it gets its own chunk rather than riding along with the app.
            return 'three'
          }
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
}})
