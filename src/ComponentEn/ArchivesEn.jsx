import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, formatTimestamp, scrollTop } from '../ComponentEn/AllFunctions'
import ArchiveLdJson from './ArchieveLdJson'
// import HeaderEn from './HeaderEn'
// import { useLocation } from 'react-router-dom';
// import RLoader from './RLoader'
// import RLoader from './RLoader'

var lazyloaded = false
var offset = 0
var limit = 12
var showMore = true

var start_date = ""
var end_date = ""
var category_id = ""

var formData = []
export default function ArchivesEn() {
    // const { state } = useLocation();
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [news, setNews] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    // const [isLoading, setisLoading] = useState(true)
    // const [isLoading, setisLoading] = useState(true)
    // console.log(state);
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // // setisLoading(true)
        // // setTimeout(() => { setisLoading(false) }, 300);
        // // setisLoading(true)
        // // setTimeout(() => { setisLoading(false) }, 300);
        // // window.scrollTo(0, 0)
        // // state = { 'start_date': "", 'end_date': "", 'category_name': "0", 'limit': limit, 'offset': offset }
        // if (state) {
        //     axios
        //         .post(`${process.env.REACT_APP_EN_API_URL}archive`, state)
        //         .then(({ data }) => {
        //             // setisLoading(false)
        //             // setisLoading(false)
        //             setNews(data.data);
        //             if (data.data.length < limit) {
        //                 showMore = false
        //             }
        //             setTimeout(function () {
        //                 lazyloaded = false
        //                 ForLazyLoaderImg(lazyloaded)
        //             }, 1000);
        //         });
        // } else {
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
        // }
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}category`)
            .then(({ data }) => {
                setAllCategoryList(data.categories);
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, []);

    // const resultSubmit = (e) => {
    //     e.preventDefault()
    //     showMore = true
    //     start_date = e.target.start_date.value;
    //     end_date = e.target.end_date.value;
    //     category_id = e.target.category_id.value;
    //     offset = 0
    //     formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
    //     axios
    //         .post(`${process.env.REACT_APP_EN_API_URL}archive`, formData)
    //         .then(({ data }) => {
    //             setNews(data.data);
    //             if (data.data.length < limit) {
    //                 showMore = false
    //             }
    //             setTimeout(function () {
    //                 lazyloaded = false
    //                 ForLazyLoaderImg(lazyloaded)
    //             }, 1000);
    //         });
    // }
    const resultSubmit = (e) => {
        e.preventDefault();
        showMore = true;

        start_date = e.target.start_date.value;
        end_date = e.target.end_date.value;
        category_id = e.target.category_id.value;

        offset = 0;

        // If category is not selected, send request without filtering category
        formData = {
            'start_date': start_date,
            'end_date': end_date,
            'limit': limit,
            'offset': offset
        };

        if (category_id && category_id !== "0") {
            formData['category_id'] = category_id; // Only add category_id if it's selected
        }

        axios.post(`${process.env.REACT_APP_EN_API_URL}archive`, formData)
            .then(({ data }) => {
                if (Array.isArray(data.data) && data.data.length > 0) {
                    setNews(data.data);
                    if (data.data.length < limit) {
                        showMore = false;
                    }
                    setTimeout(() => {
                        lazyloaded = false;
                        ForLazyLoaderImg(lazyloaded);
                    }, 1000);
                } else {
                    setNews([]); // Fix: Set empty array instead of "null"
                }
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
                setNews([]); // Handle errors gracefully
            });
    };

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
    const handleChange = (e) => {
        setSelectedStartDate(e.target.value);
    };
    return (
        <main>
            {/* <div className="adsArea AdsHide text-center">
                <img src={"/media/Advertisement/Advertisement(970X90).png"} alt="" className="img-fluid" />
            </div>
            <div className='adsArea text-center'>
                <img src="/media/Advertisement/advertisement-320x100.png" alt="" title="" className="mbAds"></img>
            </div>
           <HeaderEn /> */}
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title="Archive | All important old news and records" />
                <ArchiveLdJson />
                <div className="DTitleEng"><Link to="/archives"><div className="DTitleInner"><h1 className="DTitleInnerBar">Archieves</h1></div></Link></div>
                <div className="row">
                    <div className="col-sm-12 my-4">
                        <form className="form-inline" onSubmit={resultSubmit}>
                            <div className="form-group clearfix">
                                <div className="row">
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="start_date">  Start Date :</label>
                                        <input type="date" className="form-control hasDatepicker" id="datepicker" name="start_date" onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="end_date">  End Date :</label>
                                        <input type="date" id="datepickerto" name="end_date" min={selectedStartDate} className="form-control hasDatepicker" />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="category_id">All Category :</label>
                                        {/* <select defaultValue={'0'} name="category_id" className="form-control cboCatName">
                                            <option value="0" disabled>All News</option>
                                            {allCategoryList.map((nc) => {
                                                return (
                                                    <option key={nc.CategoryID} value={nc.CategoryID}>{nc.CategoryName}</option>
                                                );
                                            })}
                                        </select> */}

                                        <select name="category_id" className="form-control cboCatName">
                                            <option value="0">All News </option> {/* Ensure '0' is the default for all categories */}
                                            {allCategoryList.map((nc) => (
                                                <option key={nc.CategoryID} value={nc.CategoryID}>
                                                    {nc.CategoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="btnDiv" className="text-center my-4">
                                <button type="submit" name="btnSubmit" className="btn btn-lg btn-block ButtonBG">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="DAdd1 mb-4 d-flex  justify-content-center">
                            <Link to="#"><img src={"/media/Advertisement/Advertisement(970X90).png"} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></Link>
                        </div>
                    </div>
                </div>
                <div className="row archiveSection">
                    {Array.isArray(news) && news.length > 0 ? (
                        news.map((nc) => (

                            <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                <div className="archiveListNews" >
                                    <Link rel="preload" as="image" to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-sm-4 col-5 card-video-part">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
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

                        ))
                    ) : (
                        <h1 className="warningHeader">
                            <span>Sorry </span> No News Found
                        </h1>
                    )}
                </div>
                {showMore &&
                    <div id="btnDiv" className="text-center mt-3 mb-4">
                        <button onClick={toggleButtonState} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">More News...</button>
                    </div>}
            </div>
        </main>
    )
}
