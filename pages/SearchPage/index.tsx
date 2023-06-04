import classes from "./Search.module.scss";
import { Container } from "react-bootstrap";
import { Footer, LoginHeader } from "../../components/";
import React, { useState } from "react";

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState<string>("searchByData");

  // const DataOnclick = (searchtype: string) => {
  //   setSearchData(searchtype);
  // };
  return (
    <>
      <div className={classes.bg}>
        <Container fluid className={classes.background_banner}>
          <LoginHeader />
        </Container>
        <h1 className="text-center text-danger py-5 my-5">
          This Feature Is Coming Soon!
        </h1>
        {/* <div className={`${classes.bg_gray} w-100 pb-5`}>
        <Container className={`${classes.search_main} w-75`}>
          <Row>
            <Col sm={6} className="px-0">
              <div
                className={
                  searchData == "searchByData"
                    ? classes.activeSearchType
                    : classes.search_box
                }
                onClick={() => DataOnclick("searchByData")}
              >
                Search
              </div>
            </Col>
            <Col sm={6} className="px-0">
              <div
                className={
                  searchData == "searchById"
                    ? classes.activeSearchType
                    : classes.search_box
                }
                onClick={() => DataOnclick("searchById")}
              >
                Search By Id
              </div>
            </Col>
          </Row>
        </Container>

        {searchData == "searchByData" ? <SearchByData /> : <SearchById />}
      </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Search;
