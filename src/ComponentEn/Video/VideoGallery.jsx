import axios from 'axios';
import { useEffect, useState } from "react";
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import VideoLdJson from './VideoLdJson';
// import Ads from '../../assets/media/Advertisement/Advertisement (300X250).png'
// import RLoader from "../RLoader";
// import RLoader from "../RLoader";
var lazyloaded = false
var limit = 8
var offset = 0
var formData = []
var showMore = true
export default function VideoGallery() {
    const [leadVideoTop, setLeadVideoTop] = useState([]);
    const [leadVideos, setLeadVideos] = useState([]);
    // const [state3, setState3] = useState([])
    const [showBtnForMoreNews, setShowBtnForMoreNews] = useState(true);
    const [news, setNews] = useState([]);
    // const [isLoading, setisLoading] = useState(true)
    useEffect(() => {

        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);

        axios
            .get(`${process.env.REACT_APP_API_URL}videos/8`)
            .then(({ data }) => {
                if (data.webVideos.length > 0) {
                    // setisLoading(false)
                    // setisLoading(false)
                    setLeadVideoTop(data.webVideos[0])
                    setLeadVideos(data.webVideos.slice(1, 4))
                    // setState3(data.webVideos.slice(4, 12))
                    if (data.webVideos.length < limit) {
                        setShowBtnForMoreNews(false)
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            })
        offset = 0
        formData = { 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}all-video`, formData)
            .then(({ data }) => {
                if (data.webVideos.length < limit) {
                    showMore = false
                }
                setNews(data.webVideos);
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }, [])

    const toggleButtonState = (e) => {
        e.preventDefault()
        offset += limit
        formData = { 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}all-video`, formData)
            .then(({ data }) => {
                if (data.webVideos.length < limit) {
                    showMore = false
                }
                for (let i = 0; i < data.webVideos.length; i++) {
                    setNews(oldArray => [...oldArray, data.webVideos[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }

    return (
        <>
            <main>
                <div className="container">
                    <div className="DTitle">
                        <Link to={+ '/'} onClick={scrollTop}>
                            <div className="DTitleInner"><h1 className="DTitleInnerBar">Video Gallery</h1></div>
                        </Link>
                        <DocumentTitle title='Deshkalnews.com :: Video Gallery' />
                        <VideoLdJson />
                    </div>

                    <div className="DVideoTopArea">
                        <div className="DvideoTop">
                            <div className="row">
                                <div className="col-lg-8 col-12 border-right-inner border-bottom-inner" >
                                    <div className="DVideoTopInner">
                                        <Link rel="preload" as="image" to={"/videos/" + leadVideoTop.WebTVID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-8 col-12">
                                                    <div className="DImgZoomBlock">
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + leadVideoTop.WebTVLinkCode + '/maxresdefault.jpg'} alt={leadVideoTop.WebTVHeadingEn} title={leadVideoTop.WebTVHeadingEn} fetchpriority="high" style={{width: "100%", height:"auto"}} /></picture>
                                                        <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="Desc">
                                                        <div className="NewsTitle">
                                                            <h3 className="Title">{leadVideoTop.WebTVHeadingEn}</h3>
                                                        </div>
                                                        <div className="Brief">
                                                            <p dangerouslySetInnerHTML={{ __html: leadVideoTop.Remarks }}></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="DVideoTop2Inner ">
                                        <div className="row">
                                            {leadVideos.map((nc) => {
                                                return (
                                                    <div className="col-lg-4 col-12 border-right-inner " key={nc.WebTVID}>
                                                        <div className="DVideoTop2InnerList align-self-stretch">
                                                            <Link to={"/videos/" + nc.WebTVID} onClick={scrollTop}>
                                                                <div className="row">
                                                                    <div className="col-lg-12 col-sm-4 col-5">
                                                                        <div className="DImgZoomBlock">
                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/maxresdefault.jpg'} alt={nc.WebTVHeadingEn} title={nc.WebTVHeadingEn} fetchpriority="high"  style={{width: "100%", height:"auto"}}/></picture>
                                                                            <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-sm-8 col-7 textBorder2">
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
                                {/* <div className="col-lg-4 col-12 " >
                            
                                <div className=" d-flex   justify-content-center">
                                    <Link to="#">
                                        <img src={Ads} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                    </Link>
                                </div>
                            </div> */}
                            </div>
                        </div>

                        <div className="DVideoTop2Inner mt-5">
                            <div className="row">
                                {news.slice(4).map((nc) => {
                                    return (
                                        <div className="col-lg-3 col-12 border-right-inner  " key={nc.WebTVID}>
                                            <div className="DVideoTop2InnerList align-self-stretch">
                                                <Link to={"/videos/" + nc.WebTVID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5 videoIcon">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={"https://img.youtube.com/vi/" + nc.WebTVLinkCode + "/0.jpg"} alt={nc.WebTVHeadingEn} title={nc.WebTVHeadingEn}  fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"auto"}} /></picture>
                                                                <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7 textBorder2">
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
                    {showBtnForMoreNews ?
                        <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>WATCH ALL VIDEOS</button></div>
                        : false}



                    {/* <VideoCat1 state={videoCat} /> */}
                </div>

            </main>
        </>
    )
}
