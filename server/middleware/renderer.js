import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import { ReactReduxAppContainer } from 'react-redux-app-container'
import { Helmet } from 'react-helmet'

// Import Static router to handle SSR case
import { StaticRouter } from 'react-router-dom'

// Import saga, we need to run it before rendering
import sagas from '../../src/sagas'

// Import saga, we need to run it before rendering
import store from '../store'

// import our main App component
import App from '../../src/App'

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json'

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k])

const path = require("path")
const fs = require("fs")

/**
 * Prepare html response
 *
 * @param template
 * @param head
 * @param html
 * @param preloadedState
 * @param extraChunks
 */
const PrepareHtml = (template, { head, html, preloadedState, extraChunks }) => {
    return template
        .replace('</head>', `${head}</head>`) // String version of our HEAD
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)  // Write the React app
        .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${preloadedState}`)  // String version of our state
        .replace('</body>', extraChunks.join('') + '</body>') // Append the extra js assets
}

export default (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err)
            return res.status(404).end()
        }

        // Wait for saga
        store.runSaga(sagas).done.then(() => {

            const modules = []
            const context = {}

            // Prepare head as a string (with Helmet)
            const helmet = Helmet.renderStatic()
            const head = helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()

            // Prepare the app as a string
            const html = ReactDOMServer.renderToString(
                <Loadable.Capture report={m => modules.push(m)}>
                    <ReactReduxAppContainer store={store}>
                        <StaticRouter location={req.url} context={context}>
                            <App/>
                        </StaticRouter>
                    </ReactReduxAppContainer>
                </Loadable.Capture>
            )

            // The context has been filled by ReactRouter if there is any redirection
            // (Somewhere a `<Redirect>` was rendered)
            if (context.url) {
                res.redirect(302, { Location: context.url })
            }

            // Prepare the state as string from redux store
            const preloadedState = JSON.stringify(store.getState())

            // Map required assets to script tags to prepare chunks insertions
            const extraChunks = extractAssets(manifest, modules)
                .map(c => `<script type="text/javascript" src="/${c}"></script>`)

            // Now inject the rendered app into our html
            const PreparedHtml = PrepareHtml(htmlData, { head, html, preloadedState, extraChunks })

            // Send it to the client
            return res.send(PreparedHtml)
        })
    })
}
