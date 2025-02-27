import React from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true };
   }

   componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo });
      this?.setState({ error, errorInfo });
   }

   render() {
      if (this.state.hasError) {
         return <ErrorPage error={this.state.error} />;
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
