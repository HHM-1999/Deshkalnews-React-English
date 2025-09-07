import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false


export default function VideoLatestSide({ CategoryName, catslug }) {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}webtv-category-video-latest/${catslug}/5`)
            .then(({ data }) => {
                setVideos(data.categoryWiseLatestVideo);
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }, [CategoryName]);

    return (
        <>
            <div className="DSecTitle2">
                <h2> {CategoryName} সর্বশেষ  খবর</h2>
            </div>
            <div className="DLeftSideNews">
                {videos && videos.map((nc) => {
                    return (
                        <div className="DTop3List" key={nc.WebTVID}>
                            <Link to={"/videos/" + CategoryName + "/" + nc.WebTVID}>
                                <div className="row">
                                    <div className="col-lg-5  col-5">
                                        <div className="LiveVideoImg">
                                            <picture>
                                                {nc.WebTVLinkCode === null ? (
                                                    <img
                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                        alt={nc.WebTVHeading}
                                                        title={nc.WebTVHeading}
                                                        className="img100 ImgRatio"
                                                    />
                                                ) : (
                                                    <img
                                                        src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                        alt={nc.WebTVHeading}
                                                        title={nc.WebTVHeading}
                                                        className="img100 ImgRatio"
                                                    />
                                                )}
                                                {nc.ShowVideo === 1 && (
                                                    <div className="card-video-icon big transition">
                                                        <i className="fa-solid fa-play"></i>
                                                    </div>
                                                )}
                                            </picture>
                                            <div className="card-video-icon big transition">
                                                <i className="fa-solid fa-play"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7  col-7 textBorder2">
                                        <div className="Desc">
                                            <h3 className="Title">{nc.WebTVHeading}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
