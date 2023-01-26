import classes from "./HomeImage.module.scss"
import Headimage from "../../public/Images/cover_img_free_chat.png" 
import Image from 'next/legacy/image'

const HomeImage = (prop:any) => {
    const background = prop.addBackground;
    const cssRes = prop.onRes;
    return (
        <>
            <div 
            style={{ backgroundImage: `url(/Images/${background})` }}
            className={classes.homeImage}></div>
        </>
    )
}

export default HomeImage;