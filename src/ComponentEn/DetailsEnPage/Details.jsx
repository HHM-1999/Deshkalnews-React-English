import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { banglaDateConvetar, ForLazyLoaderImg, formatTimestamp, scrollTop } from '../AllFunctions'

// import DCatLatest from './DCatLatest'
// import DCatPopular from './DCatPopular'
// import DWriters from './DWriters'
import DFrom from './DFrom'
import DSocialShare from './DSocialShare'
// import DfbComment from './DfbComment'
import DocumentTitle from 'react-document-title'
import { FaPrint, FaTag } from 'react-icons/fa'
import Adsss from '../../assets/media/Advertisement/Advertisement(728X90).png'
// import Ads from '../../assets/media/Advertisement/300 x250 - Details.jpg';
import DemoAds from '../../assets/media/Advertisement/demo(728x90).png'
import favicon from '../../assets/media/common/favicon.png'
import ErrorPageEn from '../ErrorPageEn'
import DCatLatest from './DCatLatest'
import DCatPopular from './DCatPopular'
import DfbComment from './DfbComment'
import DWriters from './DWriters'
import Ldjson from './Ldjson'
// import RLoader from '../RLoader'
// import RLoader from '../RLoader'
var lazyloaded = false
var dateArray = []
var allTags
var contentInner
var catID
var DisplayCatName
// var Slug
// var nextNewsIDs = []
// var ajaxLoading = false;
// var maxNews = 0;
var contentLoaded = false
var dataCalled = false // for once call function

