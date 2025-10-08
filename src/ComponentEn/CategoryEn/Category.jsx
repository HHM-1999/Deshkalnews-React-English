import axios from 'axios';
import { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';

import { FaPlay } from 'react-icons/fa';
import ErrorPageEn from '../ErrorPageEn';
import CatLdJson from './CatLdJson';
import SubcatNames from './SubcatNames';

export default function Category() {
    const { catSlugEn } = useParams();
    const [catName, setcatName] = useState(undefined);
    const [catNewsMore, setcatLeadMore] = useState([]);
    const [catLeadNews1, setcatLeadNews1] = useState(undefined);
    const [catLeadNews2, setcatLeadNews2] = useState(undefined);
    const [catLeadNews3, setcatLeadNews3] = useState([]);
    const [news, setNews] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showMore, setShowMore] = useState(true);

    const limit = 8;
    const LeadNewsLimit = 5;

    useEffect(() => {
        let isMounted = true;
        setOffset(0);
        setcatName(undefined);
        setcatLeadNews1(undefined);
        setcatLeadNews2(undefined);
        setcatLeadNews3([]);
        setcatLeadMore([]);
        setNews([]);

        axios.get(`${process.env.REACT_APP_EN_API_URL}category/${catSlugEn}`).then(({ data }) => {
            if (!isMounted) return;
            if (data.category) {
                const catID = data.category.CategoryID;
                setcatName(data.category);

                axios.get(`${process.env.REACT_APP_EN_API_URL}inner-category-content/${catID}/${LeadNewsLimit}`).then(({ data }) => {
                    if (!isMounted) return;
                    if (data.inner_category_content?.length) {
                        setcatLeadNews1(data.inner_category_content[0]);
                        setcatLeadNews2(data.inner_category_content[1]);
                        setcatLeadNews3(data.inner_category_content.slice(2, 5));
                        setNews(data.inner_category_content);

                        const top_content_ids = data.inner_category_content.map(el => el.ContentID);
                        const formData = {
                            category_id: catID,
                            limit,
                            offset: 0,
                            top_content_ids
                        };

                        axios.post(`${process.env.REACT_APP_EN_API_URL}inner-category-content-more`, formData).then(({ data }) => {
                            if (!isMounted) return;
                            if (data.data) {
                                setcatLeadMore(data.data);
                                setShowMore(data.data.length >= limit);
                                setTimeout(() => ForLazyLoaderImg(false), 1000);
                            }
                        });
                    }
                });
            }
        });

        return () => {
            isMounted = false;
        };
    }, [catSlugEn]);

    const toggleButtonState = e => {
        e.preventDefault();
        const newOffset = offset + limit;
        const top_content_ids = news.map(el => el.ContentID);

        const formData = {
            category_id: catName?.CategoryID,
            limit,
            offset: newOffset,
            top_content_ids
        };

        axios.post(`${process.env.REACT_APP_EN_API_URL}inner-category-content-more`, formData).then(({ data }) => {
            if (data.data?.length) {
                setcatLeadMore(prev => [...prev, ...data.data]);
                setOffset(newOffset);
                setShowMore(data.data.length >= limit);
                setTimeout(() => ForLazyLoaderImg(false), 1000);
            } else {
                setShowMore(false);
            }
        });
    };

    if (catName === undefined) return null;
    if (catName === null) return <ErrorPageEn />;

    return (
        <main>
            <div className="container">
                <div className="DTitleEng">
                    {/* <Link to={`/${catName.Slug}`} onClick={scrollTop}> */}
                    <div className="DTitleInner">
                        <h1 className="DTitleInnerBar">
                            {catName.CategoryName}
                        </h1>
                    </div>
                    <DocumentTitle title={`${catName?.DisplayCatName ? catName.DisplayCatName : catName?.CategoryName +" Latest News ::  DeshKalNews.com"}`} />
                    <CatLdJson CatNames={catName.CategoryName} CatNameSlug={catName.Slug} />
                </div>
                <SubcatNames />
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 mt-4 DBorderRight">
                            <div className="DcatTopArea">
                                <div className="row">
                                    <div className="col-lg-8 col-12 d-flex ">
                                        <div className="DCatLeadTop">
                                            {catLeadNews1 && (
                                                <Link rel="preload" as="image" to={`/${catLeadNews1.Slug}/${catLeadNews1.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-8 col-12">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} alt={catLeadNews1.DetailsHeading} title={catLeadNews1.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                                {catLeadNews1.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-12">
                                                            <div className="Desc">
                                                                <h3 className="Title BGTitle">{catLeadNews1.DetailsHeading}</h3>
                                                                <div className="Brief">
                                                                    <p>{catLeadNews1.ContentBrief}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 d-flex">
                                        <div className="DCatTop2 align-self-stretch">
                                            {catLeadNews2 && (
                                                <Link rel="preload" as="image" to={`/${catLeadNews2.Slug}/${catLeadNews2.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews2.ImageBgPath} alt={catLeadNews2.DetailsHeading} title={catLeadNews2.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                                {catLeadNews2.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{catLeadNews2.DetailsHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="DCatTop3">
                                <div className="row">
                                    {catLeadNews3.map(nc => (
                                        <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.ContentID}>
                                            <div className="DCatTop3tList align-self-stretch">
                                                <Link to={`/${nc.Slug}/${nc.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{nc.DetailsHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 mt-4 BorderRight">
                            <h2 className="LatestNewsH">All news of {catName.CategoryName}</h2>
                            <div className="DCatNewsListArea">
                                <div className="row">
                                    {catNewsMore.map(nc => (
                                        <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                            <div className="DCatNewsList align-self-stretch">
                                                <Link to={`/${nc.Slug}/${nc.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-5 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={nc.ImageBgPath ? process.env.REACT_APP_IMG_Path + nc.ImageBgPath : process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-sm-8 col-7">
                                                            <h3 className="Title">
                                                                {nc.ContentSubHeading ? <><span className="subHeading">{nc.ContentSubHeading} / </span>{nc.DetailsHeading}</> : nc.DetailsHeading}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {showMore && (
                                <div id="btnDiv" className="text-center mt-4 mb-4">
                                    <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>More...</button>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </main>
    );
}
