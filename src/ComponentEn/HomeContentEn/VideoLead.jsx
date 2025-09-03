// import axios from 'axios'
import React from 'react'
import LatestPopular from './LatestPopular'
// import { Link } from 'react-router-dom'
// import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'

// var lazyloaded = false
export default function VideoLead() {
    // const [LeadData, setLeadData] = useState([])

    // const [generateLatest, setgenerateLatest] = useState([])
    // const [generatePopular, setgeneratePopular] = useState([])
    // useEffect(() => {
    //     axios
    //         .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateVideo_features.json`)
    //         .then(({ data }) => {
    //             if (data.length > 0) {
    //                 setLeadData(data.slice(0, 4));
    //                 setTimeout(function () {
    //                     lazyloaded = false
    //                     ForLazyLoaderImg(lazyloaded)
    //                 }, 1000);
    //             }
    //         });
    // }, [])

    return (
        <>
            <div className="leadTop4">
                {/* <div className="row">
                    {LeadData.map((nc) => {
                        return (
                            <div className="col-lg-3">
                                <div className="Common-list-details">
                                    <Link to={"/videos/"  + nc.WebTVID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="leadTop4-img Imgresize">
                                                    <picture>

                                                    {nc.WebTVLinkCode === null ? (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={process.env.REACT_APP_LAZYL_IMG}
                                                                alt={nc.WebTVHeading}
                                                                title={nc.WebTVHeading}
                                                                className="img100 ImgRatio Imgresize"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                                alt={nc.WebTVHeading}
                                                                title={nc.WebTVHeading}
                                                                className="img100 ImgRatio Imgresize"
                                                            />
                                                        )}
                                                    </picture>
                                                    <div className="video-icon"><i className="fas fa-play"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.WebTVHeading}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}


                    <div className="seeMore">
                        <a className="btn btnMore" href="#">আরও...</a>
                    </div>
                </div> */}
                <LatestPopular />
            </div>

        </>

    )
}
