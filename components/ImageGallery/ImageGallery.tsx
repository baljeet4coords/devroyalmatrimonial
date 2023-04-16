import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Image } from "react-bootstrap";
import classes from "./ImageGallery.module.scss";
import { Button } from "react-bootstrap";
import { useRef } from "react";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}
const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      console.log(selectedFiles);
    }
  };
  return (
    <div className={classes.imageGallery}>
      <div className="d-flex justify-content-between">
        <h5>Your Photos</h5>
        <Button className={classes.addBtn} onClick={handleButtonClick}>
          Add more photos
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
        />
      </div>
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="text-center"
      >
        {images.length < 0
          ? "No images"
          : images.map((img, index) => {
              return (
                <a href={img.src} key={index}>
                  <Image alt={img.alt} src={img.src} />
                </a>
              );
            })}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
