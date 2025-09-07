import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'
import { ForLazyLoaderImg } from '../AllFunctions'
import ErrorPage from '../ErrorPage'
import VideoLatestSide from './VideoLatestSide'
import VideoPopularSide from './VideoPopularSide'
import Header from '../Header'
import FooterAd from '../../FooterAds'


var formData = []
var lazyloaded = false
var limit = 6
var offset = 0
var showMore = true
export default function VideoCat1() {
    const { catslug } = useParams()
    const [cat, setCat] = useState([])
    // const [catName, setCatName] = useState([])
    const [CatMore, setcatMore] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}webtv-category/${catslug}`)
            .then(({ data }) => {
                // console.log(data);

                setCat(data.category)
                // setCatName(data.category.CategoryName)
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);

            })
        formData = { 'categorySlug': catslug, 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}webtv-category-video-by-slug`, formData)
            .then(({ data }) => {
                if (data.webtvCategory_video) {
                    setcatMore(data.webtvCategory_video);

                    showMore = true
                    if (data.webtvCategory_video.length < limit) {
                        showMore = false
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [catslug])

    const toggleButtonState = (e) => {

        e.preventDefault();
        offset += limit
        // top_content_ids = []
        // top_content_ids = news.map(function (el) { return el.ContentID; });
        formData = { 'categorySlug': catslug, 'limit': limit, 'offset': offset }

        axios
            .post(`${process.env.REACT_APP_API_URL}webtv-category-video-by-slug`, formData)
            .then(({ data }) => {
                if (data.webtvCategory_video.length < limit) {
                    // console.log(data.data);

                    showMore = true
                    if (data.webtvCategory_video.length < limit) {
                        showMore = false
                    }
                }
                if (data.webtvCategory_video.length == null) {
                    document.getElementById("btnDiv").style.display = "none"
                }
                for (let i = 0; i < data.webtvCategory_video.length; i++) {
                    setcatMore(oldArray => [...oldArray, data.webtvCategory_video[i]]);
                }
            }

            );

    };
    return (
        <>
            <div className="adsArea AdsHide text-center">
                <img src={"/media/Advertisement/Advertisement(970X90).png"} alt="" className="img-fluid" />
            </div>
            <div className='adsArea text-center'>
                <img src="/media/Advertisement/advertisement-320x100.png" alt="" title="" className="mbAds"></img>
            </div>
            <Header />
            <FooterAd />
            {cat ?
                <main>

                    <div className="container">
                        <div className="CategoryPageTitleTop mt-5">
                            <h2 className="CategoryPageTitle"><Link to="/"><span className="CategoryPageTitle "><span className='ColorBox'></span>{cat.CategoryName}</span></Link>

                            </h2>
                        </div>

                        <div className='row'>
                            <div className='col-lg-8 col-12 d-flex'>
                                <div className="DCatTop4">
                                    <div className="row">
                                        {CatMore && CatMore.map((nc) => {
                                            return (
                                                <div className="col-lg-4 col-12 d-flex" key={nc.WebTVID}>
                                                    <div className="DCatTop3tList" >
                                                        <Link to={"/videos/" + catslug + "/" + nc.WebTVID}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-4 col-5">
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
                                                                <div className="col-lg-12 col-sm-8 col-7">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.WebTVHeading}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>

                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                    {showMore ?
                                        <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>আরও...</button></div>
                                        : false}
                                </div>
                            </div>
                            <div className='col-lg-4 col-12'>
                                <VideoLatestSide CategoryName={cat.CategoryName} catslug={catslug} />
                                <VideoPopularSide CategoryName={cat.CategoryName} catslug={catslug} />
                                {/* <DCatLatest WebCatLatestList={WebCatLatestList} CategoryName={CatName} />
                                <DVideoCatPopular WebCatPopularList={WebCatPopularList} CategoryName={CatName} /> */}
                            </div>
                        </div>
                    </div>
                </main>
                : <ErrorPage />}
        </>
    )
}
