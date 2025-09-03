
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { scrollTop } from "../AllFunctions";


export default function ScienceandTech() {
    const [list1, setList1] = useState([])
    const [list2, setList2] = useState([])
    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory9.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data[0]);
                    setList2(data.slice(1, 6));
                }
            });


    }, [])


    return (
        <>

            <div className="saradesh-area">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/science-and-tech' onClick={scrollTop}>Science and Tech</Link></h2>
                        </div>
                    </div>
                </div>
                <div className=" row">
                    <div className="col-lg-8 border-right-inner">
                        <div className="CommonLead">
                            <Link to={"/details/" + list1.Slug + "/" + list1.ContentID} onClick={scrollTop}>
                                <div className="Imgresize">
                                    <picture>
                                        {list1.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list1.DetailsHeading} title={list1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list1.ImageBgPath} alt={list1.DetailsHeading} title={list1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                        {list1.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                                    </picture>
                                </div>
                                <div className="Desc">
                                    {list1.AltHomeTitle ?
                                        <h2 className="Title"> {list1.AltHomeTitle} </h2>
                                        :
                                        <h2 className="Title"> {list1.DetailsHeading} </h2>
                                    }
                                    <div className="Brief">
                                        <p> {list1.ContentBrief}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {list2.map((list, i) => {
                            return (
                                <div className="CommonLeadList" key={i}>
                                    <Link to={"/details/" + list.Slug + "/" + list.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-6 col-5">
                                                <div className="Imgresize">
                                                    <picture>
                                                        {list.ImageThumbPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.ImageThumbPath} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}}/>}
                                                        {list.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                                                    </picture>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-7">
                                                <div className="Desc">
                                                    {list.AltHomeTitle ?
                                                        <h2 className="Title">{list.AltHomeTitle}</h2> :
                                                        <h2 className="Title">{list.DetailsHeading}</h2>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
            <div className="seeMore">
                <Link className="btn btnMore" to="/science-and-tech" onClick={scrollTop}>More...</Link>
            </div>



        </>
    )

}
