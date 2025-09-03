import React, { useState, useEffect } from "react";
export default function DfbComment({ contentID }) {
    const [pageURL, setPageURL] = useState(0);
    useEffect(() => {
        let urlArr = (window.location.href).split('/')
        urlArr[urlArr.length - 1] = contentID
        let url = urlArr.join("/")
        setPageURL(url);
    }, [contentID])
    return (
        <>
            <div className="row MarginTop20 d-print-none">
                <div className="col-sm-12">
                    <div className="CommentBg">
                        <div className="fb-comments" data-href={pageURL} data-width="" data-numposts="3"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
