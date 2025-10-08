import axios from 'axios';
import { useEffect, useState } from "react";
import DocumentTitle from 'react-document-title';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, formatTimestamp, scrollTop } from '../AllFunctions';
// import VideoLatestPopularNews from "./VideoLatestPopularNews";

import DSocialShare from '../DetailsEnPage/DSocialShare';
import ErrorPageEn from '../ErrorPageEn';
// import RLoader from "../RLoader";
var lazyloaded = false
export default function DetailsPhotoFeature() {
  let { vdoSlug, AlbumID } = useParams();
  const [album, setAlbum] = useState([])
  const [ImageList, setImageList] = useState([]);
  const [videosList, setVideosList] = useState([])
  // const [videoSlug, setVideoSlug] = useState([]);
  // var ImageList = (album.photos).map(function (el) { return el.ImagePath });
  // var caption = (album.photos).map(function (el) { return el.Caption });

  // const [videosLatestNews, setVideosLatestNews] = useState([]);
  // const [videosPopularNews, setVideosPopularNews] = useState([]);
  // const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
    // setTimeout(() => { window.location.reload(1); }, 300000);
    // setisLoading(true)
    // setTimeout(() => { setisLoading(false) }, 300);
    axios
      .get(`${process.env.REACT_APP_API_URL}album-details/${AlbumID}`)
      .then(({ data }) => {
        // setisLoading(false)
        // setVideoDetails(data.data)
        setAlbum(data.data.album)
        setImageList(data.data.album.photos)


        // setVideoSlug(data.data[0].Slug)
        setTimeout(function () {
          lazyloaded = false
          ForLazyLoaderImg(lazyloaded)
        }, 1000);
      })
    axios
      .get(`${process.env.REACT_APP_API_URL}latest-album-list-details/${AlbumID}/4`)
      .then(({ data }) => {
        setVideosList(data.albums);
      })
  }, [vdoSlug, AlbumID])

  // if (!localStorage.getItem('VideoView_' + vdoID)) {
  //     localStorage.setItem('VideoView_' + vdoID, 1);
  //     axios
  //         .get(`${process.env.REACT_APP_API_URL}video-hit-count/${vdoID}`)
  //         .then(({ data }) => {
  //         })
  // }//vidio hit
  return (
    <>
      {album ?
        <main>

          <>
            <div className="DTitle">
              <Link to="/photo" onClick={scrollTop}>
                <div className="DTitleInner"><h1 className="DTitleInnerBar">Photo Gallery</h1></div>
              </Link>
              <DocumentTitle title={album.TitleEn} />
            </div>
            <div className="container">
              <div className="DVideoDetailsArea mb-5 mt-4">
                <div className="row">
                  <div className="col-lg-9 col-12 border-right-inner">
                    <h1 className="Title BGTitle fw-bold my-2" style={{ fontSize: '26px', lineHeight: '38px' }}>
                      {album.TitleEn}
                    </h1>
                    <div className="mt-4 mb-2 d-contents d-sm-flex justify-content-between align-items-center">
                      <p className="VideoPublishDate mt-2"> <span>Created Date:</span> {album.created_at ? (formatTimestamp(album.created_at)) : ""} </p>
                      <DSocialShare title={album.TitleEn} contentID={album.AlbumID} />
                    </div>

                    <div className="DTopImg">
                      <div className="Details">
                        {ImageList.map((img) => {
                          return (
                            <div className="mb-4" key={img.ImagePath}>
                              <picture>
                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + img.ImagePath} alt={album.TitleEn} title={album.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />
                              </picture>
                              <div className="DetailsTopCap">
                                <p className="DTopImgCaption">{img.CaptionEn}</p>
                              </div>
                            </div>
                          )
                        }
                        )}
                      </div>


                    </div>

                    {album.Remarks &&
                      <div className="Brief"><p dangerouslySetInnerHTML={{ __html: album.Remarks }} /></div>
                    }
                  </div>

                </div>

              </div>


              <div className="DVideoCatListTop4 mb-5">
                <div className="CategoryPageTitleTop">
                  <h2 className="MoreTitle">

                    <span className="ColorBox"></span>
                    <span>More news</span>

                  </h2>
                </div>
                <div className="DCatTop4">
                  <div className="row">
                    {videosList.map((nc) => {
                      return (
                        <div className="col-lg-3 col-12 d-flex" key={nc.AlbumID} >
                          <div className="DCatTop3tList" >
                            <Link to={"/photo/" + nc.AlbumID} onClick={scrollTop}>
                              <div className="row">
                                <div className="col-lg-12 col-sm-4 col-5">
                                  <div className="">
                                    {nc.thumbnail == null ?
                                      <picture>
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                      </picture> :
                                      <picture>
                                        <img src={process.env.REACT_APP_IMG_Path + nc.thumbnail} alt={nc.TitleEn} title={nc.TitleEn} style={{width: "100%", height:"auto"}} className="img-fluid img100" />

                                      </picture>}

                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><i className="fa-solid fa-play"></i> </div>}
                                  </div>
                                </div>
                                <div className="col-lg-12 col-sm-8 col-7">
                                  <div className="Desc">
                                    <h3 className="Title">{nc.TitleEn}</h3>
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
              </div>
            </div>
          </>


        </main>
        : <ErrorPageEn />}
    </>
  )
}
