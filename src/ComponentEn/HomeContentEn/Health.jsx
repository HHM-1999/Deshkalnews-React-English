
import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";

var lazyloaded = false
export default function Health() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])

    try {

        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory10.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data.slice(1, 3))
                        setList3(data.slice(3, 5))
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
                            <h2><Link to='/health'><i className="fa-solid fa-chevron-right"></i>Health</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="CommonSecNews3-wrapper">
                    <div className="CommonLead3">
                        <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>

                            <div className="row">
                                <div className="col-lg-5 d-flex align-items-center">
                                    <div className="Desc">
                                        {List1.AltHomeTitle ?

                                            <h2 className="Title">
                                                {List1.AltHomeTitle}
                                            </h2> :
                                            <h2 className="Title">
                                                {List1.DetailsHeading}
                                            </h2>
                                        }

                                    </div>
                                </div>
                                <div className="col-lg-7 Imgresize">
                                    <picture>
                                        {List1.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                        {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                    </picture>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {
                                List2.map((list, i) => {
                                    return (
                                        <div className="CommonLeadList" key={i}>
                                            <Link to={"/" + list.Slug + "/" + list.ContentID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-6 col-5">
                                                        <div className="Imgresize">
                                                            <picture>
                                                                {list.ImageThumbPath == null ?
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.ImageThumbPath} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}}/>}
                                                                {list.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
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
                                })
                            }
                        </div>
                        <div className="col-lg-6">
                            {
                                List3.map((list, i) => {
                                    return (
                                        <div className="CommonLeadList" key={i}>
                                            <Link to={"/" + list.Slug + "/" + list.ContentID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-6 col-5">
                                                        <div className="Imgresize">
                                                            <picture>
                                                                {list.ImageThumbPath == null ?
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}}/> :
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.ImageThumbPath} alt={list.DetailsHeading} title={list.DetailsHeading} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}
                                                                {list.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
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
                                })
                            }
                        </div>

                    </div>
                    <div className="seeMore">
                        <Link className="btn btnMore" to="/health" onClick={scrollTop}>More...</Link>
                    </div>


                </div>






            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}
