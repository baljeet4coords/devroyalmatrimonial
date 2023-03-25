import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button } from "react-bootstrap";
import classes from "./AvtarPicker.module.scss";
import { Image } from "react-bootstrap";

type Avatar = {
  name: string;
  image: string;
};

interface AvatarPickerProps {
  onGetAvatar: (name: string, file: Blob | null) => void;
  defaultImage: string;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  onGetAvatar,
  defaultImage,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileExt, setFilExt] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(String(file?.lastModified));
    setFilExt(file?.type.split("/")[1] || "");
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const imageName = `${fileName}.${fileExt}`;
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImage().toDataURL();
    const canvasBlob = editorRef.current.getImageScaledToCanvas();
    canvasBlob.toBlob((blob) => {
      onGetAvatar(imageName, blob);
    });
    if (defaultImage) {
      setCroppedImage(defaultImage);
    }
    setCroppedImage(canvas);
  };
  console.log(defaultImage);

  return (
    <>
      <input
        type="file"
        onChange={handleImageChange}
        id="profilepic"
        name="profilepic"
        className={classes.Profile_input}
      />
      {image && (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          borderRadius={250}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          onImageReady={() => setScale(1)}
          className={classes.canvasIMG}
        />
      )}
      {croppedImage ? (
        <Image src={croppedImage} alt="avatar" className="w-100" />
      ) : (
        <Image src={defaultImage} alt="avatar" className="w-100" />
      )}
      {image && (
        <div className={classes.BtnDiv}>
          <Button onClick={handleSave} className={classes.Btn}>
            Crop Image
          </Button>
        </div>
      )}
    </>
  );
};

export default AvatarPicker;
