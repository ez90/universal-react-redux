import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const defaultDescription = 'A JavaScript library for building user interfaces'


class TitleAndMetaTags extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
    }

    render() {
        let { title, description, image } = this.props

        return (
            <Helmet title={title} >
                <meta name="description" content={description || defaultDescription} />
                <link rel="image_src" type="image/jpeg" href={image}/>

                {/* Facebook */}
                <meta property="og:title" content={title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content="/logo-og.png"/>
                <meta
                    property="og:description"
                    content={description || defaultDescription}
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary"/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:image:src" content="/logo-og.png"/>
                <meta
                    property="twitter:description"
                    content={description || defaultDescription}
                />
            </Helmet>
        )
    }


}

export default TitleAndMetaTags
