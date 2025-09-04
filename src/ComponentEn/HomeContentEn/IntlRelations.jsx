
import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";


var lazyloaded = false
export default function IntlRelations() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])
    const [List4, setList4] = useState([])


    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory39.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data[1]);
                        setList3(data[2])
                        setList4(data.slice(3, 7))
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
                        <div className="section-heading">
                            <Link to='/world' onClick={scrollTop}>
                                <h2><i className="fa-solid fa-chevron-right"></i>Int’l Relations</h2>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="orthoniti-area">
                    <div className="CommonSecNews3-wrapper">
                        {List1 ?
                            <div className="CommonLead3" key={List1.ContentID}>
                                <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-4 Imgresize">
                                            <picture>
                                                {List1.ImageSmPath == null ?
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100"  style={{width: "300px", height:"100%"}}/>
                                                    :
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageSmPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "300px", height:"100%"}} />

                                                }
                                                {List1.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                                            </picture>
                                        </div>
                                        <div className="col-lg-8 d-flex">
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
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            : ""}
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="multiple-news-wrap">
                                {List2 ?
                                    <div className="CommonLead" key={List2.ContentID}>
                                        <Link to={"/details/" + List2.Slug + "/" + List2.ContentID} onClick={scrollTop} >
                                            <div className="row">
                                                <div className="col-lg-12 col-5 Imgresize">
                                                    <picture>
                                                        {List2.ImageBgPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List2.DetailsHeading} title={List2.DetailsHeading} className="img-fluid img100"  style={{width: "300px", height:"100%"}}/>
                                                            :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List2.ImageBgPath} alt={List2.DetailsHeading} title={List2.DetailsHeading} className="img-fluid img100" style={{width: "300px", height:"100%"}} />
                                                        }
                                                        {List2.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                                <div className="col-lg-12 col-7">
                                                    <div className="Desc">
                                                        {List2.AltHomeTitle ?
                                                            <h3 className="Title">{List2.AltHomeTitle}</h3> :
                                                            <>
                                                                {List2.ContentSubHeading === null || List2.ContentSubHeading === undefined ?
                                                                    <h3 className="Title">{List2.DetailsHeading}</h3> :
                                                                    <h3 className="Title"> <span className="subHeading">{List2.ContentSubHeading + " / "}</span> {List2.DetailsHeading}</h3>
                                                                }
                                                            </>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    : ""}

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="multiple-news-wrap">
                                {List3 ?
                                    <div className="CommonLead" key={List3.ContentID}>
                                        <Link to={"/details/" + List3.Slug + "/" + List3.ContentID} onClick={scrollTop} >
                                            <div className="row">
                                                <div className="col-lg-12 col-5 Imgresize">
                                                    <picture>
                                                        {List3.ImageBgPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List3.DetailsHeading} title={List3.DetailsHeading} className="img-fluid img100" style={{width: "300px", height:"100%"}} />
                                                            :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List3.ImageBgPath} alt={List3.DetailsHeading} title={List3.DetailsHeading} className="img-fluid img100" style={{width: "300px", height:"100%"}} />

                                                        }
                                                        {List3.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                                <div className="col-lg-12 col-7">
                                                    <div className="Desc">
                                                        {/* {List3.ContentSubHeading === null || List3.ContentSubHeading === undefined ?
                                                            <h3 className="Title">{List3.DetailsHeading}</h3> :
                                                            <h3 className="Title"> <span className="subHeading">{List3.ContentSubHeading + " / "}</span> {List3.DetailsHeading}</h3>
                                                        } */}
                                                        {List3.AltHomeTitle ?
                                                            <h3 className="Title">{List3.AltHomeTitle}</h3> :
                                                            <>
                                                                {List3.ContentSubHeading === null || List3.ContentSubHeading === undefined ?
                                                                    <h3 className="Title">{List3.DetailsHeading}</h3> :
                                                                    <h3 className="Title"> <span className="subHeading">{List3.ContentSubHeading + " / "}</span> {List3.DetailsHeading}</h3>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    : ""}

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {List4.map((nc, i) => {
                            return (
                                <>
                                    <div className="col-lg-6" key={i}>
                                        <div className="Common-list">
                                            <div className="Common-listBox-item">
                                                <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                                    <div className="Desc">
                                                        {nc.AltHomeTitle ?
                                                            <h3 className="Title">{nc.AltHomeTitle}</h3> :
                                                            <>
                                                                {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                    <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                                    <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                                }
                                                            </>
                                                        }

                                                    </div>
                                                </Link>
                                            </div>

                                        </div>
                                    </div ></>
                            )
                        })}
                    </div>
                    <div className="seeMore">
                        <Link className="btn btnMore" to='/world' onClick={scrollTop}>More...</Link>
                    </div>
                </div >
            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
