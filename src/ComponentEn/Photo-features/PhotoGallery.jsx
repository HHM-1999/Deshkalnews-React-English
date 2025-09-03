import axios from 'axios';
import { useEffect, useState } from "react";
import DocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import PhotoGalleryLdJson from './PhotoGalleryLdJson';
// import { FaCircleArrowRight } from 'react-icons/fa'
// import WebcategorySlug from "./WebcategorySlug";
// import RLoader from "../RLoader";
// import RLoader from "../RLoader";
var lazyloaded = false
var limit = 4
var offset = 5
var formData = []
var showMore = true



export default function PhotoGallery() {
    const { catslug } = useParams()
    const [VideoNews1, setVideoNews1] = useState([])
    const [VideoNews2, setVideoNews2] = useState([])
    const [VideoNews3, setVideoNews3] = useState([])
    const [CatMore, setcatMore] = useState([])
    useEffect(() => {

        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);

        axios
            .get(`${process.env.REACT_APP_API_URL}album-list/5`)
            .then(({ data }) => {
                if (data.albums.length > 0) {


                    setVideoNews1(data.albums[0])
                    setVideoNews2(data.albums[1])
                    setVideoNews3(data.albums.slice(2, 5))

                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            })

        formData = { 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}album-content-more-en`, formData)
            .then(({ data }) => {
                if (data.albums) {
                    setcatMore(data.albums);

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
        formData = { 'limit': limit, 'offset': offset }

        axios
            .post(`${process.env.REACT_APP_API_URL}album-content-more-en`, formData)
            .then(({ data }) => {
                if (data.albums.length < limit) {
                    // console.log(data.data);

                    showMore = true
                    if (data.albums.length < limit) {
                        showMore = false
                    }
                }
                if (data.albums.length == null) {
                    document.getElementById("btnDiv").style.display = "none"
                }
                for (let i = 0; i < data.albums.length; i++) {
                    setcatMore(oldArray => [...oldArray, data.albums[i]]);
                }
            }

            );

    };
    return (
        <>

            <main>
                <div className="container">
                    <h1 className="DTitle">
                        <Link to={+ '/'} onClick={scrollTop}>
                            <span className="DTitleInner"><span className="DTitleInnerBar"><span>Photo Gallery</span></span></span>
                        </Link>
                        <DocumentTitle title='News in Pictures | Photojournalism and Photo Reporting' />
                        <PhotoGalleryLdJson />
                    </h1>
                    <div className="row">
                        <div className="col-lg-9 mt-3 ">
                            <div className="DcatTopArea">
                                <div className="row">
                                    <div className="col-lg-8 col-12 d-flex">
                                        <div className="DCatLeadTop">
                                            <div className="LiveVideoItem">
                                                {VideoNews1 && VideoNews1 ?
                                                    <Link rel="preload" as="image" to={"/photo/" + VideoNews1.AlbumID} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-8 col-12">
                                                                <div className="">
                                                                    {VideoNews1.thumbnail == null ?
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} alt={VideoNews1.TitleEn} title={VideoNews1.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100"  />

                                                                        </picture> :
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_IMG_Path + VideoNews1.thumbnail} alt={VideoNews1.TitleEn} title={VideoNews1.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                        </picture>}
                                                                    {VideoNews1.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-12">
                                                                <div className="Desc">
                                                                    <h3 className="Title BGTitle">{VideoNews1.TitleEn}</h3>
                                                                    <div className="Brief">
                                                                        <p>{VideoNews1.BriefEn}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link> : false}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-12 d-flex">
                                        <div className="DCatTop2">
                                            {VideoNews2 && VideoNews2 ?
                                                <Link rel="preload" as="image" to={"/photo/" + VideoNews2.AlbumID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="">
                                                                {VideoNews2.thumbnail == null ?
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} alt={VideoNews2.TitleEn} title={VideoNews2.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                    </picture> :
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_IMG_Path + VideoNews2.thumbnail} alt={VideoNews2.TitleEn} title={VideoNews2.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                    </picture>}

                                                                {VideoNews2.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{VideoNews2.TitleEn}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link> : false}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="DCatTop3">
                                <div className="row">
                                    {VideoNews3.map((nc) => {
                                        return (
                                            <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.AlbumID}>
                                                <div className="DCatTop3tList" >
                                                    <Link to={"/photo/" + nc.AlbumID}>
                                                        <div className="row">
                                                            <div className="col-lg-12 col-sm-4 col-5">
                                                                <div className="">
                                                                    {nc.thumbnail == null ?
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                        </picture> :
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_IMG_Path + nc.thumbnail} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                        </picture>}

                                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-8 col-7">
                                                                <div className="Desc">
                                                                    <h3 className="Title">{nc.TitleEn}</h3>
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
                    <section>
                        <div className="row">
                            <div className="col-lg-8 col-sm-12 mt-4 BorderRight">
                                <h2 className="LatestNewsH ">All News Of Photo Gallery</h2>
                                <div className="DCatTop4">
                                    <div className="row">
                                        {CatMore ? CatMore.map((nc, i) => {
                                            return (<>
                                                {/* <h2>{nc.WebTVHeading}</h2> */}
                                                <div className="col-lg-6 col-12 d-flex mt-3" key={i}>
                                                    <div className="DCatTop3tList" >
                                                        <Link to={"/photo/" + nc.AlbumID}>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-sm-4 col-5">
                                                                    <div className="">
                                                                        {nc.thumbnail == null ?
                                                                            <picture>
                                                                                <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                            </picture> :
                                                                            <picture>
                                                                                <img src={process.env.REACT_APP_IMG_Path + nc.thumbnail} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                                                            </picture>}

                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-sm-8 col-7">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.TitleEn}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </>)
                                        }) : " "}
                                    </div>
                                </div>
                                {showMore ?
                                    <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>Read More </button></div>
                                    : false}
                            </div>
                        </div>
                    </section>
                </div>

            </main>
        </>
    )
}
