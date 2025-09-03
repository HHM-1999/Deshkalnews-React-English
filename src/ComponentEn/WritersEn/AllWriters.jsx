import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link, useParams } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'

export default function AllWriters() {
    let { all_writers } = useParams();
    const [allWriter, setAllWriter] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}writers`)
            .then(({ data }) => {
                setAllWriter(data.writers);
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [all_writers])

    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title='DeskKalNews.com :: All Writers' />
                <h1 className="DTitle">
                    <Link to={'/'} onClick={scrollTop}>
                        <span className="DTitleInner"><span className="DTitleInnerBar"><span>All Writers</span></span></span>
                    </Link>
                </h1>
                <div className="DTagListArea mb-5">
                    <ul className="row">
                        {allWriter.map((nc) => {
                            return (
                                <li className="col-lg-4 col-sm-6 col-12" key={nc.WriterID}>
                                    <div className="DTagListItem">
                                        <Link to={"/writers/" + nc.Slug}>
                                            <div className="Desc">
                                                {nc.WriterNameEn ?
                                                    <h2 className="Title">{nc.WriterName} || <span>{nc.WriterNameEn}</span></h2> :
                                                    <h2 className="Title">{nc.WriterName}</h2>}

                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}
