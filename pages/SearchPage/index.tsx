import classes from "./Search.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import { Header, Footer } from "../../components/";
import SearchByData from "./SearchByData";
import SearchById from "./SearchByProfile";
import React, { useState } from "react";

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState<string>("searchByData");

  const DataOnclick = (searchtype: string) => {
    setSearchData(searchtype);
  };
  return (
    <>
      <div className={classes.background_banner}>
        <Header />
      </div>
      <div className={`${classes.bg_gray} w-100 pb-5`}>
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
      </div>
      <Footer />
    </>
  );
};

export default Search;
