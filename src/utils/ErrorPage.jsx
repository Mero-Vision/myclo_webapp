import React from "react";
import Error from "../assets/error/error.png";

const ErrorPage = ({ error }) => {
   return (
      <div style={styles.errorContainer}>
         <div style={styles.errorContent}>
            <div style={styles.errorIllustration}>
               {/* Replace the URL with your own SVG illustration */}
               <img
                  src={Error}
                  alt="Error Illustration"
                  style={styles.errorIllustrationImg}
               />
            </div>
            {/* <div style={styles.errorCode}>Oops!</div>
            <div style={styles.errorMessage}>An error occured.</div> */}
            <p style={styles.errorDescription}>
               {error && error.toString()}
            </p>
            <a href="/" style={styles.backHomeLink}>
               Home
            </a>
         </div>
      </div>
   );
};

const styles = {
   errorContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
   },
   errorContent: {
      textAlign: "center",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      width: "1000px", // Set the desired maximum width
      // width: "100%",
   },
   errorIllustration: {
      marginBottom: "20px",
   },
   errorIllustrationImg: {
      maxWidth: "500px",
      height: "auto",
   },
   errorCode: {
      fontSize: "65px",
      color: "#F10056",
   },
   errorMessage: {
      fontSize: "18px",
      margin: "10px 0",
      color: "#555",
   },
   errorDescription: {
      fontSize: "14px",
      color: "#777",
      margin: "10px 0",
   },
   backHomeLink: {
      display: "inline-block",
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#26ABE2",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
   },
};

export default ErrorPage;
