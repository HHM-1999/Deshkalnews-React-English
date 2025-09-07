
import { FaCircleArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { ForLazyLoaderImg } from "../AllFunctions";





var limit = 4
var offset = 0
var formData = []
var lazyloaded = false
export default function WebcategorySlug({CategoryName,catslug}) {

    // const { catslug } = useParams()
    // const [VideoCat, setVideoCat] = useState([]);
    const[CatMore,setcatMore]=useState([])
    // var formdata = { 'categorySlug': catslug, 'limit': limit, 'offset': offset };
    // console.log(formdata);
    // var list = []
    try {
        // list = await postApi(`webtv-category-video-by-slug`, formdata)
        useEffect(() => {
            // axios
            //     .get(`${process.env.REACT_APP_API_URL}webtv-category-list`)
            //     .then(({ data }) => {
            //         setVideoCat(data.categories)
            //     })
            formData = { 'categorySlug': catslug, 'limit': limit, 'offset': offset }
            axios
                .post(`${process.env.REACT_APP_API_URL}webtv-category-video-by-slug`, formData)
                .then(({ data }) => {
                    if (data.webtvCategory_video) {
                        setcatMore(data.webtvCategory_video);
                    
                        // if (data.webtvCategory_video.length < limit) {
                        //     showMore = false
                        // }
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [catslug])

        // // const WebList= list.webtvCategory_video
        // // console.log(WebList.CategorySlug);


        // console.log(innerContent);


       

        return (

            <>
            
                { CatMore.length > 0 ?
                    <div className="container">

                        <div className="CategoryPageTitleTop mt-5">
                            <h2 className="CategoryPageTitle"><Link to={`/videos/${catslug}`}><span className="CategoryPageTitle "><span className="ColorBox"></span>{CategoryName}</span></Link></h2>

                        </div>


                        <div className="DCatTop4">
                            <div className="row">
                                {CatMore && CatMore.map((nc) => {
                                    return (
                                        <div className="col-lg-3 col-12 d-flex" key={nc.WebTVID}>
                                            <div className="DCatTop3tList" >
                                                <Link to={"/videos/" + catslug + "/" + nc.WebTVID}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="LiveVideoImg">
                                                                <picture>
                                                                    {nc.WebTVLinkCode === null ? (
                                                                        <img
                                                                            src={process.env.REACT_APP_LAZYL_IMG}
                                                                            alt={nc.WebTVHeading}
                                                                            title={nc.WebTVHeading}
                                                                            className="img100 ImgRatio"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                                            alt={nc.WebTVHeading}
                                                                            title={nc.WebTVHeading}
                                                                            className="img100 ImgRatio"
                                                                        />
                                                                    )}
                                                                    {nc.ShowVideo === 1 && (
                                                                        <div className="card-video-icon big transition">
                                                                            <i className="fa-solid fa-play"></i>
                                                                        </div>
                                                                    )}
                                                                </picture>
                                                                <div className="card-video-icon big transition">
                                                                    <i className="fa-solid fa-play"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{nc.WebTVHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>

                                        </div>
                                    )}
                                )}
                            </div>
                            {CatMore.length > 0 ?
                                <div className="moreButton">
                                    <span><Link to={`/videos/${catslug}`} className="LinkBtn">আরও </Link> <FaCircleArrowRight /></span>
                                </div> : " "}
                        </div>




                    </div>

                    : ""}

            </>
        )
    }

    catch (error) {
        console.log(error);
    }
}



