import DemoCarousel from "../../components/Carousel/DemoCarousel";
import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BrowserLink from "../../components/BrowserLink/BrowserLinks";
import { NextPage } from "next";
import { Header, Footer, HomeImage, HomeForm } from "../../components";
import { useRouter } from "next/router";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import classes from "./BrowseProfile.module.scss";
import Link from "next/link";
import ImageCard from "../../components/ImageCard/ImageCard";
// import { BrowseInfo } from "../../../types/BrowseInfo"
import { AiOutlineDoubleRight } from "react-icons/ai";



const BrowseProfile: NextPage = () => {
  const router = useRouter();
  const [key, setKey] = useState('Brides');
  
  
  const headimage = "browseProfile.jpg";
  
  const { BrowseProfile } = router.query;
 
  // const productData: BrowseInfo[] = [
  //   {
  //     id: 1,
  //     title: "YWAX0343",
  //     uri: "/images/jeansProduct.jpg",
  //     desc: "32 Years, 5' 4 | Hindu / Tamil | Senai Thalaivar | Shanmuga(Gotra)| B.E/B.Tech| No Income| Student| Chennai/ Madras",
  //   },
  //   {
  //     id: 2,
  //     title: "ZSZV0643",
  //     uri: "/images/jeansProduct.jpg",
  //     desc: "33 Years, 5' 3 | Hindu / Hindi-Delhi | Bania| kashyap(Gotra)| MBA/PGDM| Rs. 15 - 20 Lakh| Operations Management| Chennai/ Madras"
  //   },
  //   {
  //     id: 3,
  //     title: "ZVUY0391",
  //     uri: "/images/jeansProduct.jpg",
  //     desc: "28 Years, 5' 5 | Jain / Hindi-Rajasthan | Shwetamber | CA| No Income, Accounting Professional | Chennai/ Madras"
  //   },
  //   {
  //     id: 4,
  //     title: "XWXT5207",
  //     uri: "/images/jeansProduct.jpg",
  //     desc: "33 Years, 5' 7 | Hindu / Hindi-Delhi | Brahmin| B.A| Rs. 7.5 - 10 Lakh| Marketing Professional| Bangalore"
  //   },
  // ];

  return (
   <React.Fragment>
    <div style={{background: '#e7e6e6'}}>
    <Header /> 
    <HomeImage addBackground={headimage} />
    <Container className={`${classes.Home_Page_Wrapper} px-0`}>
    <Row className={`${classes.firstTopBox} pb-4`}>
            <Col sm={12} md={6} className="d-flex align-items-end">
            <div className={classes.Home_heading}>
                <h1>Now, chat for free!</h1>
                <span>Finding your perfect match just became easier</span>
            </div>
      </Col>
      <Col sm={12} md={6}>
      <HomeForm/>
      </Col> 
      <Row className={classes.Browse_colord_body}>
                <Col sm={12} md={4}>
                        <div className="py-3 d-flex justify-content-start">
                        <Image 
                        src="/Images/group_pic.png" 
                        alt="group_pice"
                        />
                        <div>
                        <h3>100% Manually Screened Profiles</h3>
                        <p>Search by location, community, profession & more from lakhs of active profiles</p>
                        </div>
                        </div>
                    </Col>
              <Col sm={12} md={4}>
                        <div className="py-3 d-flex justify-content-start">
                        <Image 
                        src="/Images/group_pic.png" 
                        alt="group_pice"
                        />
                        <div>
                        <h3>100% Manually Screened Profiles</h3>
                        <p>Search by location, community, profession & more from lakhs of active profiles</p>
                        </div>
                        </div>
                    </Col>
              <Col sm={12} md={4}>
                        <div className="py-3 d-flex justify-content-start">
                        <Image 
                        src="/Images/group_pic.png" 
                        alt="group_pice"
                        />
                        <div>
                        <h3>100% Manually Screened Profiles</h3>
                        <p>Search by location, community, profession & more from lakhs of active profiles</p>
                        </div>
                        </div>
                    </Col>
        </Row>
    </Row>
        <Row className={`text-center ${classes.Home_white_body}`}>
            <h1>{BrowseProfile} <strong>Matrimonial</strong></h1>
        </Row>
        <div className={classes.breadCrum}>
              <p>
                <Link href="/" legacyBehavior>
                  <a>Home</a>
                </Link>{" "}
                <AiOutlineDoubleRight className="mx-2"/>
              </p>
              <p>{BrowseProfile}</p>
            </div>
         <Row>
           <Col sm={12} md={10} className="pb-5">
           
            <Tabs
              activeKey={key}
              onSelect={(k:any) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="Brides" title={`${BrowseProfile} Brides`}>
                <Row>
                <ImageCard onProfile={BrowseProfile} />
                </Row>
              </Tab>
              <Tab eventKey="Grooms" title={`${BrowseProfile} Grooms`}>
                <Row>
                <ImageCard onProfile={BrowseProfile} />
                </Row>
              </Tab>
            </Tabs>

            </Col>
            <Col sm={12} md={2}>
              <h3>Filter profiles by</h3>
              <span className="mt-5 d-block">Gender</span>
              <div className={classes.button}>
                <Button>{`${BrowseProfile} Brides`}</Button>
                <Button>{`${BrowseProfile} Grooms`}</Button>
              </div>
              <span className="mt-5 d-block">Religion</span>
              <div className={classes.button}>
                <Button>{`${BrowseProfile} Muslim Matrimonial`}</Button>
                <Button>{`${BrowseProfile} Hindu Matrimonial`}</Button>
              </div>
              <span className="mt-5 d-block">Mother Tongue</span>
              <div className={classes.button}>
                <Button>{`${BrowseProfile} Bengali Matrimonial`}</Button>
                <Button>{`${BrowseProfile} Rajasthani Matrimonial`}</Button>
                <Button>{`${BrowseProfile} Bihari Matrimonial `}</Button>
                <Button>{`${BrowseProfile} Malayalee Matrimonial  `}</Button>
              </div>
            </Col>
          </Row>
          <Row className={classes.Home_dark_body}>
            <span>LAKHS OF HAPPY COUPLES</span>
            <h1>Matched by <strong>Jeevansathi</strong></h1>
            <DemoCarousel />
            </Row>
            <Row className={`${classes.Home_white_body} text-center`}>
            <span>BROWSE</span>
            <h1><strong>Matrimonial</strong>Profiles by</h1>
            <BrowserLink/>
            </Row>
    </Container>
    <Footer/>
    </div>
   </React.Fragment>
  );
};

export default BrowseProfile;
