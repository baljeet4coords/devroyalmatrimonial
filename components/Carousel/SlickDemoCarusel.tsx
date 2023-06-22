import React, { Component } from "react";
import Slider from 'react-slick';
import classes from "./DemoCarousel.module.scss";
import { Image } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 30, height: 30, background: "#000000a1", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", color: 'red !important', paddingTop: '2px' }}
            onClick={onClick}
        >
            <BsArrowRight />
        </div>
    );
}

const images = [
    {
        id: 1,
        url: "/Images/HomePageSliderD1.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle",
    },
    {
        id: 2,
        url: "/Images/HomePageSliderD2.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle",
    },
    {
        id: 3,
        url: "/Images/HomePageSliderD3.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle",
    },
    {
        id: 4,
        url: "/Images/HomePageSliderD4.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle",
    },
];
const MatchCarusel = () => {
    var settings = {
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        speed: 1000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleNextArrow />,
        autoplay: true,
        autoplaySpeed: 3000,


        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className={classes.mainbg}>
            <Slider {...settings}>
                {
                    images.map((img) => {
                        return (
                            <>
                                <div className={classes.divImage} key={img.id}>
                                    <Image className={classes.image} src={img.url} alt='/Images/HomePageSlider1.jpg' />
                                    <div className={classes.cardTitle}>
                                        <h2>{img.title}</h2>
                                        <small>MARRIAGE DATE 08, DECEMBER 2020</small>
                                    </div>
                                    <div className={classes.cardDetails}>
                                        <strong>Mayank Banga &#38; Prayasha Kapoor</strong>
                                        <br />
                                        <br />
                                        She accepted my interest. We exchanged messages on JS only. Things
                                        were ok and we exchanged our contact numbers. But we didnt talk. We
                                        just exchanged more messages
                                        <br />
                                        <br />
                                        <p className={classes.dropdownItem}>View More</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    )}


            </Slider>
        </div>
    );
}
export default MatchCarusel