
import classes from "./family.module.scss";
import { GiMusicalNotes } from "react-icons/gi";
import { SiJfrogbintray } from "react-icons/si";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiTShirtLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { MdPeopleAlt, MdNightlife } from "react-icons/md";

const Family: React.FC = () => {
    return (
        <>
            <div>
                <div className={classes.content} >
                    <div className={classes.eduCont}>
                        <span><MdPeopleAlt />familyCont</span>
                        <ul>
                            <li>
                                <p>Mother's Occupation</p>
                                <p>Housewife</p>
                            </li>
                            <li>
                                <p>Father's Occupation</p>
                                <p>Army/Armed Forces</p>
                            </li>
                            <li>
                                <p>Sister(s)</p>
                                <p>0 sister</p>
                            </li>
                            <li>
                                <p>Brother(s)</p>
                                <p>1 brother of which 0 married</p>
                            </li>
                            <li>
                                <p>Gothra</p>
                                <p>bhardwaj</p>
                            </li>
                            <li>
                                <p>Gothra (maternal)</p>
                                <p>Not filled in</p>
                            </li>
                            <li>
                                <p>Family Status</p>
                                <p>Upper Middle</p>
                            </li>
                            <li>
                                <p>Family Income</p>
                                <p>Rs. 35 - 50 Lakh per Annum</p>
                            </li>
                            <li>
                                <p>Family Type</p>
                                <p>Nuclear Family</p>
                            </li>
                            <li>
                                <p>Family Values</p>
                                <p>Moderate</p>
                            </li>
                            <li>
                                <p>Family based out of</p>
                                <p>New Delhi, Delhi, India</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.eduCont}>
                        <span><MdNightlife />Lifestyle</span>
                        <ul>
                            <li>
                                <p>Habits</p>
                                <p>Non Vegetarian, Doesn't drink, Doesn't smoke</p>
                            </li>
                            <li>
                                <p>Assets</p>
                                <p>Owns a house, Owns a car</p>
                            </li>
                            <li>
                                <p>Languages Known</p>
                                <p>English, Hindi</p>
                            </li>
                            <li>
                                <p>Blood Group</p>
                                <p>Not filled in</p>
                            </li>
                            <li>
                                <p>Special Cases</p>
                                <p>Disability - None</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.familyCont}>
                        <span><FaRegHeart />She Likes</span>
                        <div className={classes.controlDiv}>
                            <p><IoColorPaletteOutline />Photography</p>
                            <p><SiJfrogbintray />Movies, Watching television, Travel / Sightseeing, Net surfing</p>
                            <p><GiMusicalNotes />Old film songs</p>
                            <p><RiTShirtLine />Trendy - in line with the latest fashion</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Family;