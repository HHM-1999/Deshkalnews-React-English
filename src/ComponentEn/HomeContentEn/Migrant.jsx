import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function Migrant() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory33.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data.slice(1, 3))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])

        return (
            <>
                <div className="job-area-news">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><i className="fa-solid fa-chevron-right"></i><Link to='/migrant' onClick={scrollTop}>Migrant</Link></h2>
                            </div>
                        </div>
                    </div>

                    <div className="CommonLead">
                        <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                            <div className="Imgresize">
                                <picture>
                                    {List1.ImageBgPath == null ?
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                    {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                </picture>
                            </div>
                            <div className="Desc">
                                {List1.AltHomeTitle ?
                                    <h2 className="Title"> {List1.AltHomeTitle}
                                    </h2> :
                                    <h2 className="Title"> {List1.DetailsHeading}
                                    </h2>
                                }

                            </div>
                        </Link>
                    </div>
                    {
                        List2.map((item, index) => {
                            return (
                                <div className="CommonLeadList" key={index}>
                                    <Link to={"/details/" + item.Slug + "/" + item.ContentID} onClick={scrollTop} >
                                        <div className="row">
                                            <div className="col-lg-6 col-5">
                                                <div className="Imgresize">
                                                    <picture>
                                                        {item.ImageSmPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={item.DetailsHeading} title={item.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + item.ImageSmPath} alt={item.DetailsHeading} title={item.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                                        {item.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-7">
                                                <div className="Desc">
                                                    {item.AltHomeTitle ?
                                                        <h2 className="Title"> {item.AltHomeTitle}
                                                        </h2> :
                                                        <h2 className="Title"> {item.DetailsHeading}
                                                        </h2>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    <div className="seeMore">
                        <Link className="btn btnMore" to="/migrant" onClick={scrollTop}>More...</Link>
                    </div>
                </div>
            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
