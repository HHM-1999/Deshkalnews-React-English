
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

import { Link } from "react-router-dom";
import ErrorPageEn from '../ErrorPageEn'
import { ForLazyLoaderImg, scrollTop } from "../../ComponentEn/AllFunctions";

var lazyloaded = false
export default function SpecialTop() {
    const [LeadSpecial1, setLeadSpecial1] = useState([])
    const [LeadSpecial2, setLeadSpecial2] = useState([])

    try {

        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateSpecialTopOne.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setLeadSpecial1(data[0]);
                        setLeadSpecial2(data.slice(1, 4))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])


        return (
            <>

                <div className="leadTop3">
                    <div className="Common-list">
                        <div className="Common-list-details">
                            <Link to={"/" + LeadSpecial1.categorySlug + "/" + LeadSpecial1.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-12 col-12 Imgresize">
                                        {LeadSpecial1.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100"  style={{width: "800px", height:"100%"}}/> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + LeadSpecial1.ImageBgPath} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100"  style={{width: "800px", height:"100%"}}/>}

                                        {LeadSpecial1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <div className="Desc">
                                            {LeadSpecial1.AltHomeTitle ?
                                                <h3 className="Title">{LeadSpecial1.AltHomeTitle}</h3> :
                                                <>
                                                    {LeadSpecial1.ContentSubHeading === null || LeadSpecial1.ContentSubHeading === undefined ?
                                                        <h3 className="Title">{LeadSpecial1.DetailsHeading}</h3> :
                                                        <h3 className="Title"> <span className="subHeading">{LeadSpecial1.ContentSubHeading + " / "}</span> {LeadSpecial1.DetailsHeading}</h3>
                                                    }
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    
                    </div>
                    {
                        LeadSpecial2.map((nc, i) => {
                            return (
                                <div className="CommonLeadList2" key={i}>
                                    <Link to={"/" + nc.categorySlug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-5 col-5">
                                                <div className="Imgresize">
                                                    {nc.ImageThumbPath == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "120px", height:"100%"}} /> :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "120px", height:"100%"}} />}

                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-7">
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
                        })
                    }
                </div>

            </>
        )
    }
    catch {
        <ErrorPageEn />
    }
}
