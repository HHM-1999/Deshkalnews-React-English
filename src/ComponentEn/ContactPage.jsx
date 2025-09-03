import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { scrollTop } from '../ComponentEn/AllFunctions'
import FBpagePlugin from './FBpagePlugin'



export default function ContactPage() {
    return (
        <div className='page-english'>
            <main>
                <div className="container mt-3">
                    <div className="TopHomeSection"></div>
                    <DocumentTitle title='DeshkalNews.com :: Contact' />
                    <div className="contact-area">  <div className="SectionTitle"><h1><Link to="/contact-us" onClick={scrollTop}><span className="ColorBox"></span>Contact</Link></h1></div></div>
                    <div className='row mt-5'>
                        <div className='col-lg-8 col-12 m-auto'>
                            <div className="contact-details">
                                <h2>Contact Us:</h2>
                                <ul>
                                    <li><a href="deshkalnews.com">deshkalnews.com</a></li>
                                    <li>E-mail: <a href="mailto:info@deshkalnews.com">info@deshkalnews.com</a></li>
                                    <li > <a href="tel:+880-2- 4106938-42">PABX : +880-2- 4106938-42</a></li>
                                    <li > <a href="tel:01339 517 386">Hotline : 01339 517 386</a></li>
                                </ul>
                                <ul>
                                    <li style={{ fontWeight: 600, color: "#212121" }}>Advertisement : 01712 200 400</li>
                                    <li><a href='mailto:nafis.imtiaz@deshkalnews.com'>nafis.imtiaz@deshkalnews.com</a></li>
                                </ul>
                            </div>
                            <div className="contact-details">
                                {/* <h2>Address:</h2> */}
                                <p><span>Address:</span> House - Paradise Maria, 11/8/D (2nd fl.) Free School Street <br /> Box Culvert Road, Panthapath, Dhaka-1205</p>
                                <p></p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <FBpagePlugin />

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
