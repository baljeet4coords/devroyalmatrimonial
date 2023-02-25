
import classes from "./DesiredSec.module.scss";
import { AiFillEye, AiOutlineMinus, AiOutlineCheck } from "react-icons/ai";

const DesiredSec: React.FC = () => {
    return (
        <>
            <div className={classes.content}>
                <div className={classes.desiredCont}>
                    <span><AiFillEye />Desired Partner</span>
                    <ul>
                        <li><p>Age</p> <p>29 to 31 Years</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Height</p> <p>5' 8" to 6' 0"</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Marital Status</p> <p>Never Married</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Religion</p> <p>Hindu</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Caste</p> <p>Chandravanshi Kahar, Kahar</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Mother tongue</p> <p>Hindi-Delhi, Hindi-UP/UK, Hindi-Bihar/Jharkhand, Hindi-Rajasthan, Hind  ...more</p> <p><AiOutlineCheck /></p></li>
                        <li><p>Manglik</p> <p>Non Manglik</p> <p><AiOutlineCheck /></p></li>
                        <li><p>Income</p> <p>Rs.25 Lakh and above, $100,001 and above</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Smoke</p> <p>No</p> <p><AiOutlineMinus /></p></li>
                        <li><p>Disability</p> <p>None</p><p><AiOutlineCheck /></p></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DesiredSec;