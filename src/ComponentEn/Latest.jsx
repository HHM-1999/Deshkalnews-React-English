import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link, useLocation } from 'react-router-dom'
import { ForLazyLoaderImg, formatTimestamp, scrollTop } from './AllFunctions'
import LatestLdJson from './LatestLdJson'

// import RLoader from './RLoader'
// import RLoader from './RLoader'

var lazyloaded = false
var offset = 10
var limit = 12
var showMore = true

var start_date = ""
var end_date = ""
var category_id = ""

var formData = []
export default function Latest() {
    const { state } = useLocation();
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // window.scrollTo(0, 0)
        // state = { 'start_date': "", 'end_date': "", 'category_name': "0", 'limit': limit, 'offset': offset }
        if (state) {
            axios
                .post(`${process.env.REACT_APP_EN_API_URL}archive`, state)
                .then(({ data }) => {
                    // setisLoading(false)
                    // setisLoading(false)
                    setNews(data.data);
                    if (data.data.length < limit) {
                        showMore = false
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                });
        } else {
            offset = 0
            formData = { 'start_date': "", 'end_date': "", 'category_id': "", 'limit': limit, 'offset': offset }
            axios
                .post(`${process.env.REACT_APP_EN_API_URL}archive`, formData)
                .then(({ data }) => {
                    if (data.data.length < limit) {
                        showMore = false
                    }
                    setNews(data.data);
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                });
        }
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}category`)
            .then(({ data }) => {
                setAllCategoryList(data.categories);
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [state]);

    const resultSubmit = (e) => {
        e.preventDefault()
        start_date = e.target.start_date.value;
        end_date = e.target.end_date.value;
        category_id = e.target.category_id.value;
        offset = 0
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_EN_API_URL}archive`, formData)
            .then(({ data }) => {
                setNews(data.data);
                if (data.data.length < limit) {
                    showMore = false
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }

    const toggleButtonState = (e) => {
        e.preventDefault()
        offset += limit
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_EN_API_URL}archive`, formData)
            .then(({ data }) => {
                if (data.data.length < limit) {
                    showMore = false
                }
                for (let i = 0; i < data.data.length; i++) {
                    setNews(oldArray => [...oldArray, data.data[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }

    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title="Latest news, Breaking news | DeshkalNews.com" />
                <LatestLdJson />
                <h1 className="DTitle"><Link to="/latest"><span className="DTitleInner"><span className="DTitleInnerBar"><span>All News</span></span></span></Link></h1>
                <div className="row archiveSection">
                    {news.map((nc) => {
                        return (
                            <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                <div className="archiveListNews" >
                                    <Link rel="preload" as="image" to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-sm-4 col-5 card-video-part">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-sm-8 col-7">
                                                <div className="Desc">
                                                    <h3 className="catTitle">{nc.CategoryName}</h3>
                                                    {nc.ContentSubHeading == null ?
                                                        <h3 className="Title BGTitle">{nc.DetailsHeading}</h3> :
                                                        <h3 className="Title BGTitle"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                    }
                                                    <div className="Brief">
                                                        <p>{nc.ContentBrief}</p>
                                                    </div>
                                                </div>
                                                <p className="pDate">{formatTimestamp(nc.created_at)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {showMore &&
                    <div id="btnDiv" className="text-center mt-3 mb-4">
                        <button onClick={toggleButtonState} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">More News...</button>
                    </div>}
            </div>
        </main>
    )
}
