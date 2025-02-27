import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../../utils/IsLoggedIn";

const Protected = ({ children }) => {
   console.log("User is logged in:", isLoggedIn()); // Log the login status

   if (isLoggedIn()) {
      return children;
   }
   return <Navigate to="/" replace />;
};

export default Protected;

Protected.propTypes = {
   children: PropTypes.element,
};
