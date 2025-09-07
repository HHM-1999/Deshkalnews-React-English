import axios from 'axios';
import React, { useEffect, useState } from "react";
import DocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, formatDateToBengali, scrollTop } from '../AllFunctions';
import ErrorPage from "../ErrorPageEn";
// import SocialShare from "../s";

var lazyloaded = false
export default function VideoDetails() {
    let { vdoSlug, vdoID } = useParams();
    const [VideoDetails, setVideoDetails] = useState([]);
    const [videosList, setVideosList] = useState([]);
    const [videoSlug, setVideoSlug] = useState([]);

    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        axios
            .get(`${process.env.REACT_APP_API_URL}videos-details/${vdoID}`)
            .then(({ data }) => {
                // setisLoading(false)
                setVideoDetails(data.VideoDetails[0])
                setVideoSlug(data.VideoDetails[0].Slug)
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
        axios
            .get(`${process.env.REACT_APP_API_URL}details-video-latest/4/${vdoID}`)
            .then(({ data }) => {
                setVideosList(data.allLatestVideos);
            })
       
    }, [vdoSlug, vdoID])

    if (!localStorage.getItem('VideoView_' + vdoID)) {
        localStorage.setItem('VideoView_' + vdoID, 1);
        axios
            .get(`${process.env.REACT_APP_API_URL}video-hit-count/${vdoID}`)
            .then(({ data }) => {
            })
    }//vidio hit
    return (
        <>

            {VideoDetails ?
                <main>

                    <>
                        <h2 className="DTitle">
                            <Link to="/videos" onClick={scrollTop}>
                                <span className="DTitleInner"><span className="DTitleInnerBar"><span>Video Gallery</span></span></span>
                            </Link>
                            <DocumentTitle title={VideoDetails.WebTVHeadingEn} />
                        </h2>
                        <div className="container">
                            <div className="DVideoDetailsArea mb-5 mt-4">
                                <div className="row">
                                    <div className="col-lg-8 col-12 border-right-inner">
                                        <h1 className="Title BGTitle fw-bold my-2" style={{ fontSize: '26px', lineHeight: '38px' }}>
                                            {/* <Link to={'/video/cat/' + VideoDetails.Slug} onClick={scrollTop}>
                                            {VideoDetails.WebTVHeadingEn}
                                        </Link> */}
                                            {VideoDetails.WebTVHeadingEn}
                                        </h1>
                                        <div className="DVideoDetailsFrame" key={VideoDetails.WebTVHeadingEn}>
                                            <div className="col-sm-12 video-container">
                                                {VideoDetails.SourceType === "1" || VideoDetails.SourceType === 1 ?
                                                    <iframe className="embed-responsive-item" title={VideoDetails.WebTVHeadingEn} src={"https://www.youtube.com/embed/" + VideoDetails.WebTVLinkCode + "?autoplay=1"} frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>
                                                    : VideoDetails.SourceType === "2" || VideoDetails.SourceType === 2 ?
                                                        <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + VideoDetails.WebTVLinkCode + "%2F&show_text=0&width=560"} title={VideoDetails.WebTVHeadingEn} width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
                                                        // : VideoDetails.SourceType === "3" || VideoDetails.SourceType === 3 ?
                                                        //     <iframe src={"https://player.vimeo.com/video/" + VideoDetails.WebTVLinkCode} title={VideoDetails.WebTVHeadingEn} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen='true' allowFullScreen></iframe>
                                                        : false}
                                            </div>
                                        </div>
                                        <div className="mt-4 d-contents d-sm-flex justify-content-between align-items-center">
                                            {VideoDetails.create_date ? 
                                             <p className="VideoPublishDate mt-2"> <span>Published Date:</span> {VideoDetails.create_date ? ((VideoDetails.create_date).toString()) : ""} </p> : 
                                             <p className="VideoPublishDate mt-2"> <span>Published Date:</span> {VideoDetails.update_date ? ((VideoDetails.update_date	).toString()) : ""} </p>}
                                           
                                            {/* <SocialShare title={VideoDetails.WebTVHeadingEn} /> */}
                                        </div>
                                        {VideoDetails.Remarks &&
                                            <div className="Brief"><p dangerouslySetInnerHTML={{ __html: VideoDetails.Remarks }} /></div>
                                        }
                                    </div>

                                    {/* <div className="col-lg-4 col-12">
                                        
                                        <div className=" d-flex  justify-content-center">
                                            <Link to="#">
                                                <img src={Ads} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                            </Link>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="DVideoCatListTop4 mb-5">
                                <div className="CategoryPageTitleTop">
                                    <h2 className="MoreTitle">

                                        <span className="ColorBox"></span>
                                        <span>More Videos</span>

                                    </h2>
                                </div>
                                <div className="DCatTop4">
                                    <div className="row">
                                        {videosList.map((nc) => {
                                            return (

                                                <div className="col-lg-3 col-12 d-flex" key={nc.WebTVID} >
                                                    <div className="DCatTop3tList" >
                                                        <Link rel="preload" as="image" to={"/videos/" + nc.WebTVID}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-4 col-5">
                                                                    <div className="LiveVideoImg">
                                                                        <picture>
                                                                            {nc.WebTVLinkCode === null ? (
                                                                                <img
                                                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                                                    alt={nc.WebTVHeadingEn}
                                                                                    title={nc.WebTVHeadingEn}
                                                                                    className="img100 ImgRatio"
                                                                                    fetchpriority="high"
                                                                                    style={{width: "100%", height:"auto"}}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                                                    alt={nc.WebTVHeadingEn}
                                                                                    title={nc.WebTVHeadingEn}
                                                                                    className="img100 ImgRatio"
                                                                                    fetchpriority="high"
                                                                                    style={{width: "100%", height:"auto"}}
                                                                                />
                                                                            )}

                                                                        </picture>
                                                                        <div className="card-video-icon big transition">
                                                                            <i className="fa-solid fa-play"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-8 col-7">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.WebTVHeadingEn}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>


                </main>
                : <ErrorPage />}
        </>
    )
}
