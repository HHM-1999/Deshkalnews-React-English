import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../'

export default function VPopularNews({ vdoPopular }) {
    return (
        <section className="MostPopularTab">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="#tabs-1">জনপ্রিয় ভিডিও</a></li>
                    </ul>
                </div>
                <div className="panel-body PanelHeight">
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="DLatestNews">
                                {vdoPopular.map((nc) => {
                                    return (
                                        <div className="MostPopularTabList" key={nc.WebTVID}>
                                            <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-5 col-sm-4 col-5">
                                                        <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/maxresdefault.jpg'} alt={nc.WebTVHeading} title={nc.WebTVHeading} /></picture>
                                                            <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h5 className="Title">{nc.WebTVHeading}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
