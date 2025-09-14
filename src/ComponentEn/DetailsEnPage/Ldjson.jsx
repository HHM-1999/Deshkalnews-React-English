import React from 'react'
import { Helmet } from "react-helmet";
import { convertToBSTISOString } from '../../ComponentEn/AllFunctions';

export default function Ldjson({ news, catName, catSlugEn,DisplayCatName }) {
    var oldHeader = `${news.DetailsHeading}`
    var newHeader = oldHeader.replaceAll('"', ''); //double quotation replaced by blank
    var KeyWord = `${news.DetailsHeading}`;
    KeyWord = KeyWord.split(" ");
    KeyWord = KeyWord.toString(); // added "comma" after every word
    var Details = `${news.ContentDetails}`
    Details = Details.replace(/<\/?[^>]+(>|$)/g, "") // removed all HTML-TAGS
    Details = Details.replaceAll("\\", ""); // removed all backslash
    Details = Details.replaceAll('"', '\\"'); // replace all double-quotes to string
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "http://schema.org",
                        "@type": "Article",
                        "headline": "${newHeader}",
                        "image": {
                          "@type": "ImageObject",
                          "url": "${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                          "width": "800",
                          "height": "450"
                        },
                        "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}",
                        "datePublished": "${convertToBSTISOString(news.created_at)}",
                        "dateModified": "${convertToBSTISOString(news.ModifiedDate)}",
                        "author": {
                          "@type": "Organization",
                          "name": "Deshkal News"
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": "Deshkal News",
                          "logo": {
                            "@type": "ImageObject",
                            "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png"
                          }
                        },
                        "mainEntityOfPage": {
                          "@type": "WebPage",
                          "@id": "${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}"
                        },
                        "keywords": "${KeyWord}",
                        "thumbnailUrl": "${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                        "articleBody": "${Details}",
                        "name": "${newHeader}",
                        "isAccessibleForFree": true,
                        "isPartOf": {
                          "@type": "WebPage",
                          "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}",
                          "primaryImageOfPage": {
                            "@type": "ImageObject",
                            "url": "${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                            "width": "800",
                            "height": "450"
                          }
                        },
                        "articleSection": "${catName}"
                      }
                      
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "http://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement":[
                            {
                                "@type": "ListItem",
                                "position":1,
                                "name":"Home",
                                "item":{
                                    "@type": "Thing",
                                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                                    "name": "Deshkal News English"
                                   
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position":2,
                                "item":{
                                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}",
                                    "name":"${catName}"
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position":3,
                                "item":{
                                    "name":"${newHeader}",
                                    "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}"
                                }
                            }
                        ]
                    }
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "headline":"${newHeader}",
                        "image":{
                            "@type":"ImageObject",
                            "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                            "width":"800",
                            "height":"450"
                        },
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}",
                        "datePublished":"${convertToBSTISOString(news.created_at)}",
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}"
                        },
                        "publisher":{
                            "@type":"Organization",
                            "@context":"http://schema.org",
                            "name":"DeshKalNews.com",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                            "logo":{
                                "@context":"http://schema.org",
                                "@type":"ImageObject",
                                "author":"DeshKalNews.com :: দেশকালনিউজ.কম",
                                "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                                "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                                "name":"logo",
                                "width":"300",
                                "height":"109"
                            },
                            "sameAs":["https://www.facebook.com/DeshkalNews24/"],
                            "id":"${process.env.REACT_APP_FONT_DOMAIN_URL}"
                        },
                        "author":[
                            {
                                "@type":"Person",
                                "givenName":"${news.WriterName}",
                                "name":"${news.WriterName}"
                            }
                        ],
                        "keywords":"${KeyWord}",
                        "thumbnailUrl":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                        "articleBody":"${Details}",
                        "dateCreated":"${convertToBSTISOString(news.created_at)}",
                        "dateModified":"${convertToBSTISOString(news.ModifiedDate)}",
                        "name":"${newHeader}",
                        "isAccessibleForFree":true,
                        "isPartOf":{
                            "@type":"WebPage",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}${catSlugEn}/${news.ContentID}",
                            "primaryImageOfPage":{
                                "@type":"ImageObject",
                                "url":"${process.env.REACT_APP_IMG_Path + news.ImageBgPath}",
                                "width":"800",
                                "height":"450"
                            }
                        },
                        "articleSection":"${catName}",
                        "description":"${DisplayCatName || catName   + 'Latest News :: DeshkalNews'}",
                        "@type":"NewsArticle",
                        "@context":"http://schema.org"
                    }
                `}
            </script>
        </Helmet>
    )
}