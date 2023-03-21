import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button } from "react-bootstrap";
import classes from "./AvtarPicker.module.scss";

type Avatar = {
  name: string;
  image: string;
};

interface AvatarPickerProps {
  onGetAvatar: ({ name, image }: { name: string; image: string }) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onGetAvatar }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(String(file?.lastModified));
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImage().toDataURL();
    onGetAvatar({ name: fileName, image: canvas });
  };

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
