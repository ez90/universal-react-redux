import express from 'express'
import Loadable from 'react-loadable'
import indexController from './controllers/index'
import serverRenderer from './middleware/renderer'

const path = require("path")

// initialize the application
const app = express()

// Port to be used by express
const PORT = 3001

// TODO :Support post requests with body data (doesn't support multipart, use multer)
// TODO: Support Gzip

// Set up route handling, include static assets
app.use(indexController)
app.use(express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' },))
app.use('/', serverRenderer)

// start the app after preloading all loadable components on the server
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error)
        }

        console.log("Loadable components are preloaded")
        console.log("Listening on port " + PORT + " ...")
    })
})
