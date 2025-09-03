import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false


export default function PhotoLatestSide({ CategoryName, catslug }) {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}category-album-latest/${catslug}/5`)
            .then(({ data }) => {
                setVideos(data.albums);
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }, [catslug]);

    return (
        <>
            <div className="DSecTitle2">
                <h2> {CategoryName} সর্বশেষ  খবর</h2>
            </div>
            <div className="DLeftSideNews">
                {videos && videos.map((nc) => {
                    return (
                        <div className="DTop3List" key={nc.WebTVID}>
                            <Link to={"/videos/" + CategoryName + "/" + nc.WebTVID} onScroll={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-5  col-5">
                                        <div className="DCatTop3tList" >
                                            <Link to={"/photo-gallery/" + catslug + "/" + nc.AlbumID}>
                                                <div className="">
                                                    {nc.thumbnail == null ?
                                                        <picture>
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.Title} title={nc.Title} className="img-fluid img100" />

                                                        </picture> :
                                                        <picture>
                                                            <img src={process.env.REACT_APP_IMG_Path + nc.thumbnail} alt={nc.Title} title={nc.Title} className="img-fluid img100" />

                                                        </picture>}

                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                                </div>
                                                {/* <div className="Desc">
                                                    <h3 className="Title">{nc.Title}</h3>

                                                </div> */}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-7  col-7 textBorder2">
                                        <div className="Desc">
                                            <h3 className="Title">{nc.Title}</h3>
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
