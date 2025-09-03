import { useEffect } from 'react';
import DocumentTitle from 'react-document-title';
import Agriculture from './HomeContentEn/Agriculture';
import Bangladesh from './HomeContentEn/Bangladesh';
import Climate from './HomeContentEn/Climate';
import Economy from './HomeContentEn/Economy';
import Entertainment from './HomeContentEn/Entertainment';
import Health from './HomeContentEn/Health';
import Interview from './HomeContentEn/Interview';
import LeadNews from './HomeContentEn/LeadNews';
import Opinion from './HomeContentEn/Opinion';
import Photos from './HomeContentEn/Photos';
import Religion from './HomeContentEn/Religion';
import ScienceandTech from './HomeContentEn/ScienceandTech';
import Sports from './HomeContentEn/Sports';
import VideoLead from './HomeContentEn/VideoLead';
import Weather from './HomeContentEn/Weather';
import World from './HomeContentEn/World';
import EducationCampus from './HomeContentEn/EducationCampus';
import HomeLdjsonEn from './HomeLdjsonEn';



export default function HomeEn() {

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);


    }, [])
    return (
        <>
            <main>
                <DocumentTitle title=' Deshkal News | Unbiased & Timely News from Bangladesh' />
                <HomeLdjsonEn />
                <LeadNews />
                <div className="DTopNewsBottomSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 border-right-inner" >
                                <VideoLead />
                            </div>
                            <div className="col-lg-3">
                                <Interview />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="rajniti-orthiniti-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 border-right-inner">
                                <Bangladesh />
                            </div>
                            <div className="col-lg-6">
                                <World />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center  mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="sports-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <Sports />
                            </div>
                            <div className="col-lg-3">
                                {/* <CricketSeriesEvent /> */}
                                <Economy />
                                <EducationCampus />
                            </div>

                        </div>
                    </div>
                </section>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <Entertainment />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <Opinion />
                <Photos />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="health-bissho-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 border-right-inner">
                                <Health />
                            </div>
                            <div className="col-lg-6">
                                <Agriculture />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="saradesh-area-job">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 border-right-inner">
                                <ScienceandTech />
                            </div>
                            <div className="col-lg-3">
                                {/* <Job /> */}
                                <Climate />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="DHomeAdd970X90 d-flex justify-content-center mt-4 mb-2">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="" title=""
                                    className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div> */}

                <section className="lifestyle-Probash">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-lg-9 border-right-inner">
                                <Religion />
                            </div>
                            <div className="col-lg-3">
                                <Weather />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}
