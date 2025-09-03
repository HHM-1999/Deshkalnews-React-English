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

    // var addScript = document.createElement("script");
    // addScript.setAttribute(
    //   "src",
    //   "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    // );
    // document.body.appendChild(addScript);
    // window.googleTranslateElementInit = googleTranslateElementInit;
  }, [])

  function scrollToTopBtn() {
    if (window.scrollY > 150) {
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.visibility = "hidden";
    }
  }

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "bn",
  //       includedLanguages: 'en,bn',
  //       autoDisplay: false,
  //       layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
  //     },
  //     "google_translate_element"
  //   );
  // };

  // function closeText() {
  //   document.querySelector(".Gtranslate").style.display = "none"
  // }
  return (
    <>
      {/* <div className="Gtranslate">
        <div id="text">
          ভাষা পরিবর্তন করতে চান?
          <div className="translate"><div id="google_translate_element" /></div>
        </div>
        <div id="closeText" onClick={closeText}>বন্ধ করুন</div>
      </div> */}
      <div id="back_to_top" onClick={scrollTop} className="back_to_top on d-print-none"><span className="go_up"><i className="fa-solid fa-arrow-up"></i></span></div>
      <RouterLink />
    </>
  );
}

export default Emyth;
