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
    const userId = useSelector(getUserId);

    // to get privacyState bydefault 
    const persistAuth = localStorage.getItem('persist:auth');
    const parsedPersistAuth = persistAuth && JSON.parse(persistAuth);
    const parsedPersistAuthResponse = parsedPersistAuth && JSON.parse(parsedPersistAuth?.response)
    const parsedPersistAuthResponseJsonResponse = parsedPersistAuthResponse && parsedPersistAuthResponse?.jsonResponse;
    const [privacyModal, setPrivacyModal] = useState(true);
    const [privacyModalLoading, setPrivacyModalLoading] = useState(false);

    const [privacyState, setPrivacyState] = useState({
      showPhoto: parsedPersistAuthResponseJsonResponse?.privacy_show_photo === null || "P" ? "P" : "I",
      showContact: parsedPersistAuthResponseJsonResponse?.privacy_show_contact === null || "P" ? "P" : "I",
      showName: parsedPersistAuthResponseJsonResponse?.privacy_show_name === null || "P" ? "P" : "I",
    })

    const [privacyStateTemp, setPrivacyStateTemp] = useState({
      showPhoto: parsedPersistAuthResponseJsonResponse?.privacy_show_photo === null || "P" ? "P" : "I",
      showContact: parsedPersistAuthResponseJsonResponse?.privacy_show_contact === null || "P" ? "P" : "I",
      showName: parsedPersistAuthResponseJsonResponse?.privacy_show_name === null || "P" ? "P" : "I",
    })

    const handleSwitchToggle = (switchValue: keyof typeof privacyState) => {
      const updatedState = { ...privacyState };
      updatedState[switchValue] = updatedState[switchValue] === 'P' ? 'I' : 'P';
      setPrivacyState(updatedState);
    };

    const handleClose = () => {
      setPrivacyModal(false);
      setPrivacyState(privacyStateTemp);
    };


    const handlePrivacySave = async (val: PrivacyState) => {
      setPrivacyModalLoading(true);

      const privacyUpdate = await axios.post(`${process.env.NEXT_PUBLIC_URL}/privacy/updatePrivacy`,
        { ...privacyState, userId })
      console.log(privacyUpdate);

      privacyUpdate?.data?.output === 1 && (setPrivacyModal(false), setPrivacyModalLoading(false));

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
        {parsedPersistAuthResponseJsonResponse?.privacy_show_photo === null &&
          <PrivacyModal
            privacy={privacyModal}
            selectedSwitches={privacyState}
            handleSwitchChange={handleSwitchToggle}
            handlePrivacySave={handlePrivacySave}
            handleClose={handleClose}
            privacyModalLoading={privacyModalLoading}
          />
        }
        <WrappedComponent {...props} />
      </>
    )

  };

  return RouterHOC;
};

export default ProtectedRouting;
