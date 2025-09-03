import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function Agriculture() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory8.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data.slice(1, 4))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])

        return (
            <>
                <div className="Bissho-area">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><i className="fa-solid fa-chevron-right"></i><Link to='/agriculture'>Agriculture</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className="CommonSecNews3-wrapper">
                        <div className="CommonLead3">
                            <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-7 Imgresize">
                                        <picture>
                                            {List1.ImageBgPath == null ?
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                            {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                        </picture>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="Desc">
                                            {List1.AltHomeTitle ?
                                                <h2 className="Title">{List1.AltHomeTitle}
                                                </h2> :
                                                <h2 className="Title">{List1.DetailsHeading}
                                                </h2>
                                            }
                                            <div className="Brief">
                                                <p>{List1.ContentBrief}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row">
                            {
                                List2.map((nc, i) => {
                                    return (
                                        <div className="col-lg-4" key={i}>
                                            <div className="CommonLead">
                                                <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-5 Imgresize">
                                                            <picture>
                                                                {nc.ImageSmPath == null ?
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                            </picture>
                                                        </div>
                                                        <div className="col-lg-12 col-7">
                                                            <div className="Desc">
                                                                {nc.AltHomeTitle ?
                                                                    <h2 className="Title"> {nc.AltHomeTitle}
                                                                    </h2> :
                                                                    <h2 className="Title"> {nc.DetailsHeading}
                                                                    </h2>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>)
                                })}
                        </div>
                    </div>
                    <div className="seeMore">
                        <Link className="btn btnMore" to="/agriculture" onClick={scrollTop}>More...</Link>
                    </div>
                </div>
            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
