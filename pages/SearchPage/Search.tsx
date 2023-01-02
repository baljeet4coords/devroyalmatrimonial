import classes from "./Search.module.scss";
import { Container, Row, Col, Form, Accordion } from "react-bootstrap"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/FooterMain";
import SearchByData from "../../pages/SearchPage/SearchByData"
import SearchById from "../../pages/SearchPage/SearchByProfile";
import React, {useState} from 'react';

const [searchData, setSearchData] = useState(true)

const DataOnclick = () => {
    setSearchData(!searchData);
}


const Search: React.FC = () => {
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
                        Search
                    </div>
                </Col>
            </Row>
        </Container>
        
        {searchData ? <SearchByData/> : <SearchById/>}
        
        </div>
        <Footer />
        </>
    )
}

export default Search;