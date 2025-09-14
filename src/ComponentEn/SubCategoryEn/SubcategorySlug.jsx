import axios from 'axios';
import { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';

import ErrorPageEn from '../ErrorPageEn';
import SubCatLdJson from './SubCatLdjsonEn';

export default function SubCategory() {
    const { catSlugEn, subCatSlug } = useParams();
    const [subCatName, setSubCatName] = useState(undefined);
    const [CatName, setCatName] = useState('');
    const [CatSlug, setCatSlug] = useState('');
    const [catLeadNews1, setcatLeadNews1] = useState(undefined);
    const [catLeadNews2, setcatLeadNews2] = useState(undefined);
    const [catLeadNews3, setcatLeadNews3] = useState([]);
    const [catNewsMore, setcatLeadMore] = useState([]);
    const [news, setNews] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showMore, setShowMore] = useState(true);

    const limit = 8;
    const LeadNewsLimit = 5;

    useEffect(() => {
        let isMounted = true;
        setOffset(0);
        setSubCatName(undefined);
        setcatLeadNews1(undefined);
        setcatLeadNews2(undefined);
        setcatLeadNews3([]);
        setcatLeadMore([]);
        setNews([]);

        axios.get(`${process.env.REACT_APP_EN_API_URL}sub-categorys/${catSlugEn}/${encodeURIComponent(subCatSlug)}`).then(({ data }) => {
            if (!isMounted) return;
            if (data.subCategories?.Slug === subCatSlug) {
                const SubcatID = data.subCategories.CategoryID;
                setCatSlug(data.subCategories.Slug);
                setCatName(data.subCategories.CategoryName);
                setSubCatName(data.subCategories);

                axios.get(`${process.env.REACT_APP_EN_API_URL}inner-sub-category-content/${SubcatID}/${LeadNewsLimit}`).then(({ data }) => {
                    if (!isMounted) return;
                    const content = data.inner_subcategory_content || [];
                    setcatLeadNews1(content[0]);
                    setcatLeadNews2(content[1]);
                    setcatLeadNews3(content.slice(2, 5));
                    setNews(content);

                    const top_content_ids = content.map(el => el.ContentID);
                    const formData = {
                        category_id: SubcatID,
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
                });
            } else {
                setSubCatName(null);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [catSlugEn, subCatSlug]);

    const toggleButtonState = e => {
        e.preventDefault();
        const newOffset = offset + limit;
        const top_content_ids = news.map(el => el.ContentID);
        const formData = {
            category_id: subCatName?.CategoryID,
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

    if (subCatName === undefined) return null;
    if (subCatName === null) return <ErrorPageEn />;

    return (
        <main>
            <div className="container">
                <h1 className="DTitle">
                    {/* <Link to="/" onClick={scrollTop}> */}
                    <span className="DTitleInner">
                        <span className="DTitleInnerBar">
                            <span>{subCatName.CategoryName}</span>
                        </span>
                    </span>
                    {/* </Link> */}
                    <DocumentTitle title={`${subCatName.CategoryName} | ${subCatName.CategoryName} Latest News ::  DeshkalNews.com`} />
                    <SubCatLdJson CatNames={CatName} CatNameSlug={CatSlug} SubCatNames={subCatName.CategoryName} SubCatNameSlug={subCatName.Slug} />
                </h1>

                <section>
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 DBorderRight mt-3">
                            <div className="row">
                                <div className="col-lg-8 col-12 d-flex">
                                    <div className="DCatLeadTop">
                                        {catLeadNews1 && (
                                            <Link rel="preload" as="image" to={`/${catSlugEn}/${catLeadNews1.ContentID}`} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-8 col-12">
                                                        <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} alt={catLeadNews1.DetailsHeading} title={catLeadNews1.DetailsHeading} style={{width: "100%", height:"auto"}}/></picture>
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
                                            <Link rel="preload" as="image" to={`/${catSlugEn}/${catLeadNews2.ContentID}`} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-12 col-sm-4 col-5">
                                                        <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews2.ImageSmPath} alt={catLeadNews2.DetailsHeading} title={catLeadNews2.DetailsHeading} style={{width: "100%", height:"auto"}}/></picture>
                                                            {catLeadNews2.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h3 className="Title">{catLeadNews2.ContentSubHeading ? <><span className="subHeading">{catLeadNews2.ContentSubHeading} / </span>{catLeadNews2.DetailsHeading}</> : catLeadNews2.DetailsHeading}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="DCatTop3">
                                <div className="row">
                                    {catLeadNews3.map(nc => (
                                        <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.ContentID}>
                                            <div className="DCatTop3tList align-self-stretch">
                                                <Link to={`/${catSlugEn}/${nc.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
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
                </section>

                <section>
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 mt-5 BorderRight">
                            <h2 className="LatestNewsH">All News of {subCatName.CategoryName}</h2>
                            <section className="DCatNewsListArea">
                                <div className="row">
                                    {catNewsMore.map(nc => (
                                        <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                            <div className="DCatNewsList align-self-stretch">
                                                <Link to={`/${catSlugEn}/${nc.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-5 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={nc.ImageSmPath ? process.env.REACT_APP_IMG_Path + nc.ImageSmPath : process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}}/></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-sm-8 col-7">
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
                            </section>
                            {showMore && (
                                <div id="btnDiv" className="text-center mt-4 mb-4">
                                    <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>More...</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
