import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../../ComponentEn/AllFunctions'
import SpecialTop from './SpecialTop'

var lazyloaded = false
var limit = 2

export default function LeadNews() {
    const [LeadData, setLeadData] = useState([])
    const [LeadData2, setLeadData2] = useState([])
    const [tagsRelatedNews, setTagsRelatedNews] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateLead.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setLeadData(data[0]);
                    setLeadData2(data.slice(1, 8));
                    setTimeout(function () {
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
            const formData = { 'slug': "One Year of Uprising", 'limit': limit, 'offset': 0 }
            axios
                .post(`${process.env.REACT_APP_EN_API_URL}tag-content`, formData)
                .then(({ data }) => {
                    if (data.tag_contents) {
                        setTagsRelatedNews(data.tag_contents);
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
    


    }, [])

    return (
        <>
            <div className="container">
                <div className="DTopNewsSection">
                    <div className="row">
                        <div className="col-lg-6 col-12 border-right-inner">
                            {/* {LeadData.ShowLiveBlog === 2 && LeadData.LiveBlogStatus === 2 ? */}
                            <div className="DLeadNews">
                                <Link rel="preload" as="image" to={"/" + LeadData.categorySlug + "/" + LeadData.ContentID} onClick={scrollTop} key={LeadData.ContentID}>
                                    <div className="LeadImage Imgresize">
                                        {LeadData.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} className="img-fluid img100" style={{width: "800px", height:"100%"}} /> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + LeadData.ImageBgPath} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} className="img-fluid img100" style={{width: "800px", height:"100%"}} />}

                                        {LeadData.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                    </div>
                                    <div className="Desc">
                                        <div className="live-title-wrap">
                                            {LeadData.AltHomeTitle ?
                                                <h1 className="Title">{LeadData.AltHomeTitle}</h1> :
                                                <>
                                                    {LeadData.ContentSubHeading === null || LeadData.ContentSubHeading === undefined ?
                                                        <h1 className="Title">{LeadData.DetailsHeading}</h1> :
                                                        <h1 className="Title"> <span className="subHeading">{LeadData.ContentSubHeading + " / "}</span> {LeadData.DetailsHeading}</h1>
                                                    }
                                                </>
                                            }

                                        </div>
                                        <div className="Brief">
                                            <p>{LeadData.ContentBrief}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12  order-lg-first border-right-inner">
                              {/* Short Event Section */}
                              {/* <div className="short-event">
                                <Link to={"/tags/One Year of Uprising"}>
                                    <div className="banner-area">
                                        <img src={eventBanner} alt="Deshkalnews.com" title='Deshkalnews.com' className='img-fluid' />
                                    </div>
                                </Link>
                               
                                <div className='leadTop3'>
                                    {tagsRelatedNews?.map((nc, i) => {
                                        return (
                                            <div className="CommonLeadList2" key={i} >
                                                <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}  >
                                                    <div className="row">
                                                        <div className="col-lg-5 col-5">
                                                            <div className="Imgresize">
                                                                {nc.ImageBgPath == null ?
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" /> :
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />}

                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-7">
                                                            <div className="Desc">
                                                                {nc.AltHomeTitle ?
                                                                    <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                                    <>
                                                                        {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                            <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                                            <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                                        }
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}</div>
                              

                            </div> */}
                            <div className="leadTop2">
                                <div className="leadTop2-wrap">
                                    <ul>
                                        {LeadData2.map((nc, i) => {
                                            return (
                                                <>
                                                {
                                                    nc.AltHomeTitle ?
                                                    <li><Link to={"/" + nc.categorySlug + "/" + nc.ContentID} onClick={scrollTop} key={i}>{nc.AltHomeTitle}</Link></li> :
                                                    <li><Link to={"/" + nc.categorySlug + "/" + nc.ContentID} onClick={scrollTop} key={i}>{nc.DetailsHeading}</Link></li>
                                                }
                                                </>
                                              
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 d-flex">
                            <SpecialTop />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
