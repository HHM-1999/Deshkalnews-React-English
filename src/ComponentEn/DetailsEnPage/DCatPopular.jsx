import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'
export default function DCatPopular({ catPopular, catName }) {
    return (
        <>
            <div className="DSecTitle2">
                <h2> {catName} Popular News</h2>
            </div>
            <div className="DBottomNews">
                <div className="row">
                    {catPopular.map((nc) => {
                        return (
                            <div className="col-lg-6 col-12" key={nc.ContentID}>
                                <div className="DTop3List">
                                    <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-4 col-5">
                                                <div className="DImgZoomBlock">
                                                    {nc.ImageSmPath	 === null ?
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>
                                                        :
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} style={{width: "100%", height:"auto"}} /></picture>}

                                                    {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-sm-8 col-7 textBorder2">
                                                <div className="Desc textBorder">
                                                    {nc.ContentSubHeading == null ?
                                                        <h3 className="Title BGTitle">{nc.DetailsHeading}</h3> :
                                                        <h3 className="Title BGTitle"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                    }
                                                    {/* <h3 className="Title BGTitle">{nc.DetailsHeading}</h3> */}

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
