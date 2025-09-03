import React, { useState, useEffect } from "react";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";

export default function DSocialShare({ title, contentID }) {
    const [pageURL, setPageURL] = useState(0);
    useEffect(() => {
        let urlArr = (window.location.href).split('/')
        urlArr[urlArr.length - 1] = contentID
        let url = urlArr.join("/")
        setPageURL(url);
    }, [contentID])
    return (
        <div className="DSocialTop mt-2">
            {/* social media button end */}
            <FacebookShareButton url={pageURL} title={title}>
                <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton url={pageURL}>
                <LinkedinIcon size={30} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton url={pageURL}>
                <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
            <EmailShareButton url={pageURL} body="mailto:support@example.com">
                <EmailIcon size={30} round={true} />
            </EmailShareButton>
            <WhatsappShareButton url={pageURL}>
                <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
            {/* social media button end */}
        </div>
    )
}
