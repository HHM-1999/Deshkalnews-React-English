import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
};

export default function Events() {
    const [eventData, setEventData] = useState(null);
    const [eventId, seteventId] = useState(null);
    const [list1, setList1] = useState(null);
    const [news3, setNews3] = useState([]);
    const [news4, setNews4] = useState([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0]?.setAttribute('href', window.location.href);

        const reloadInterval = setTimeout(() => {
            window.location.reload(true);
        }, 300000); // 5 minutes

        axios.get(`${process.env.REACT_APP_EN_API_URL}latest-event`)
            .then(({ data }) => {
                const event = data.event?.[0];
                if (!event) return;

                setEventData(event);
                const id = event.EventID;
                seteventId(id); // Optional if needed elsewhere

                console.log('Event Data:', id);

                const eventUrl = `${process.env.REACT_APP_EN_API_URL}home-json-en/generateEvent${id}.json`;

                axios.get(eventUrl).then(({ data }) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setList1(data[0]);
                        setNews3(data.slice(1, 5));
                        setNews4(data.slice(0, 5));

                        setTimeout(() => {
                            ForLazyLoaderImg(false);
                        }, 1000);
                    }
                });
            });

        return () => clearTimeout(reloadInterval);
    }, [isMobile]);

    if (!eventData) return null;

    const bannerSrc = isMobile
        ? eventData.EventBannerMobile || eventData.EventBanner
        : eventData.EventBanner || eventData.EventBannerMobile;

    return (
        <section>
            <div className="DSpeEvent mb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {bannerSrc ? (
                                <Link to={`/events/${eventData.Slug}`}>
                                    <div className="eventBanner">
                                        <img
                                            src={`${process.env.REACT_APP_DOMAIN_URL}media/english/event/${bannerSrc}`}
                                            alt={eventData.EventTitle}
                                            title={eventData.EventTitle}
                                            fetchpriority="high"
                                            className="img-fluid"
                                        />
                                    </div>
                                </Link>
                            ) : (
                                <div className="DSpeEventTitle">
                                    <h5>
                                        <Link to={`/events/${eventData.Slug}`}>{eventData.EventTitle}</Link>
                                    </h5>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row mt-3">
                        {/* Lead News */}
                        <div className="col-sm-12 mblblock">
                            {list1 && (
                                <div className="SportsLead">
                                    <a href={`/${list1.categorySlug}/${list1.ContentID}`} onClick={scrollTop}>
                                        <picture>
                                            <img
                                                src={list1.ImageBgPath
                                                    ? `${process.env.REACT_APP_IMG_Path}${list1.ImageBgPath}`
                                                    : process.env.REACT_APP_LAZYL_IMG}
                                                    fetchpriority="high"
                                                alt={list1.DetailsHeading}
                                                title={list1.DetailsHeading}
                                                className="img-fluid img100"
                                            />
                                        </picture>
                                        <div className="Desc">
                                            <h3 className="Heading">{list1.DetailsHeading}</h3>
                                            <p>{list1.ContentBrief}</p>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Secondary News */}
                        {news3.map((nc, i) => (
                            <div className="col-6 mblblock" key={i}>
                                <div className="DeventsSide">
                                    <a href={`/${nc.categorySlug}/${nc.ContentID}`} onClick={scrollTop}>
                                        <div className="DImageResize Imgresize">
                                            <picture className="FixingRatio">
                                                <img
                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                    data-src={`${process.env.REACT_APP_IMG_Path}${nc.ImageSmPath}`}
                                                    alt={nc.DetailsHeading}
                                                    title={nc.DetailsHeading}
                                                    fetchpriority="high"
                                                    className="img-fluid img100"
                                                />
                                            </picture>
                                        </div>
                                        <div className="Desc">
                                            <h3>{nc.DetailsHeading}</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Desktop News */}
                        {news4.map((nc, i) => (
                            <div className="col-lg-2 mblHide" key={i}>
                                <div className="DeventsSide">
                                    <a href={`/${nc.categorySlug}/${nc.ContentID}`} onClick={scrollTop}>
                                        <div className="DImageResize Imgresize">
                                            <picture className="FixingRatio">
                                                <img
                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                    data-src={`${process.env.REACT_APP_IMG_Path}${nc.ImageSmPath}`}
                                                    alt={nc.DetailsHeading}
                                                    title={nc.DetailsHeading}
                                                    fetchpriority="high"
                                                    className="img-fluid img100"
                                                />
                                            </picture>
                                        </div>
                                        <div className="Desc">
                                            <h3>{nc.DetailsHeading}</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
