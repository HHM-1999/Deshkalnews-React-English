import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
// import { FaPlay } from "react-icons/fa";

var lazyloaded = false;

export default function VideoHomeMobile() {
    const [Lists, setLists] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateVideo_gallery.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setLists(data.slice(0, 12));
                    setTimeout(() => {
                        lazyloaded = false;
                        ForLazyLoaderImg(lazyloaded);
                    }, 1000);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const settings = {
        dots: false,
        infinite: Lists.length > 3, // Ensures the slider loops only if more than 3 items exist
        speed: 100,
        // slidesToShow: Math.min(4, Lists.length), // Adjusts slides based on available data
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        centerPadding: "0px",
        className: "center",
        // centerMode: Lists.length > 3,
        pauseOnFocus: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, Lists.length),
                    slidesToScroll: 1,
                    infinite: Lists.length > 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(2, Lists.length),
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="video-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/videos' onClick={scrollTop}>Video Gallery</Link></h2>
                        </div>
                    </div>
                </div>

                <Slider ref={slider => { sliderRef = slider; }} {...settings} className="commonSlider">
                    {Lists.map((list, index) => (
                        <div key={index} className="items">

                            <div className="video-middel">
                                <div className="row gx-3">
                                    <div className="col-12">
                                        <div className="video-middel-items">
                                            <Link to={"/videos/" + list.WebTVID} onClick={scrollTop}>
                                                <div className="video-img-wrap Imgresize">
                                                    <picture>
                                                        {list.WebTVLinkCode === null ? (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={process.env.REACT_APP_LAZYL_IMG}
                                                                alt={list.WebTVHeadingEn}
                                                                title={list.WebTVHeadingEn}
                                                                fetchpriority="high"
                                                                className="img100 "
                                                            />
                                                        ) : (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={'https://img.youtube.com/vi/' + list.WebTVLinkCode + '/0.jpg'}
                                                                alt={list.WebTVHeadingEn}
                                                                title={list.WebTVHeadingEn}
                                                                className="img100"
                                                                fetchpriority="high"
                                                                style={{width:"100%",height:"auto"}}
                                                            />
                                                        )}
                                                        {list.ShowVideo === 1 && (
                                                            <div className="card-video-icon big transition">
                                                                <FaPlay />
                                                            </div>
                                                        )}
                                                    </picture>
                                                    <div className="video-icon"><i className="fas fa-play"></i></div>
                                                </div>
                                                <div className="Desc">
                                                    <h3 className="Title">
                                                        {list.WebTVHeadingEn}
                                                    </h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
