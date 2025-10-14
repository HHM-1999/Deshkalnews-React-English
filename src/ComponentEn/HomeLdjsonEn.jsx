import React from 'react'
import { Helmet } from "react-helmet";

export default function HomeLdjsonEn() {
    return (
        <Helmet>
            {/* <!--Organization Schema -->  */}
            <script type="application/ld+json">
                {`{
                    "@context": "https://schema.org",
                "@type": "NewsMediaOrganization",
                "name": "Deshkal News",
                "alternateName": "দেশকাল নিউজ",
                "url": "https://deshkalnews.com",
                "logo": {
                    "@type": "ImageObject",
                "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                "width": 300,
                "height": 300
                },
                "foundingDate": "2024-01-01",
                "founder": {
                    "@type": "Person",
                "name": "Eliash Uddin Palash",
                "jobTitle": "Founder & Editor-in-Chief",
                "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}about"},
                "publisher": {
                    "@type": "Organization",
                "name": "Deshkal News English",
                "logo": {
                    "@type": "ImageObject",
                "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png"}},
                "contactPoint": {
                    "@type": "ContactPoint",
                "contactType": "Editorial",
                "email": "info@deshkalnews.com",
                "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}contact-us"},
                "address": {
                    "@type": "PostalAddress",
                "streetAddress": "11/8/D (2nd Floor), Paradise Maria, Free School St",
                "addressLocality": "Dhaka",
                "postalCode": "1205",
                "addressRegion": "Dhaka",
                "addressCountry": "BD"},
                "telephone": "+880241062939",
                "inLanguage": "en",
                "description": "Deshkal News is a trusted Bangladeshi news platform publishing national and international stories in both English and Bangla.",
                "headline": "Deshkal News - Reliable Source for National and International News",
                "sameAs": [
                "https://www.facebook.com/DeshkalNews24",
                "https://www.instagram.com/Deshkalnews",
                "https://x.com/Deshkalnews",
                "https://www.youtube.com/@DeshkalNews24",
                "https://www.linkedin.com/company/deshkal-news",
                "https://www.threads.net/@deshkalnews"
                ],
                "potentialAction": {
                    "@type": "SearchAction",
                "target": "${process.env.REACT_APP_FONT_DOMAIN_URL}search/{query}",
                "query-input": "required name=query"}}
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
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                            }
                        ]
                    }
                       
                `}
            </script>
        </Helmet>
    )
}
