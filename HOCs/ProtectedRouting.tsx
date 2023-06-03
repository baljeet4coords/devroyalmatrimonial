import React, { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthSuccess } from "../ducks/auth/selectors";
import { useRouter } from "next/router";

type SetterDrawerHOCProps = {
  // Props for the component being wrapped
};

const ProtectedRouting = <P extends SetterDrawerHOCProps>(
  WrappedComponent: FunctionComponent<P>
): FunctionComponent<P> => {
  const HeaderDrawerHOC: FunctionComponent<P> = (props) => {
    const router = useRouter();
    const authSuccess = useSelector(selectAuthSuccess);
    const authToken = authSuccess?.token;

    useEffect(() => {
      !authToken && router.push("/");
    }, [authToken]);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };

  return HeaderDrawerHOC;
};

export default ProtectedRouting;
