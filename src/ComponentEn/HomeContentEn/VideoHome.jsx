
import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  FaPlay } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { scrollTop } from "../AllFunctions";

export default function VideoHome() {
    const [videos, setVideos] = useState([]);
    const [videos2, setVideos2] = useState([]);
    const [error, setError] = useState(null);  // Track error state


    useEffect(() => {
        // Fetch data only when the component mounts
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}home-json-bn/generateVideo_gallery.json`
                );
                // console.log(data);
                if (!data) {
                    setVideos([]); // Set to an empty array if no data
                } else {
                    setVideos(data[0]);
                    setVideos2(data.slice(1, 5)) // Update the state with the first 8 items
                }
            } catch (error) {
                console.log("Error fetching data:", error);
                setError("Failed to load videos. Please try again later.");
            }
        };

        fetchData();
    }, []);  // Empty dependency array means this effect runs once when the component mounts

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            <section className="video-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><i className="fa-solid fa-chevron-right"></i><Link to='/videos'>Video Gallery</Link></h2>
                            </div>
                        </div>
                    </div>
                    {videos ? 
                    <div className="row">
                   
                        <div className="col-lg-6 ">
                            <div className="video-big">
                                <Link to={"/videos/" + videos.WebTVID} onClick={scrollTop}>
                                    <div className="video-img-wrap Imgresize">
                                        <picture>
                                            {videos.WebTVLinkCode === null ? (
                                                <img
                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                    data-src={process.env.REACT_APP_LAZYL_IMG}
                                                    alt={videos.WebTVHeadingEn}
                                                    title={videos.WebTVHeadingEn}
                                                    fetchpriority="high"
                                                    className="img100"
                                                />
                                            ) : (
                                                <img
                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                    data-src={'https://img.youtube.com/vi/' + videos.WebTVLinkCode + '/0.jpg'}
                                                    alt={videos.WebTVHeadingEn}
                                                    title={videos.WebTVHeadingEn}
                                                    fetchpriority="high"
                                                    className="img100 Imgresize"
                                                    style={{width:"100%",height:"auto"}}
                                                />
                                            )}
                                        </picture>
                                        <div className="video-icon"><i className="fas fa-play"></i></div>
                                    </div>
                                    <div className="Desc">
                                        <h3 className="Title">{videos.WebTVHeadingEn ? videos.WebTVHeadingEn : ""}</h3>

                                    </div>

                                </Link>
                            </div>
                        </div>
                  
                        <div className="col-lg-6">
                            <div className="video-middel">
                                <div className="row">
                                    {videos2.map((nc ,i) => {
                                        return (
                                            <div className="col-sm-6 d-flex" key={i}>
                                                <div className="video-middel-items">
                                                    <Link to={"/videos/" + nc.WebTVID} onClick={scrollTop}>
                                                        <div className="video-img-wrap Imgresize">
                                                            <picture>
                                                                {nc.WebTVLinkCode === null ? (
                                                                    <img
                                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                                        data-src={process.env.REACT_APP_LAZYL_IMG}
                                                                        alt={nc.WebTVHeadingEn}
                                                                        title={nc.WebTVHeadingEn}
                                                                        fetchpriority="high"
                                                                        className="img100 "
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                                        data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                                        alt={nc.WebTVHeadingEn}
                                                                        title={nc.WebTVHeadingEn}
                                                                        fetchpriority="high"
                                                                        className="img100"
                                                                        style={{width:"100%",height:"auto"}}
                                                                    />
                                                                )}
                                                                {nc.ShowVideo === 1 && (
                                                                    <div className="card-video-icon big transition">
                                                                        <FaPlay />
                                                                    </div>
                                                                )}
                                                            </picture>
                                                            <div className="video-icon"><i className="fas fa-play"></i></div>
                                                        </div>
                                                        <div className="Desc">
                                                            <h3 className="Title">
                                                                {nc.WebTVHeadingEn}
                                                            </h3>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                </div>
            </section>
        </>
    );
}
