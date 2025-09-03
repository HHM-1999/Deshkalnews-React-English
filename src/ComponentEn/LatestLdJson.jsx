import React from 'react'
import { Helmet } from "react-helmet";

export default function LatestLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Latest news, Breaking news | DeshkalNews.com",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/latest",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Latest",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/latest"
                            }
                        ]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
