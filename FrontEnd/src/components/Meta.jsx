import { Helmet } from "react-helmet";

import React from 'react'

export default function Meta(props) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </>
    )
}
