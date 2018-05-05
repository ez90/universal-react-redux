import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import TitleAndMetaTags from './components/TitleAndMetaTags'
import Menu from './components/Menu'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'

class App extends Component {
    render() {
        return (
            <div className="root">
                <TitleAndMetaTags
                    title={'Test title 2'}
                    description={'Test desc'}
                    image={'Test image'}
                />
                <Menu />
                <Switch>
                    <Route path={`/`} exact component={HomePage}/>
                    <Route path={`/about/`} strict component={AboutPage}/>
                    <Route component={NotFoundPage}/>
                    <Redirect to={`/`}/>
                </Switch>
            </div>
        )
    }
}

export default App
