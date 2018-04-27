import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class Menu extends Component {
    static propTypes = {}

    render() {
        return (
            <ul>
                <li>
                    <NavLink to={`/`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={`/about/`}>About</NavLink>
                </li>
            </ul>
        )
    }
}

export default Menu
