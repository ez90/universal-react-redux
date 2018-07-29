import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from 'ducks/loginFlow'

class HomePage extends Component {

    render() {

        const { error, loading, items, login, logout } = this.props

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
            <div>
                <button onClick={(e) => login('machette@hotmail.fr', 'kojihu') }>LOGIN</button>
                <button onClick={(e) => logout() }>LOGOUT</button>
                <ul>
                    {entries}
                </ul>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        items: state.reddit.items,
        loading: state.reddit.loading,
        error: state.reddit.error
    }), {
        login,
        logout,
    }
)(HomePage)
