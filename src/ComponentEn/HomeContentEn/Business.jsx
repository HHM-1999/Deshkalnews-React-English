
import { useEffect, useState } from "react";
import { ForLazyLoaderImg } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

var lazyloaded = false
export default  function Business() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    try{
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateCategory66.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data[0]);
                        setList2(data.slice(1,6))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])
   
    return (
        <>
            <div className="AllSecTitle">
                <Link to="/english/business-en">
                    <span className="RIghtBar"></span>
                    <h2>Business</h2>
                </Link>
            </div>
            <div className="economy-area-news">
                <div className="row">
                    <div className="col-lg-6 border-right-inner ">
                        {List1 && List1 ?
                        <div className="DLeadNews" key={List1.ContentID}>
                            <Link to={"/english/details/" + List1.Slug + "/" + List1.ContentID}>
                                <picture>
                                    {List1.ImageBgPath == null ?
                                        <img src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" />
                                        :
                                        <img src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} className="img-fluid img100" />

                                    }
                                    {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                </picture>
                                <div className="Desc">
                                    {List1.ContentSubHeading === null || List1.ContentSubHeading === undefined ?
                                        <h2 className="Title">{List1.DetailsHeading}</h2> :
                                        <h2 className="Title">{List1.DetailsHeading}</h2>}
                                    <div className="Brief">
                                        <p>{List1.ContentBrief}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        :""}
                    </div>
                    <div className="col-lg-6">
                        {List2.map((nc) => {
                            return (
                                <div className="CommonLeadList" key={nc.ContentID}>
                                    <Link to={"/english/details/" + nc.Slug + "/" + nc.ContentID} >
                                        <div className="row">
                                            <div className="col-lg-5 col-5">
                                                <div className="">
                                                    <picture>
                                                        {nc.ImageBgPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />
                                                            :
                                                            <img src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />

                                                        }
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-7">
                                                <div className="Desc">
                                                    
                                                    {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                        <h2 className="Title FW700">{nc.DetailsHeading}</h2> :
                                                        <h2 className="Title FW700"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {List1.DetailsHeading}</h2>
                                                    }
                                                   

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



        </>
    )
}
catch(error){
    console.log(error); }
}
