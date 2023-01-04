import classes from "./HomeImage.module.scss"
import Headimage from "../../public/Images/cover_img_free_chat.png" 
import Image from 'next/legacy/image'

const HomeImage = (prop:any) => {
    const background = prop.addBackground;
    // console.log(background);
    
    return (
        <>
            <div 
            style={{ backgroundImage: `url(/Images/${background})` }}
            className={classes.homeImage}></div>
        </>
    )
}

export default HomeImage;