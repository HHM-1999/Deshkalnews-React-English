import axios from "axios";
import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import Slider from "react-slick";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

var lazyloaded = false

export default function Opinion() {
    const [Lists, setLists] = useState([])
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: Lists.length > 3, // Ensures the slider loops only if more than 3 items exist
        speed: 100,
        slidesToShow: Math.min(4, Lists.length), // Adjusts slides based on available data
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        centerPadding: "0px",
        className: "center",
        centerMode: Lists.length > 3,
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
    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory6.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setLists(data.slice(0, 12))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])


        return (
            <>
                <section className="opinion-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-heading">
                                    <h2><i className="fa-solid fa-chevron-right"></i><Link to='/opinion' onClick={scrollTop}>Opinion</Link></h2>
                                </div>
                            </div>
                        </div>
                        <Slider ref={slider => { sliderRef = slider; }} {...settings} className="commonSlider">
                            {Lists.map((list, i) => {
                                return (
                                    <div className="items" key={i}>
                                        <div className="opinion-list">
                                            <Link to={"/" + list.Slug + "/" + list.ContentID} onClick={scrollTop} >
                                                <div className="row">
                                                    <div className="col-lg-5 col-5 Imgresize">
                                                        <picture>
                                                            {list.ImageBgPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" /> :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.ImageBgPath} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100"  />}

                                                            {list.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </picture>
                                                    </div>
                                                    <div className="col-lg-7 col-7">
                                                        {list.AltHomeTitle ?
                                                            <p>{list.AltHomeTitle}</p> :
                                                            <p>{list.DetailsHeading}</p>
                                                        }
                                                        <span className="writer">{list.WriterName}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </section>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react-slick/0.30.2/react-slick.min.js" integrity="sha512-9cn+e5E0uqJxF/RA4PERrZ9654f/pPwSWJWe1fPavysxUdVe0xYTj09jzlKW5pd9vrgaNtqDpW9CwkvKXdUBSw==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/react-slick/0.30.2/react-slick.js" integrity="sha512-aP0zyfgfU02K5gDdprwgUcfmGQJ7zoVQPdIl1irO8iXCUJ80yWeTg/WTRwTJuV0pny/jWLZqBZwhz8pkb6NxlA==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>

            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
