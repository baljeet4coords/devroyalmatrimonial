import classes from "./Search.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Footer, LoginHeader } from "../../components/";
import React, { useState } from "react";
import SearchByData from "./SearchByData";
import SearchById from "./SearchByProfile";

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState<string>("searchbydata");

  const DataOnclick = (searchtype: string) => {
    return setSearchData(searchtype);
  };
  return (
    <>
      <div className={classes.bg}>
        <Container fluid className={classes.background_banner}>
          <LoginHeader />
        </Container>
        <div className={`${classes.bg_gray} w-100 pb-5`}>
          <div className={`${classes.search_main}`}>
            <Row className={`${classes.tabSection} row`}>
              <button onClick={() => DataOnclick('searchbydata')} className={`${classes.TabButton} ${searchData === 'searchbydata' && classes.TabButtonActive} `}>
                Search by Data
              </button>
              <button onClick={() => DataOnclick('searchbyid')} className={`${classes.TabButton} ${searchData === 'searchbyid' && classes.TabButtonActive} `}>
                Search by id
              </button>
            </Row>
          </div>

          {searchData === "searchbydata" ? <SearchByData /> : <SearchById />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