var R_ContentData = []
export default function Details() {
    let { catSlugEn, id } = useParams()
    const [catName, setCatName] = useState([])
    const [state, setState] = useState([])
    const [catLatest, setCatLatest] = useState([])
    const [catPopular, setCatPopular] = useState([])
    const [writer, setWriter] = useState([]);
    const [heading, setHeading] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [isLoading, setisLoading] = useState(true)
    // const [isLoading, setisLoading] = useState(true)

    const [fontSize, setFontSize] = useState(20);
    const PrintAble = () => { window.print(); };
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setLoading(true);
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        contentLoaded = false
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}category/${catSlugEn}`)
            .then(({ data }) => {
                if (data.category) {
                    // setisLoading(false)
                    // setisLoading(false)
                    // setSlug(data.category.Slug)
                    // setLoading(false);
                    catID = data.category.CategoryID
                    DisplayCatName = data.category.DisplayCatName
                    try {
                        axios
                            .get(`${process.env.REACT_APP_EN_API_URL}category-latest-content/${catID}/4`)
                            .then(({ data }) => {
                                setCatLatest(data.data);
                            });
                    }
                    catch {
                        console.log(console.error);
                    }
                    try {
                        axios
                            .get(`${process.env.REACT_APP_EN_API_URL}category-popular-content/${catID}/4`)
                            .then(({ data }) => {
                                setCatPopular(data.data.slice(0, 4));
                            });
                    }
                    catch {
                        console.log(console.error);
                    }
                    // axios
                    //     .get(`${process.env.REACT_APP_EN_API_URL}content-next-details/${catID}/${id}`)
                    //     .then(({ data }) => {
                    //         nextNewsIDs = []
                    //         maxNews = data.data.length + 1
                    //         for (let i = 0; i < data.data.length; i++) {
                    //             nextNewsIDs.push(data.data[i].ContentID)
                    //         }
                    //     });
                }
            });
        if (!dataCalled) {
            dataCalled = true
            try {
                axios
                    .get(`${process.env.REACT_APP_EN_API_URL}content-details/${id}`)
                    .then(({ data }) => {
                        dataCalled = false
                        if (data.data.length > 0) {
                            // response.data.faq should contain your array

                            if (id !== data.data[0].contentID) {
                                // console.log(data.data);

                                setState(data.data[0]);
                                document.title = data.data[0].ContentHeading;
                                setCatName(data.data[0].CategoryName);
                                setTimeout(function () {
                                    contentLoaded = true
                                    lazyloaded = false
                                    ForLazyLoaderImg(lazyloaded)
                                }, 1000);
                                setTimeout(function () {
                                    inner_Caption(data.data[0].ContentID)
                                    // ineerRelatedNews(data.data[0].ContentID)
                                }, 400);
                                if (data.data[0].created_at) {
                                    dateArray = [data.data[0].created_at]
                                } else {
                                    dateArray = [[]]
                                }
                                allTags = data.data[0].Tags
                                contentInner = data.data[0].ContentDetails
                                // if (allTags) {
                                //     tagArray = [allTags.split(',')]
                                // } else {
                                //     tagArray = [[]]
                                // }
                                // setWriter([data.data.content_contributors])
                                setWriter(data.data[0].content_contributors)
                                setHeading(data.data[0].DetailsHeading)
                                // console.log(setWriter);
                                if (data.data[0].RelNewsIDs) {
                                    // axios
                                    //     .get(`${process.env.REACT_APP_EN_API_URL}related-news/${id}`)
                                    //     .then(({ data }) => {
                                    R_ContentData['id' + id] = data.data[0].relatedNewslist;
                                    // });
                                }
                            }
                        } else setState(null);
                    });
            }
            catch {
                console.log(console.error);
            }
        }
        const handleScroll = () => {
            if (contentLoaded) {
                var counter = document.getElementsByClassName("newsDetail").length - 1;
                if (counter >= 0) {
                    // var elmnt = document.getElementsByClassName("newsDetail")[counter];
                    // if (window.pageYOffset + 200 > (elmnt.offsetHeight + elmnt.offsetTop) - window.innerHeight && !ajaxLoading && counter + 1 < maxNews && nextNewsIDs[counter]) {
                    //     ajaxLoading = true;
                    //     axios
                    //         .get(`${process.env.REACT_APP_EN_API_URL}content-details/${nextNewsIDs[counter]}`)
                    //         .then(({ data }) => {
                    //             if (data.data && data.data[0] && data.data[0].ContentID && !document.getElementById(data.data[0].ContentID)) {
                    //                 setState(oldArray => [...oldArray, data.data[0]]);
                    //                 ajaxLoading = false;
                    //                 setTimeout(function () {
                    //                     lazyloaded = false
                    //                     ForLazyLoaderImg(lazyloaded)
                    //                 }, 1000);
                    //                 setTimeout(function () {
                    //                     inner_Caption(data.data[0].ContentID)
                    //                     ineerRelatedNews(data.data[0].ContentID)
                    //                 }, 400);
                    //                 if (data.data[0].created_at) {
                    //                     dateArray.push(data.data[0].created_at)
                    //                 } else {
                    //                     dateArray.push([])
                    //                 }
                    //                 allTags = data.data[0].Tags
                    //                 // if (allTags) {
                    //                 //     tagArray.push(allTags.split(','))
                    //                 // } else {
                    //                 //     tagArray.push([])
                    //                 // }
                    //                 setWriter(oldArray => [...oldArray, data.data[0].content_contributors])
                    //                 axios
                    //                     .get(`${process.env.REACT_APP_EN_API_URL}related-news/${nextNewsIDs[counter]}`)
                    //                     .then(({ data }) => {
                    //                         R_ContentData['id' + nextNewsIDs[counter]] = data.relatedNewslist;
                    //                     });
                    //             }
                    //             else {
                    //                 ajaxLoading = false;
                    //             }
                    //         });
                    // }

                    var Wscroll = window.pageYOffset
                    var elements = document.getElementsByClassName('newsDetail');

                    for (var i = 0; i < elements.length; i++) {
                        if (Wscroll > elements[i].offsetTop && Wscroll < elements[i].offsetTop + elements[i].offsetHeight) {
                            let id = elements[i].getAttribute('id')
                            let title = elements[i].getAttribute('data-title')

                            if ((window.location.href).split('/').pop() !== id) {
                                document.title = title;
                                document.querySelector('meta[name="description"]').setAttribute("content", title);
                                if (!localStorage.getItem('contentView_' + id)) {
                                    localStorage.setItem('contentView_' + id, 1);
                                    axios
                                        .get(`${process.env.REACT_APP_EN_API_URL}hit-count/${id}`)
                                        .then(({ data }) => {
                                        })
                                }
                                window.history.replaceState(null, null, id);
                            }
                        }
                    }
                }
            }
        }


        window.addEventListener("scroll", handleScroll, { passive: true });
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        }
    }, [catSlugEn, id])
    if (!localStorage.getItem('contentView_' + id)) {
        localStorage.setItem('contentView_' + id, 1);
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}hit-count/${id}`)
            .then(({ data }) => {
            })
    }

    const inner_Caption = (id) => {
        let contentImages = document.querySelectorAll(`#contentDetails.contentDetails${id} p img`)
        for (let index = 0; index < contentImages.length; index++) {
            let caption = contentImages[index].getAttribute('alt');
            let pstyle = contentImages[index].getAttribute('style');
            contentImages[index].removeAttribute('style');
            let image = contentImages[index].outerHTML
            if (caption !== "") {
                let newDiv = `<div className="dCaption2" style="${pstyle}">${image}<p className="img-caption">${caption}</p></div>`
                contentImages[index].outerHTML = newDiv
            } else {
                let newDiv = `<div className="dCaption2" style="${pstyle}">${image}</div>`
                contentImages[index].outerHTML = newDiv
            }
        }

        let contentIframes = document.querySelectorAll(`#contentDetails.ContentDetails${id} p iframe`)
        for (let index = 0; index < contentIframes.length; index++) {
            let iframeElement = contentIframes[index]
            if (iframeElement.hasAttribute('sandbox')) {
                iframeElement.removeAttribute('sandbox')
            }
            let iframe = iframeElement.outerHTML;
            let newDiv = `<div className="embed-responsive embed-responsive-16by9">${iframe}</div>`
            contentIframes[index].outerHTML = newDiv
            // console.log(iframe);
        }
        let contentScript = document.querySelectorAll(`#contentDetails.contentDetails${id} p script`)
        for (let index = 0; index < contentScript.length; index++) {
            let script = contentScript[index]
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.async = true;
            newscript.src = script.src;
            script.parentNode.insertBefore(newscript, script)
            script.remove()
        }//reRun twitter & instragram-embed script from API
    }

    const ineerRelatedNews = (id) => {
        var contentDetails = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0]
        var contentDetailsChildDiv = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[1]
        var contentDetailsChildDiv2 = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[2]

        const relatedNewsDiv = document.createElement('div');
        relatedNewsDiv.className = 'DRelatedNewsSection d-print-none';
        const para = document.createElement("p");
        para.className = 'DRelatedNews Title';
        para.innerHTML = `<i className="fa-solid fa-list"></i> Read More:`
        relatedNewsDiv.appendChild(para);

        const relatedNewsMainDiv = document.createElement('div');
        relatedNewsMainDiv.className = 'row';

        let R_Arr = R_ContentData['id' + id]
        let R_HTML = ''
        for (let i = 0; i < R_Arr.length; i++) {
            if (contentDetailsChildDiv !== null) {
                R_HTML += `<div className="col-lg-3 col-12 d-flex ss">
                    <div className="DRelatedNewsList align-self-stretch">
                        <a href=${process.env.REACT_APP_FONT_DOMAIN_URL + "/" + R_Arr[i].Slug + R_Arr[i].ContentID}>
                            <div className="row">
                                <div className="col-lg-12 col-sm-4 col-5">
                                    <div className="DImgZoomBlocktest">
                                        <picture><img src=${process.env.REACT_APP_DOMAIN_URL + "media/imgAll/" + R_Arr[i].ImageSmPath} alt='${R_Arr[i].ContentHeading}' title='${R_Arr[i].ContentHeading}' /></picture>
                                        ${R_Arr[i].ShowVideo === 1 || R_Arr[i].VideoID ? '<div className="card-video-icon"><i className="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-8 col-7">
                                    <div className="Desc">
                                        <h3 className="Title">${R_Arr[i].DetailsHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`;
                if (R_Arr.length >= i + 1) {
                    relatedNewsDiv.appendChild(relatedNewsMainDiv);
                    relatedNewsMainDiv.innerHTML = R_HTML
                    contentDetails.insertBefore(relatedNewsDiv, contentDetailsChildDiv2);
                }
            }
        }
    }
    const toggleAccordion = (id) => {
        if (openIndex === id) {
            setOpenIndex(null); // close if same clicked
        } else {
            setOpenIndex(id);
        }
    };

    return (
        <>
            {/* {loading ?
                <div></div> : */}
            {catSlugEn ?
                <main>

                    <div className="container">
                        <DocumentTitle title={heading} />
                        <section>
                            <div className="row d-print-none">
                                <div className="col-lg-12 col-12 my-2">
                                    {catName && catName ? <div className="DSecTitle">
                                        <Link to={'/' + catSlugEn}>
                                            <h3><span className="ColorBox"></span>{catName}</h3>
                                        </Link>
                                    </div> : ""}

                                </div>

                            </div>
                        </section>

                        <section id="newsSection">
                            <div className="newsDetail" id={state.ContentID} data-title={state.DetailsHeading} key={state.ContentID}>

                               <Ldjson news={state} catName={catName} catSlugEn={catSlugEn} DisplayCatName={DisplayCatName} />
                                <div className="row mt-2">
                                    <div className="col-lg-8 col-12">
                                        <div className="ContentDetails">
                                            {state.ContentSubHeading && <h3 className='DHeadingSubHeading'>{state.ContentSubHeading}</h3>}
                                            <h1>{state.DetailsHeading}</h1>
                                            {state.ContentShoulder && <h4 className='DHeadingContentShoulder'>{state.ContentShoulder}</h4>}
                                        </div>
                                        <div className=" mb-2  mt-4 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                                            <div>
                                                <DWriters writer={writer} news={state} />
                                                <p className="pDate "><span>Published:</span> {formatTimestamp(state.created_at)}</p>
                                            </div>

                                            <div className='d-flex PRINTBTN mb-2'>
                                                <p className="DTopImgCaption" style={{ paddingRight: '10px', paddingTop: '10px' }}>{state.create_date && banglaDateConvetar(format(new Date(state.create_date), 'dd MMMM yyyy, H:mm'))}</p>
                                                <div className="DAdditionalInfo">
                                                    <button type="button" className="printMe" onClick={PrintAble}>
                                                        <FaPrint />
                                                    </button>

                                                    <button id="btnDecrease" onClick={() => setFontSize(fontSize - 1)}>
                                                        <span>A-</span>
                                                    </button>
                                                    <button id="btnOriginal" onClick={() => setFontSize(20)}>
                                                        <span>A</span>
                                                    </button>
                                                    <button id="btnIncrease" onClick={() => setFontSize(fontSize + 1)}>
                                                        <span>A+</span>
                                                    </button>
                                                </div>
                                                <DSocialShare title={state.AltSocialTitle ? state.AltSocialTitle : state.DetailsHeading} contentID={state.ContentID} />
                                            </div>

                                        </div>

                                        {state.VideoID !== null && state.VideoID !== '' && state.ShowVideo === 1 ?
                                            <>
                                                <div className={state.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                                    {state.VideoType === "youtube" ?
                                                        <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + state.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                        : state.VideoType === "vimeo" ?
                                                            <iframe src={"https://player.vimeo.com/video/" + state.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                            : state.VideoType === "facebook" ?
                                                                <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + state.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                                : state.VideoType === "instagram" ?
                                                                    <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + state.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                    : false}
                                                </div>
                                            </> :
                                            <>
                                                <div className="DTopImg">
                                                    <div className="Details">
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.ContentHeading} title={state.ContentHeading} className="img-fluid img100" style={{ width: "100%", height: "auto" }} /></picture>
                                                    </div>
                                                    {/* <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.ContentHeading} title={state.ContentHeading} className="img-fluid img100" /> */}
                                                    <div className="DetailsTopCap">
                                                        <p className="DTopImgCaption">{state.ImageBgPathCaption}</p>
                                                    </div>
                                                </div>

                                            </>
                                        }

                                        <div className={'ContentDetails page-break  ContentDetails' + state.ContentId} id={"contentDetails"} style={{ fontSize: `${fontSize}px` }}>
                                            {(state.ContentDetails)?.map((nc, idc) => {
                                                return (<>
                                                    <div dangerouslySetInnerHTML={{ __html: nc }} key={idc}></div>
                                                </>)
                                            })}
                                        </div>
                                        {state.Tags ?
                                            <div className="RelatedTags d-print-none">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <p className="Subject"> <FaTag /> Related Subject : </p>
                                                        {(state.Tags).split(',').map((nc, i) => {
                                                            // console.log(nc);
                                                            return (
                                                                <div className="TagList" key={i}>
                                                                    <Link to={"/tags/" + nc} onClick={scrollTop}><p>{nc}</p></Link>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div> : " "
                                        }
                                        {state.faq && state.faq.length > 0 ?
                                            <>
                                                <div className="faq-area-section">
                                                    <div className="RelatedTags d-print-none">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <p className="Subject"> <FaTag /> FAQ : </p>
                                                                <div className="faq-area">
                                                                    <div className="accordion" id="accordionExample">
                                                                        {state.faq.map((item) => {
                                                                            return (

                                                                                <div className="accordion-item" key={item.id}>
                                                                                    <h2 className="accordion-header">
                                                                                        <button
                                                                                            className={`accordion-button ${openIndex === item.id ? "" : "collapsed"
                                                                                                }`}
                                                                                            type="button"
                                                                                            onClick={() => toggleAccordion(item.id)}
                                                                                        >
                                                                                            {item.Question}
                                                                                        </button>
                                                                                    </h2>
                                                                                    <div
                                                                                        className={`accordion-collapse collapse ${openIndex === item.id ? "show" : ""
                                                                                            }`}
                                                                                    >
                                                                                        <div className="accordion-body">{item.Answer}</div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : ""
                                        }
                                        <DfbComment contentID={state.ContentID} />

                                        <div className="adsArea AdsHide mb-5">
                                            {Adsss ? <img src={Adsss} alt="DeshKalNews.com" title='DeshKalNews.com' className="img-fluid" /> :
                                                <img src={DemoAds} alt="DeshKalNews.com" title='DeshKalNews.com' className="img-fluid" />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12 d-none d-lg-block detailsPage">
                                        <DCatLatest catLatest={catLatest} catName={catName} />
                                        {/* <div className="Ads-area sticky-ads">
                                            <a href="https://www.shwapno.com/" target='_blank' rel="noreferrer">
                                                <div className="DRightSideAddFeature">
                                                    <img src={Ads} alt="Shwapno.com" title="Shwapno.com" fetchpriority="high" />
                                                </div>
                                            </a>
                                        </div> */}

                                    </div>
                                </div>
                                <div className="col-sm-12 d-print-none">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="astrodivider">
                                                <div className="astrodividermask"></div>
                                                <span><img src={favicon} alt="" className='img-fluid' /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section>
                            <div className="row mt-3 d-print-none">
                                <div className="col-lg-9 col-12">
                                    <div className="row d-block d-lg-none">
                                        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 my-4">
                                            <DFrom />
                                        </div>
                                    </div>
                                    <div className="DRelatedNews">
                                        <DCatPopular catPopular={catPopular} catName={catName} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12">
                                    <div className="mt-4 d-block d-lg-none">
                                        <DCatLatest catLatest={catLatest} catName={catName} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </main>
                : <ErrorPageEn />}
        </>
    )
}
