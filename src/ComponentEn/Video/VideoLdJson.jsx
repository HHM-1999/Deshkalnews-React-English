import React from 'react';
import { Helmet } from "react-helmet";

export default function VideoLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "দেশকালনিউজ.কম :: ভিডিও গ্যালারী",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}videos",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [{
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                        },{
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Video Gallery",
                            "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}videos"
                        }]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
