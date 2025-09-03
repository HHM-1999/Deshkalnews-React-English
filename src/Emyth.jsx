import './EMythMakers.css';
import './SolaimanLipi.css';
import "lightgallery.js/dist/css/lightgallery.css";
import RouterLink from './RouterLink';
import { useEffect } from 'react';
import { scrollTop } from './ComponentEn/AllFunctions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
var scrollBtn

function Emyth() {
  useEffect(() => {
    window.addEventListener('scroll', scrollToTopBtn);
    scrollBtn = document.querySelector("#back_to_top");
  }, [])

  function scrollToTopBtn() {
    if (window.scrollY > 150) {
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.visibility = "hidden";
    }
  }

  return (
    <>
      <div id="back_to_top" onClick={scrollTop} className="back_to_top on d-print-none"><span className="go_up"><i className="fa-solid fa-arrow-up"></i></span></div>
      <RouterLink />
    </>
  );
}

export default Emyth;
