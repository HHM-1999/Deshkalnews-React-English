import React from 'react'
import { Helmet } from "react-helmet";

export default function ArchiveLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Archive | All important old news and records",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/archives",
                    "breadcrumb": {
                      "@type": "BreadcrumbList",
                      "itemListElement": [{
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english"
                      },{
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Archive",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/archives"
                      }]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
