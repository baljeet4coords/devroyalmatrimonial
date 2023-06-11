import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId, selectAuthSuccess } from "../ducks/auth/selectors";
import { useRouter } from "next/router";
// import LandingSkeleton from "../pages/LandingPage/LandingSkeleton";
import LandingPage from "../pages/LandingPage/LandingPage";
import PrivacyModal from "../components/PrivacyModal/PrivacyModal";
import axios from "axios";

type ProtectedRoutingHOCProps = {
  // Props for the component being wrapped
};

interface PrivacyState {
  showPhoto: string;
  showContact: string;
  showName: string;
}

const ProtectedRouting = <P extends ProtectedRoutingHOCProps>(
  WrappedComponent: FunctionComponent<P>
): FunctionComponent<P> => {
  const RouterHOC: FunctionComponent<P> = (props) => {
    const router = useRouter();
    const authSuccess = useSelector(selectAuthSuccess);
    const authToken = authSuccess?.token;

    // to get privacyState bydefault 
    const persist = useSelector(selectAuthSuccess)

    // console.log(,'>>>');
    
    // const persistAuth = localStorage.getItem('persist:auth');
    // const parsedPersistAuth = persistAuth && JSON.parse(persistAuth);
    // const parsedPersistAuthResponse = parsedPersistAuth && JSON.parse(parsedPersistAuth?.response)
    // const parsedPersistAuthResponseJsonResponse = parsedPersistAuthResponse && parsedPersistAuthResponse?.jsonResponse;

    const [privacyModal, setPrivacyModal] = useState(true);

    const handleClose = () => {
      setPrivacyModal(false);
    };

    useEffect(() => {
      if (!authToken) {
        router.push("/");
      }
    }, [authToken, router]);

    if (!authToken) {
      return <LandingPage />;
    }

    return (
      <>
        {persist?.jsonResponse?.privacy_show_photo === null && privacyModal &&
          <PrivacyModal
            privacy={privacyModal}
            handleClose={handleClose}
            privacyset={setPrivacyModal}
            nullesVal={true}
          />
        }
        <WrappedComponent {...props} />
      </>
    )

  };

  return RouterHOC;
};

export default ProtectedRouting;
