import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class HomePage extends Component {
    static propTypes = {}

    render() {

        const { error, loading, items } = this.props

        let entries = items.map(item => (
            <li key={item.id}>{item.title}</li>
        ))

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading) {
            return <div>Loading...</div>
        }

        return (
            <ul>
                {entries}
            </ul>
        )
    }
}

export default connect(
    (state) => ({
        items: state.reddit.items,
        loading: state.reddit.loading,
        error: state.reddit.error
    }), {}
)(HomePage)
