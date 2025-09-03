import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ForLazyLoaderImg, scrollTop } from "../../ComponentEn/AllFunctions";

var lazyloaded = false
export default function Interview() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateSubCategory26.json `)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data.slice(1, 2))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])

        return (
            <>

                <div className="sakkhatkar">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><i className="fa-solid fa-chevron-right"></i><Link to="/opinion/interview" onClick={scrollTop}>Interview</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className="Common-list">
                        <div className="Common-list-details">
                            <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-12 col-12 Imgresize">
                                        <picture>{List1.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "800px", height:"100%"}}  /> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "800px", height:"100%"}} />}</picture>

                                    </div>
                                    <div className="col-lg-12 col-12">
                                        <div className="Desc">
                                            {List1.AltHomeTitle ?
                                                <h3 className="Title">{List1.AltHomeTitle}</h3> :
                                                <>
                                                    {List1.ContentSubHeading === null || List1.ContentSubHeading === undefined ?
                                                        <h3 className="Title">{List1.DetailsHeading}</h3> :
                                                        <h3 className="Title"> <span className="subHeading">{List1.ContentSubHeading + " / "}</span> {List1.DetailsHeading}</h3>
                                                    }
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {List2.map((nc, i) => {
                        return (
                            <div className="CommonLeadList2" key={i}>
                                <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-5 col-5">
                                            <div className="Imgresize">
                                                <picture>{nc.ImageThumbPath == null ?
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "120px", height:"100%"}}  /> :
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" style={{width: "120px", height:"100%"}} />}</picture>
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
                    })}

                </div>
            </>
        )

    }
    catch (error) {
        console.log(error);
    }
}
