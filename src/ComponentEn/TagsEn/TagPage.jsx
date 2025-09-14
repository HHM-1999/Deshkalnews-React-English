import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";
import DocumentTitle from 'react-document-title';
import { scrollTop, ForLazyLoaderImg } from '../../ComponentEn/AllFunctions'
import ErrorPage from '../../ComponentEn/ErrorPageEn';


var lazyloaded = false
var showMore = true
var limit = 4
var offset = 0
var formData = []
export default function TagPage() {
    const [pageURL, setPageURL] = useState(0);
    const [tags, setTags] = useState([]);
    const [tagsRelatedNews, setTagsRelatedNews] = useState([]);
    let { TagTitle } = useParams();

    useEffect(() => {
        offset = 0
        setPageURL(window.location.href);
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}tagsname/${(TagTitle)}`)
            .then(({ data }) => {
                if (data.tags.length !== 0) {
                    setTags(data.tags)
                } else {
                    setTags(null)
                }
            })
          
            formData = { 'slug': TagTitle, 'limit': limit, 'offset': 0 }
            axios
                .post(`${process.env.REACT_APP_EN_API_URL}tag-content`, formData)
                .then(({ data }) => {
                    if (data.tag_contents) {
                        setTagsRelatedNews(data.tag_contents);
                        showMore = true
                        if (data.tag_contents.length < limit) {
                            showMore = false
                        }
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
    
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [TagTitle])

    const toggleButtonState = (e) => {

        e.preventDefault();
        offset += limit
        showMore = true
        formData = { 'slug': TagTitle, 'limit': limit, 'offset': 0 }
        axios
            .post(`${process.env.REACT_APP_EN_API_URL}tag-content`, formData)
            .then(({ data }) => {
                if (data.tag_contents.length < limit) {
                    // console.log(data.data);

                    showMore = false
                }
                if (data.tag_contents.length == null) {
                    document.getElementById("btnDiv").style.display = "none"
                }
                for (let i = 0; i < data.tag_contents.length; i++) {
                    setTagsRelatedNews(oldArray => [...oldArray, data.tag_contents[i]]);
                }
            }

            );

    };

    return (
        <>
            {tags ?
                <main>
                    <div className="container">
                        <div className="TopHomeSection"></div>
                        <div className="DTagLead">
                            <DocumentTitle title={TagTitle} />
                            <div className="row">
                                <div className="col-sm-12">
                                    {tags.map((nc) => {
                                        return (
                                            <div className="DTagName" key={nc.TagID}>
                                                <i className="fa-solid fa-tags"></i>
                                                <h1>{nc.TagName}</h1>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="row">
                                {tags.map((nc) => {
                                    return (
                                        <React.Fragment key={nc.TagID}>
                                            {nc.ImageThumbPath ? (
                                                <>
                                                    <div className="col-lg-2 col-sm-4 col-5">
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Tag + nc.ImagePath} alt={nc.TagTitle} title={nc.TagTitle} style={{width: "100%", height:"auto"}} className="img-fluid img100" />
                                                    </div>
                                                    <div className="col-lg-10 col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h2 className="Title">{nc.TagTitle}</h2>
                                                            <p dangerouslySetInnerHTML={{ __html: nc.TagDesc }}></p>
                                                            <div className="Brief">
                                                                <p>{nc.TagDesc}</p>
                                                            </div>
                                                            <div className="DSocialTop">
                                                                {/* social media button end */}
                                                                <FacebookShareButton url={pageURL} title={nc.TagTitle}>
                                                                    <FacebookIcon size={30} round={true} />
                                                                </FacebookShareButton>
                                                                <LinkedinShareButton url={pageURL}>
                                                                    <LinkedinIcon size={30} round={true} />
                                                                </LinkedinShareButton>
                                                                <TwitterShareButton url={pageURL}>
                                                                    <TwitterIcon size={30} round={true} />
                                                                </TwitterShareButton>
                                                                <EmailShareButton url={pageURL} body="mailto:support@example.com">
                                                                    <EmailIcon size={30} round={true} />
                                                                </EmailShareButton>
                                                                <WhatsappShareButton url={pageURL}>
                                                                    <WhatsappIcon size={30} round={true} />
                                                                </WhatsappShareButton>
                                                                {/* social media button end */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>) : (
                                                <div className="col-12">
                                                    <div className="Desc">
                                                        <h2 className="Title">{nc.TagTitle}</h2>
                                                        <div className="DSocialTop">
                                                            {/* social media button end */}
                                                            <FacebookShareButton url={pageURL} title={nc.TagTitle}>
                                                                <FacebookIcon size={30} round={true} />
                                                            </FacebookShareButton>
                                                            <LinkedinShareButton url={pageURL}>
                                                                <LinkedinIcon size={30} round={true} />
                                                            </LinkedinShareButton>
                                                            <TwitterShareButton url={pageURL}>
                                                                <TwitterIcon size={30} round={true} />
                                                            </TwitterShareButton>
                                                            <EmailShareButton url={pageURL} body="mailto:support@example.com">
                                                                <EmailIcon size={30} round={true} />
                                                            </EmailShareButton>
                                                            <WhatsappShareButton url={pageURL}>
                                                                <WhatsappIcon size={30} round={true} />
                                                            </WhatsappShareButton>
                                                            {/* social media button end */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="row">
                            {tagsRelatedNews.map((nc) => {
                                return (
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="archiveListNews" >
                                            <Link rel="preload" as="image" to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-sm-4 col-5 card-video-part">
                                                        <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h3 className="Title BGTitle">{nc.DetailsHeading}</h3>
                                                            <div className="Brief">
                                                                <p dangerouslySetInnerHTML={{ __html: nc.ContentBrief }}></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                            {showMore &&
                                <div id="btnDiv" className="text-center my-4">
                                    <button type="submit" name="btnSubmit" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>
                                   More...
                                    </button>
                                </div>}
                        </div>
                    </div>
                </main>
                : <ErrorPage />}
        </>
    )
}
