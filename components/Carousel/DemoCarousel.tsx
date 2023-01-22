import React, {useEffect, useState} from "react";
import classes from "./DemoCarousel.module.scss";
import { Image } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const DemoCarousel = () => {
const [stateSize, setSize] = useState(33.33);

useEffect(() => {
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 992) 
        setSize(100);
    });
}, [stateSize]);
const images = [
    {
        id: 1,
        url: "/images/HomePageSlider1.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle"
    },
    {
        id: 2,
        url: "/images/HomePageSlider2.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle"
    },
    {
        id: 3,
        url: "/images/HomePageSlider3.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle"
    },
    {
        id: 4,
        url: "/images/HomePageSlider3.jpg",
        title: "Mayank & Prayasha",
        subtile: "subtitle"
    }
    ];
  const renderItems = images.map((img) => {
    return (
      <div key={img.id}>
        <div className={classes.divImage}>
          <Image className={classes.image} src={img.url} alt={img.url} />

          <div className={classes.cardTitle}>
                <h2>{img.title}</h2>
                <small>MARRIAGE DATE 08, DECEMBER 2020</small>
                </div>
                <div className={classes.cardDetails}><strong>Mayank Banga &#38; Prayasha Kapoor</strong><br /><br />
                She accepted my interest. We exchanged messages on JS only. Things were ok and we exchanged our contact numbers. But we didnt talk. We just exchanged more messages
                <br /><br />
                <p className={classes.dropdownItem}>View More</p>
            </div>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.containerCarousel}>
      <div className={classes.carouselContent}>
        <Carousel
          centerMode={true}
          showStatus={false}
          dynamicHeight={false}
          emulateTouch
          swipeScrollTolerance={50}
          centerSlidePercentage={stateSize}
          showThumbs={false}
          showIndicators={false}
          interval={2000}
          autoPlay={true}
          infiniteLoop={true}
        >
          {renderItems}
        </Carousel>
      </div>
    </div>
  );
}

export default DemoCarousel;


  