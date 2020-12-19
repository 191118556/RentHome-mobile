import React, { Component } from 'react'
import { HashRouter, BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h3>404</h3>

                <Link to='/home'>test</Link>
                <Link to='/home'>test</Link>
                {/* <Route path='/home' component={Home}></Route> */}

            </div>
        )
    }
}
