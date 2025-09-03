import React, { useEffect, useState } from 'react'
import CricketSeries from '../../assets/media/common/cricket-series-en.jpg';

import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import axios from 'axios';
var lazyloaded = false
var limit = 2

const CricketSeriesEvent = () => {


  const [tagsRelatedNews, setTagsRelatedNews] = useState([]);
  useEffect(() => {
    const formData = { 'slug': "Bangladesh vs Sri Lanka Series", 'limit': limit, 'offset': 0 }
    axios
      .post(`${process.env.REACT_APP_EN_API_URL}tag-content`, formData)
      .then(({ data }) => {
        if (data.tag_contents) {
          setTagsRelatedNews(data.tag_contents);
          setTimeout(function () {
            lazyloaded = false
            ForLazyLoaderImg(lazyloaded)
          }, 1000);
        }
      });

  }, [])
  return (
    <>
      {/* Short Event Section */}
      <div className="short-event">
        <Link to="/english/tags/Bangladesh vs Sri Lanka Series" onClick={scrollTop}>
          <div className="cricket-series-banner">
            <img src={CricketSeries} alt="" className="img-fluid" />
          </div>
        </Link>
        <div className='leadTop3'>
          {tagsRelatedNews?.map((nc, i) => {
            return (
              <div className="CommonLeadList2" key={i} >
                <Link to={"/english/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}  >
                  <div className="row">
                    <div className="col-lg-5 col-5">
                      <div className="Imgresize">
                        {nc.ImageBgPath == null ?
                          <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" /> :
                          <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />}

                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                      </div>
                    </div>
                    <div className="col-lg-7 col-7">
                      <div className="Desc">
                        {nc.AltHomeTitle ?
                          <h2 className="Title">{nc.AltHomeTitle}</h2> :
                          <>
                            {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                              <h3 className="Title">{nc.DetailsHeading}</h3> :
                              <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                            }
                          </>
                        }

                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}</div>
        {/* : false} */}

      </div>
    </>
  )
}

export default CricketSeriesEvent