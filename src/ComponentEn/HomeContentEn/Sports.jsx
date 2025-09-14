import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

var lazyloaded = false
// let subName = ''

export default function Sports() {
    // let { catSlug } = useParams();
    // const [catName, setcatName] = useState([])
    // const [SubcatName, setSubcatName] = useState([])
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])

    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory3.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data[1])
                        setList3(data.slice(2, 6))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}category/sports`)
                .then(({ data }) => {
                    if (data.category) {
                        // setcatName(data.category)
                        // setSubcatName(data.category.subCategories)

                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading d-flex align-items-end">
                            <h2><a href="/sports"><i className="fa-solid fa-chevron-right"></i>Sports</a> </h2>
                            {/* <div className="multiple-subcat-title">
                                {SubcatName.map((nc) => {
                                    return (
                                        <Link to={`/sports/${nc.Slug}`} onClick={scrollTop}>{nc.CategoryName}</Link>
                                    )
                                })}

                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="sports-BGimg Imgresize">
                    <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                        <picture>
                            {List1.ImageBgPath == null ?
                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />
                                :
                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />

                            }
                            {List1.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                        </picture>
                    </Link>
                </div>
                <div className="CommonSecNews-wrapper">
                    <div className="row">
                        <div className="col-lg-7 col-12 d-flex Imgresize">
                            <div className="CommonLead3">
                                <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                    <div className="Desc">
                                        {List1.AltHomeTitle ?
                                            <h2 className="Title">{List1.AltHomeTitle}</h2> :
                                            <>
                                                {List1.ContentSubHeading === null || List1.ContentSubHeading === undefined ?
                                                    <h2 className="Title">{List1.DetailsHeading}</h2> :
                                                    <h2 className="Title"> <span className="subHeading">{List1.ContentSubHeading + " / "}</span> {List1.DetailsHeading}</h2>
                                                }
                                            </>
                                        }
                                        <div className="Brief">
                                            <p>{List1.ContentBrief}</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={"/" + List2.Slug + "/" + List2.ContentID} onClick={scrollTop}>
                                    <picture>
                                        {List2.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List2.DetailsHeading} title={List2.DetailsHeading} className="img-fluid img100 " style={{width: "100%", height:"auto"}} />
                                            :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List2.ImageBgPath} alt={List2.DetailsHeading} title={List2.DetailsHeading} className="img-fluid img100 " style={{width: "100%", height:"auto"}} />

                                        }
                                        {List2.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                    </picture>
                                    <div className="Desc ">
                                        {
                                            List2.AltHomeTitle ?
                                                <h2 className="Title text-center">{List2.AltHomeTitle}</h2> :
                                                <>
                                                    {List2.ContentSubHeading === null || List2.ContentSubHeading === undefined ?
                                                        <h2 className="Title text-center">{List2.DetailsHeading}</h2> :
                                                        <h2 className="Title text-center"> <span className="subHeading">{List2.ContentSubHeading + " / "}</span> {List2.DetailsHeading}</h2>
                                                    }
                                                </>
                                        }

                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            {List3.map((nc) => {
                                return (
                                    <div className="CommonLeadList">
                                        <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-6 col-5">
                                                    <div className="Imgresize">
                                                        <picture>
                                                            {nc.ImageBgPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />
                                                                :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />

                                                            }
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </picture>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-7">
                                                    <div className="Desc">
                                                        {nc.AltHomeTitle ?
                                                            <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                            <>
                                                                {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                    <h2 className="Title">{nc.DetailsHeading}</h2> :
                                                                    <h2 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h2>
                                                                }
                                                            </>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="seeMore">
                    <Link className="btn btnMore" to="/sports" onClick={scrollTop}>More...</Link>
                </div>
            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
