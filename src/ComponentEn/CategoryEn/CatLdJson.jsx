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
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "${CatNames}",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL + 'english/'+ CatNameSlug}"
                            }
                        ]
                    }
                `}
            </script>
        </Helmet>
    )
}
