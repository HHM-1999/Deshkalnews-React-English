import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function FooterMarquee() {
    const [breaking, setBreaking] = useState([]);
    const [scroll, setScroll] = useState([]);
    const [hasContent, setHasContent] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateActiveScroll.json`)
            .then(({ data }) => {
                setScroll(data);
                if (data.length > 0) {
                    setHasContent(true);
                } else {
                    axios
                        .get(`${process.env.REACT_APP_EN_API_URL}home-json-en/generateActiveBreaking.json`)
                        .then(({ data }) => {
                            setBreaking(data);
                            if (data.length > 0) {
                                setHasContent(true);
                            }
                        });
                }
            });
    }, []);

    if (!hasContent) {
        return null; // Hide the entire segment if no content is available
    }

    return (
        <div className="container-fluid">
            {scroll.length > 0 ? (
                <div className="DScroll d-print-none">
                    <div className="DScrollSection">
                        <div className="ScrollHeading d-flex justify-content-center">
                            <p>Latest News ::</p>
                        </div>
                        <div className="ScrollSubject">
                            <Marquee delay='0' speed='60' direction="left" pauseOnHover={true} play={true}>
                                {scroll.map((nd) => (
                                    <div key={nd.ScrollID}>
                                        <a href={nd.ScrollUrl || ''}>
                                            <span>
                                                <div className="SquareIcon"></div> {nd.ScrollHead}
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </div>
            ) : breaking.length > 0 ? (
                <div className="DScroll d-print-none">
                    <div className="DScrollSection">
                        <div className="ScrollHeading d-flex justify-content-center">
                            <p>Breaking News ::</p>
                        </div>
                        <div className="ScrollSubject">
                            <Marquee delay='0' speed='70' direction="left" pauseOnHover={true} play={true}>
                                {breaking.map((nd) => (
                                    <a key={nd.ScrollID} href={nd.ScrollUrl || ''}>
                                        <span>
                                            <div className="SquareIcon"></div> {nd.BreakingHead}
                                        </span>
                                    </a>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}