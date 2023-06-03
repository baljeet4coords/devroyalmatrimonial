import React, { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthSuccess } from "../ducks/auth/selectors";
import { useRouter } from "next/router";
// import LandingSkeleton from "../pages/LandingPage/LandingSkeleton";
import LandingPage from "../pages/LandingPage/LandingPage";

type ProtectedRoutingHOCProps = {
  // Props for the component being wrapped
};

const ProtectedRouting = <P extends ProtectedRoutingHOCProps>(
  WrappedComponent: FunctionComponent<P>
): FunctionComponent<P> => {
  const RouterHOC: FunctionComponent<P> = (props) => {
    const router = useRouter();
    const authSuccess = useSelector(selectAuthSuccess);
    const authToken = authSuccess?.token;

    useEffect(() => {
      if (!authToken) {
        router.push("/");
      }
    }, [authToken, router]);

    if (!authToken) {
      return <LandingPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return RouterHOC;
};

export default ProtectedRouting;
