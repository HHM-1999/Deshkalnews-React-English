
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

var lazyloaded = false
export default function Photos() {
    const [photoList1, setphotoList1] = useState([])
    const [photoList2, setphotoList2] = useState([])
    const [photoList3, setphotoList3] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generatePhotoAlbumGalleryEn.json`)
            .then(({ data }) => {
                // if (data.length > 0) {
                setphotoList1(data[0]);
                setphotoList2(data.slice(1, 3))
                setphotoList3(data.slice(3, 5))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                // }
            });
    }, [])


    return (
        <>
            <section className="Photo-glly-area ">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><Link to='/photo'><i className="fa-solid fa-chevron-right"></i>Photo Gallery</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className="CommonSecNews2-wrapper">
                        <div className="row gx-3">
                            <div className="col-lg-6 col-12 d-flex">
                                {photoList1 ?
                                    <div className="CommonLead2">
                                        <Link to={"/photo/" + photoList1.AlbumID} onClick={scrollTop} key={photoList1.AlbumID}>
                                            <div className="video-img-wrap Imgresize">
                                                <picture>
                                                    {photoList1.cover == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={photoList1.TitleEn} title={photoList1.TitleEn} className="img-fluid img100" style={{width: "800px", height:"100%"}}/> :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + photoList1.cover} alt={photoList1.TitleEn} title={photoList1.TitleEn} className="img-fluid img100" style={{width: "800px", height:"100%"}} />}

                                                    {/* {photoList1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>} */}
                                                    <div className="video-icon"><i className="fa-solid fa-camera"></i>
                                                    </div>
                                                </picture>
                                            </div>
                                            <div className="Desc">
                                                <h2 className="Title">
                                                    {
                                                        photoList1.TitleEn
                                                    }
                                                </h2>
                                                <div className="Brief">
                                                    <p>{photoList1.BriefEn}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    : ""}
                            </div>
                            <div className="col-lg-3 col-12 order-lg-first">
                                <div className="row gx-3">
                                    {photoList2.map((nc, i) => {

                                        return (
                                            <div className="col-lg-12" key={i} >
                                                <div className="Common-list2">
                                                    <div className="Common-list2-details">
                                                        <Link to={"/photo/" + nc.AlbumID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-12">
                                                                    <div className="video-img-wrap Imgresize">
                                                                        <picture>
                                                                            {nc.cover == null ?
                                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.TitleEn} title={nc.TitleEn} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.cover} alt={nc.TitleEn} title={nc.TitleEn} className="img-fluid img100" style={{width: "100%", height:"auto"}} />}

                                                                            <div className="video-icon"><i className="fa-solid fa-camera"></i>
                                                                            </div>
                                                                        </picture>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-12">
                                                                    <div className="Desc">
                                                                        <h3 className="Title"> {
                                                                            nc.TitleEn
                                                                        }</h3>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-3 col-12">
                                <div className="row gx-3">

                                    {photoList3.map((nc, i) => {

                                        return (
                                            <div className="col-lg-12" key={i}>
                                                <div className="Common-list2">
                                                    <div className="Common-list2-details">
                                                        <Link to={"/photo/" + nc.AlbumID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-12">
                                                                    <div className="video-img-wrap Imgresize">
                                                                        <picture>
                                                                            {nc.cover == null ?
                                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.TitleEn} title={nc.TitleEn} className="img-fluid img100" style={{width: "100%", height:"auto"}} /> :
                                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.cover} alt={nc.TitleEn} title={nc.TitleEn} className="img-fluid img100"  style={{width: "100%", height:"auto"}}/>}

                                                                            <div className="video-icon"><i className="fa-solid fa-camera"></i>
                                                                            </div>
                                                                        </picture>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-12">
                                                                    <div className="Desc">
                                                                        <h3 className="Title"> {
                                                                            nc.TitleEn
                                                                        }</h3>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}
