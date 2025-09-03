import React, { useState, useEffect } from 'react'

import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
// import axios from 'axios'

import { scrollTop } from '../Components/AllFunctions'
import RLoader from '../Components/RLoader'
import HeaderEn from './HeaderEn'

// import HeaderBannerAdsForMobile from '../HeaderBannerAdsForMobile'

export default function GoogleSerchEn() {
    const [isLoading, setisLoading] = useState(true)

    // const [catAdDefault1, setCatDefaultAd1] = useState([])
    // const [catAd1, setCatAd1] = useState([])
    // const [catAdScript1, setCatAdScript1] = useState([])
    useEffect(() => {
        setisLoading(true)
        setTimeout(() => {
            setisLoading(false)
            // var cx = 'ea09f3fc43677ad37';
            // var gcse = document.createElement('script');
            // gcse.type = 'text/javascript';
            // gcse.async = true;
            // gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            // var s = document.getElementsByTagName('script')[0];
            // s.parentNode.insertBefore(gcse, s);

            const cx = "010025704710994034557:lachz5dq6fg"; // Your Google Custom Search Engine ID
            const gcse = document.createElement("script");
            gcse.type = "text/javascript";
            gcse.async = true;
            gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;
            const s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(gcse, s);

        }, 500);


        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)

        // axios
        //     .get(`${process.env.REACT_APP_API_URL}json/file/generateAdvertisement9.json`)
        //     .then(({ data }) => {
        //         if (data.data.Deletable === 1) {
        //             if (data.data.AdType === 3) {
        //                 if (data.data.ScriptMobile && window.innerWidth < 768) {
        //                     setCatAdScript1(data.data.ScriptMobile)
        //                 } else {
        //                     setCatAdScript1(data.data.Script)
        //                 }
        //                 setTimeout(function () {
        //                     if (window.googletag && document.getElementById('dynamic-ad9')) {
        //                         let replaceScript = document.querySelectorAll("#dynamic-ad9 script")
        //                         var script
        //                         for (let i = 0; i < replaceScript.length; i++) {
        //                             script = document.createElement('script');
        //                             Array.from(replaceScript[i].attributes).forEach(attribute => { // eslint-disable-line no-loop-func
        //                                 script.setAttribute(
        //                                     attribute.nodeName === 'id' ? 'data-id' : attribute.nodeName,
        //                                     attribute.nodeValue,
        //                                 );
        //                             });
        //                             script.innerHTML = replaceScript[i].innerHTML;
        //                             document.getElementById('dynamic-ad9').appendChild(script);
        //                         }
        //                         // textScript
        //                     }
        //                 }, 1000);
        //             } else setCatAdScript1(null)
        //             if (data.data.AdType === 2) {
        //                 setCatAd1(data.data)
        //             } else setCatAd1(null)
        //             if (data.data.AdType === 1) {
        //                 setCatDefaultAd1(data.data)
        //             } else setCatDefaultAd1(null)
        //         } else {
        //             setCatAdScript1(null)
        //             setCatAd1(null)
        //             setCatDefaultAd1(null)
        //         }
        //     })
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => {
            if (document.getElementById('dynamic-ad9')) {
                document.getElementById('dynamic-ad9').remove();
            }
            clearTimeout(timer);
        };
    }, []);

    return (
        <main>
             <div className="adsArea AdsHide text-center">
                <img src={"/media/Advertisement/Advertisement(970X90).png"} alt="" className="img-fluid" />
            </div>
            <div className='adsArea text-center'>
                <img src="/media/Advertisement/advertisement-320x100.png" alt="" title="" className="mbAds"></img>
            </div>
             <HeaderEn />
            {isLoading === false ?
                <div className="container mb-5">
                    {/* <div className="TopHomeSection"></div>
                    <div className="DHeaderAdd_mobileshow">
                        <HeaderBannerAdsForMobile />
                    </div> */}
                    <div className="SPSecTitle">
                        <Link to="/english/keywordsearch" onClick={scrollTop}>
                        <div className="CategoryPageTitleTop mt-5">
                            <h2 className="CategoryPageTitle"><Link to="/english/keywordsearch"><span className="CategoryPageTitle "><span className='ColorBox'></span>Search
                            </span></Link>

                            </h2>
                        </div>
                            <DocumentTitle title='Search :: DeshKalNews'></DocumentTitle>
                        </Link>
                    </div>
                    <div className="DVideoTopArea googleSearch">
                        <div className="row">
                            <div className="col-lg-9 col-sm-12 col-12 border-right-inner" style={{ width: "70%" }}>
                                <div className="gcse-searchresults-only"></div>
                            </div>
                            {/* <div className="col-lg-3 col-12" style={{ width: "30%" }}>
                                {catAdScript1 ? <div className="row"><div className="col-12 d-flex justify-content-center" id="dynamic-ad9" dangerouslySetInnerHTML={{ __html: catAdScript1 }}></div></div> : ""}
                                {catAd1 ? <div className="row"><div className="col-12 d-flex justify-content-center"><a href={catAd1.URL ? catAd1.URL : '/'} target={'_blank'} rel='noreferrer'>
                                    <img src={catAd1.ImagePathMobile && window.innerWidth < 768 ? process.env.REACT_APP_BACK_DOMAIN_URL + "media/common/adds/" + catAd1.ImagePathMobile : process.env.REACT_APP_BACK_DOMAIN_URL + "media/common/adds/" + catAd1.ImagePath} alt={catAd1.Caption} title={catAd1.Caption} className="img-fluid img100" /></a></div></div> : ""}
                                {catAdDefault1 ? <div className="row"><div className="col-12 d-flex justify-content-center"><a href='/' target='_blank' rel='noreferrer'><img src={process.env.REACT_APP_BACK_DOMAIN_URL + "media/common/adds/" + catAdDefault1.DefaultImagePath} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></a></div></div> : ""}
                              
                            </div> */}
                        </div>
                    </div>
                </div>
                : <RLoader />}
        </main>
    )
}
