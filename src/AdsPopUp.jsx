import React, { useState, useEffect } from "react";
import Ads from './assets/media/Advertisement/advertisement-660x480.png'

const AdsPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup when the component mounts
    setIsVisible(true);

    // Optional: Automatically close the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };
  // onClick={closePopup} 

  return (
    <>
      {isVisible && (
      <div style={styles.overlay}>
        <div style={styles.popup} className="pt-4">
          <img src={Ads} alt="DeshKalNews" title="DeshKalNews" className="AdsHide"></img>
          <img src="/media/Advertisement/advertisement-320x480.png"  alt="" title="" className="mbAds"></img>
          <button onClick={closePopup}  style={styles.closeButton}>
            X
          </button>
        </div>
      </div>
  )} 
    </>
  );
};

// Inline styles for simplicity
const styles = {
  overlay: {
    position: "fixed",
    top: "0px",
    left: 0,
    right:0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    marginTop: "50px",
    backgroundColor:"transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "35px"
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    
  },
  closeButton: {
    padding: "0px 10px",
    backgroundColor: "#555",
    color: " #fff",
    border: "medium",
    borderRadius: "5px",
    cursor: "pointer",
    bottom: "0",
    position: "relative",
    top: "-215px",
    fontsize: "20px",
    left: "-40px",
   
  },
};

export default AdsPopUp;
