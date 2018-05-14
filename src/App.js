import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import TitleAndMetaTags from './components/TitleAndMetaTags'
import Menu from './components/Menu'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Loadable from 'react-loadable'

import './App.css'

// const LoadableHomePage = Loadable({
//     loader: () => import('./pages/HomePage'),
//     loading: <div/>,
// });
//
// const LoadableAboutPage = Loadable({
//     loader: () => import('./pages/AboutPage'),
//     loading: <div/>,
// });

class App extends Component {
    render() {
        return (
            <div>
                <TitleAndMetaTags
                    title={'Test title 2'}
                    description={'Test desc'}
                    image={'Test image'}
                />
                <Menu />
                <Switch>
                    <Route exact path={`/`} component={HomePage}/>
                    <Route path={`/about/`} component={AboutPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        )
    }
}

export default App
