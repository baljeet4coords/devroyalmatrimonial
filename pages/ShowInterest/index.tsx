import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import ProfileCard from "../../components/ProfileCard";
import classes from "./ShowInterest.module.scss";
import { Footer, LoginHeader } from "../../components";
import ShortVisitorProfile from "../../components/ShortVisitorProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { shortListReq } from "../../ducks/userShortList/actions";
import { useDispatch } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";
import { useSelector } from "react-redux";
import { selectshortListSuccess } from "../../ducks/userShortList/selectors";
import { ICardViewResponse } from "../../types/short-Block-Interest";
import { blockListReq } from "../../ducks/userBlocklist/actions";
import { selectblockListSuccess } from "../../ducks/userBlocklist/selectors";
import { read } from "fs";

const ShortlistedProfile: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const shortlistSuccessResponse = useSelector(selectshortListSuccess)
  const blocklistSuccessResponse = useSelector(selectblockListSuccess)
  const [shortListedUser, setShortListedUser] = useState<ICardViewResponse[] | null>(shortlistSuccessResponse ? shortlistSuccessResponse?.shortlistCard.jsonResponse : []);

  const [Shortlisted_Id, setShortlisted_Id] = useState<number[]>(shortlistSuccessResponse ? shortlistSuccessResponse?.shotlistedID?.jsonResponse : []);
  const [sendInterest, setSendInterest] = useState<number[]>([]);
  const [blockList, setBlockList] = useState(blocklistSuccessResponse?.blocklistedID.jsonResponse != null ? blocklistSuccessResponse?.blocklistedID.jsonResponse : []);
  const [block, setBlock] = useState<number[]>([]);
  const [interest, setInterest] = useState<number>(1);

  const DataOnclick = (searchtype: number) => {
    return setInterest(searchtype);
  };


  useEffect(() => {
    if (shortlistSuccessResponse) {
      setShortListedUser(shortlistSuccessResponse?.shortlistCard.jsonResponse);
      setShortlisted_Id(shortlistSuccessResponse?.shotlistedID?.jsonResponse)
    }
    if (blocklistSuccessResponse) {
      setBlockList(blocklistSuccessResponse?.blocklistedID.jsonResponse != null ? blocklistSuccessResponse?.blocklistedID.jsonResponse : [])
    }
  }, [shortlistSuccessResponse, blocklistSuccessResponse])

  useEffect(() => {
    dispatch(shortListReq({
      userId: userId ? userId : -1,
    }));
    dispatch(blockListReq({
      userId: userId ? userId : -1,
    }))
  }, [userId, dispatch,])


  const Components = [
    {
      Component: <ShortVisitorProfile title="0 Sent Interest " subtitle="People you Send Interest will appear here" />,
      key: 1,
    },
    {
      Component: <ShortVisitorProfile title="0 Cancel Interest " subtitle="People you Cancel Interest will appear here" image="https://cdni.iconscout.com/illustration/premium/thumb/cancel-7851800-6267628.png?f=avif" />,
      key: 2,
    },
    {
      Component: <ShortVisitorProfile title="0 Interst Recive " subtitle="People Who Sent you Interest will appear here" />,
      key: 3,
    },
    {
      Component: <ShortVisitorProfile title="0 Interest Accepted " subtitle="Interest that you Accept will appear here" />,
      key: 4,
    },
    {
      Component: <ShortVisitorProfile title="0 Interest Decline" subtitle="People you Reject Interest will appear here" />,
      key: 5,
    }
  ]

  const buttons = [
    {
      title: 'Send Interest',
      key: 1
    },
    {
      title: ' Cancel Interest',
      key: 2
    },
    {
      title: ' Receive Interest',
      key: 3
    },
    {
      title: 'Accepted Interest',
      key: 4
    },
    {
      title: 'Decline Interest',
      key: 5
    }
  ]


  return (
    <React.Fragment>
      <div className={classes.bg}>
        <Container fluid className={classes.background_header}>
          <LoginHeader />
        </Container>

        <div className={`${classes.search_main}`}>
          <Row className={`${classes.tabSection} row`}>
            {buttons.map((button) => {
              return <>
                <button onClick={() => DataOnclick(button.key)} className={`${classes.TabButton} ${interest === button.key && classes.TabButtonActive} `}>
                  {button.title}
                </button>
              </>
            })

            }
            {/* <button onClick={() => DataOnclick('cancelinterest')} className={`${classes.TabButton} ${interest === 'cancelinterest' && classes.TabButtonActive} `}>
              Cancel Interest
            </button>
            <button onClick={() => DataOnclick('reciveinterest')} className={`${classes.TabButton} ${interest === 'reciveinterest' && classes.TabButtonActive} `}>
              Receive Interest
            </button>
            <button onClick={() => DataOnclick('acceptedinterest')} className={`${classes.TabButton} ${interest === 'acceptedinterest' && classes.TabButtonActive} `}>
              Accepted Interest
            </button>
            <button onClick={() => DataOnclick('declineinterest')} className={`${classes.TabButton} ${interest === 'declineinterest' && classes.TabButtonActive} `}>
              Decline Interest
            </button> */}
          </Row>
        </div>

        {/* {
          interest === 'sendinterest' ?
            <ShortVisitorProfile
              title={"0 Sent Interest "}
              subtitle={"People you Send Interest will appear here"}
            />
            :
            <ShortVisitorProfile
              title={"0 Interst Recive "}
              subtitle={"People Who Sent you Interest will appear here"}
            />
        } */}

        {
          Components.map((component)=>{
            if(component.key === interest){
              return component.Component
            }
          })
        }



        


        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShortlistedProfile;
