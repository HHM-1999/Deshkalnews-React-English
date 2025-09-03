import React from 'react'
import { TiPencil } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { scrollTop } from '../AllFunctions';

export default function DWriters({ writer,news }) {
    // console.log(writer);
    var SpWriter = writer.map((nd)=>{return nd.WriterName});
    // console.log(news);
    var slug = (writer).map(function (nd) { return nd.Slug; });
    // const SpWriter = SpecialWriterList[0].WriterName
    // const WriterSlug= SpecialWriterList[0].


    return (

        <>
            {writer.length !== 0 ?
                <div className="WritterName mb-1">
                    {SpWriter && SpWriter === null ?
                        <p> <TiPencil />
                            {news.writersName}</p> :
                        <p>
                            <Link to={"/english/writers/" + slug} onClick={scrollTop}>
                            <TiPencil />
                                {SpWriter}
                            </Link>
                        </p>}
                </div>
                :
                <div className="WritterName mt-2"><p><i className="fa-solid fa-pen"></i> {news.WriterName}</p></div>
            }
        </>
    )
}
