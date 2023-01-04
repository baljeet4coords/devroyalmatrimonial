import classes from "./Search.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap";
import { Header, Footer } from "../../components/";
import SearchByData from "./SearchByData";
import SearchById from "./SearchByProfile";
import React, { useState } from 'react';


const Search: React.FC = () => {
    const [searchData, setSearchData] = useState<boolean>(true);
    const DataOnclick = () => {
        setSearchData(!searchData);
    }
    return (
        <>
            <div className={classes.background_banner}>
                <Header />
            </div>
            <div className={`${classes.bg_gray} w-100`}>
                <Container className={`${classes.search_main} w-75`}>
                    <Row>
                        <Col sm={6} className="px-0">
                            <div className={classes.search_box} onClick={DataOnclick}>
                                Search
                            </div>
                        </Col>
                        <Col sm={6} className="px-0">
                            <div className={classes.search_box} onClick={DataOnclick}>
                                Search By Id
                            </div>
                        </Col>
                    </Row>
                </Container>

                {searchData ? <SearchByData /> : <SearchById />}

            </div>
            <Footer />
        </>
    )
}

export default Search;