import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForLazyLoaderImg } from '../../ComponentEn/AllFunctions';


var lazyloaded = false


export default function LatestPopular() {

    const [activeTab, setActiveTab] = useState('tabs-1');

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };
    const [generateLatest, setgenerateLatest] = useState([])
    const [generatePopular, setgeneratePopular] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateLatest.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setgenerateLatest(data.slice(0, 10));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generatePopular.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setgeneratePopular(data.slice(0, 10));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])


    return (
        <>
            <section className="DLPSTab2 mt-0">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tabs-1"
                                    role="tab" aria-selected="true">Latest</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#tabs-2" role="tab"
                                    aria-selected="false">Popular</a>
                            </li>
                        </ul>
                    </div>
                    <div className="panel-body PanelHeight">
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="DLatestNews longEnough mCustomScrollbar"
                                    data-mcs-theme="dark">
                                    <ul>{
                                        generateLatest && generateLatest.map((nc, i) => {
                                            return (
                                                <li className="DLatestNewsList" key={i}>
                                                    <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID}>
                                                        <div className="d-flex flex-row">
                                                            <span className="Counter">{(i + 1)}</span>
                                                            <p>{nc.DetailsHeading}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )

                                        })
                                    }



                                    </ul>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <div className="DLatestNews longEnough mCustomScrollbar"
                                    data-mcs-theme="dark">
                                    <ul>
                                        {
                                            generatePopular && generatePopular.map((nc, i) => {
                                                return (
                                                    <li className="DLatestNewsList" key={i}>
                                                        <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID}>
                                                            <div className="d-flex flex-row">
                                                                <span className="Counter">{(i + 1)}</span>
                                                                <p>{nc.DetailsHeading}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
