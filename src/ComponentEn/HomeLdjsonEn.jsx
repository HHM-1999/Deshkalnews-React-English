import React from 'react'
import { Helmet } from "react-helmet";

export default function HomeLdjsonEn() {
    return (
        <Helmet>
            {/* <!-- Organization Schema --> */}
            <script type="application/ld+json">
                {`
                    {
                        "name":"deshkalnews.com",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}english",
                        "logo":{
                            "@context":"http://schema.org",
                            "@type":"ImageObject",
                            "author":"Deshkal News: Deshkalnews.com",
                            "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "name":"logo",
                            "width":"250",
                            "height":"99"
                        },
                        "sameAs":[
                            
                        ],
                        "@type":"Organization",
                        "@context":"http://schema.org"
                    }  
                `}
            </script>
            {/* <!-- Breadcrumb Schema --> */}
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}english"
                            }
                        ]
                    }
                       
                `}
            </script>
            {/* Website Schema  */}
            <script type="application/ld+json">
                {`
                    {
                        "@context":"http://schema.org",
                        "@type":"Website",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}english",
                        "interactivityType":"mixed",
                        "name":"Deshkal News English",
                        "headline":"DeshkalNews.com | Latest Bangladesh and World News | Breaking Updates",
                        "keywords":"Deshkal News, Bangladesh news, latest news, breaking news, national news, politics, international news, sports news, entertainment, economy, technology, opinion, jobs news",
                        "copyrightHolder":{
                            "@type":"Organization",
                            "name":"Deshkal News"
                        },
                        "potentialAction":{
                            "@type":"SearchAction",
                            "target":"${process.env.REACT_APP_FONT_DOMAIN_URL}english/search/{query}",
                            "query-input":"required name=query"
                        },
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}english"
                        }
                    }
                       
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context":"http://schema.org",
                        "@type":"LocalBusiness",
                        "name":"Deshkal News English",
                        "image":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "11/8/D (2nd Floor), Paradise Maria, Free School St",
                            "addressLocality": "Dhaka",
                            "postalCode": "1205",
                            "addressRegion": "Dhaka",
                            "addressCountry": "BD"
                          },
                          "telephone": "+880 2-41062939",
                          "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}english",
                          "openingHours": [
                            "Mo-Su 00:00-23:59"
                          ]
                        }
                    }
                       
                `}
            </script>
        </Helmet>
    )
}
