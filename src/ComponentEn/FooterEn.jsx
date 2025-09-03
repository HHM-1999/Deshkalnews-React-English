import FooterMarqueeEn from './FooterMarqueeEn'
// import Logo from '../assets/media/common/logo.jpg'
import Logo from "../assets/media/common/logo.png"
// import ePaper2 from '../assets/media/common/Document.jpg'
// import ePaper1 from '../assets/media/common/Document1.jpg'
import { Link } from 'react-router-dom';
import { scrollTop } from '../ComponentEn/AllFunctions';
import { FaXTwitter } from 'react-icons/fa6';

const FooterEn = () => {
    const years = new Date().getFullYear()
    return (
        <>
            <footer>
                <div className="DFooterBg d-print-none">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-12 d-flex align-items-center justify-content-start">
                                <div className="footer-info">
                                    <div className="footer-links">
                                        <div className="DSocialLink">
                                            <ul>
                                                <li><a href="https://www.facebook.com/DeshkalNews24/" target="_blank" aria-label="fb"><i className="fab fa-facebook-f"></i></a>
                                                </li>
                                                <li><a href="https://x.com/Deshkalnews" className='icon' target="_blank" aria-label="twitter"><FaXTwitter /></a></li>
                                                <li><a href="https://www.instagram.com/deshkalnews?igsh=MWJrcmRjdjkwbjRtdw== " target="_blank" aria-label="instragram"><i className="fab fa-instagram"></i></a></li>
                                                <li><a href="https://linkedin.com/company/deshkal-news" target="_blank"><i className="fab fa-linkedin" aria-label="linkedIn"></i></a></li>
                                                <li><a href="https://www.youtube.com/@DeshkalNews24" target="_blank"><i className="fab fa-youtube" aria-label="youTube"></i></a></li>
                                            </ul>
                                        </div>
                                        {/* <div className="more-cat">
                                            <a className="btn" href="#">Patriot</a>
                                            <a className="btn" href="#">Artificer</a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                                <div className="footerMiddle">
                                    <div className="footer-logo">
                                        <a href="/"> <img src={Logo} alt="DeshKalNews.com"
                                            title="DeshKalNews.com" />
                                        </a>
                                    </div>
                                    <ul className="footer-links">
                                        <li><a href="/about">ABOUT</a>
                                        </li>
                                        <li><a href="/contact-us">CONTACT</a>
                                        </li>
                                        <li><Link to="/archives" onClick={scrollTop}>ARCHIVE</Link>
                                        </li>
                                        <li><a href="/terms-conditions">TERMS</a>
                                        </li>
                                        <li><a href="/privacy-policy">POLICY</a>
                                        </li>
                                        <li><a href="/advertise">ADVERTISEMENT</a>
                                        </li>
                                    </ul>
                                    <div className="others">
                                        <p>Editor and Publisher : Eliash Uddin Palash
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-12 d-flex justify-content-end gx-4">
                                <div className="DFooterEpprLink">
                                    <a href="https://epaper.shampratikdeshkal.com/" target="blank" aria-label="" >
                                        <img className="img-fluid img100" src={process.env.REACT_APP_FOOTER_E_PAPER_IMG} alt="shampratikdeshkal.com"
                                            title="shampratikdeshkal.com" />
                                        <p>e-paper</p>
                                    </a>
                                </div>
                                <div className="DFooterEpprLink">
                                    <a href="https://www.deshkalpotrika.com/" target="blank" aria-label="" >
                                        <img className="img-fluid img100" src={process.env.REACT_APP_FOOTER_POTRIKA_IMG} alt="deshkalpotrika.com"
                                            title="deshkalpotrika.com" />
                                        <p>Deshkal Potrika</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="DFooterBottomBg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                {/* <p>© ২০২৪ | <a href="#">DeshKal News</a> A Radiant Publications Limited Concern. All Rights
                        Reserved| Developed by<a href="https://www.emythmakers.com" target="_blank"> eMythMakers.com</a>

                    </p> */}
                                <p>&copy; {(years)} | <a href="#">DeshKal News </a> A Radiant Publications Limited Concern. All Rights
                                    Reserved | Developed by <a href="https://www.emythmakers.com/" target="_blank">eMythMakers.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <FooterMarqueeEn />
        </>
    );
};

export default FooterEn;
