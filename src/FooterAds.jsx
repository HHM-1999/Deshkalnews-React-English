import React, { useState } from "react";

const FooterAd = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeAd = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div style={styles.footerAd} className="d-print-none">
          <div style={styles.adContent}>
            <img src="/media/Advertisement/Advertisement(970X90).png"  alt="" title="" className="AdsHide"></img>
            <img src="/media/Advertisement/advertisement-320x100.png"  alt="" title="" className="mbAds"></img>
            <button onClick={closeAd} style={styles.closeButton} className="adsbtn">
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Inline styles for simplicity
const styles = {
  footerAd: {
    position: "fixed",
    bottom: "40px",
    left: 0,
    width: "100%",
    backgroundColor: "#f0f0f0",
    color: "#555",
    textAlign: "center",
    display:"flex",
    justifyContent:"center",
    // padding: "10px 20px",
    borderTop: "none",
    zIndex: 100,
    // boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
  },
  // adContent: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   maxWidth: "1200px",
  //   margin: "0 auto",
  // },
  closeButton: {
    background: "#ddd",
    border: "none",
    fontSize: "17px",
    color: "#333",
    cursor: "pointer",
    // marginLeft: "10px",
    position:"absolute",
    top:"-25px",
    padding:"0 10px",
    left: "auto",
    right:"0"
  },
};

export default FooterAd;
