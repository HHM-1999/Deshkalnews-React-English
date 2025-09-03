import React from 'react';
import { Helmet } from "react-helmet";

export default function PhotoGalleryLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "News in Pictures | Photojournalism and Photo Reporting",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/photo",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Photo Gallery",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english/photo"
                            }
                        ]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
