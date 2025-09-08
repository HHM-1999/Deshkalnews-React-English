import React from 'react'
import { Helmet } from "react-helmet";

export default function CatLdJson({ CatNames, CatNameSlug }) {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org/",
                        "@type": "BreadcrumbList",
                        "itemListElement": [ 
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${CatNames}",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL + CatNameSlug}"
                            }
                        ]
                    }
                `}
            </script>
        </Helmet>
    )
}
