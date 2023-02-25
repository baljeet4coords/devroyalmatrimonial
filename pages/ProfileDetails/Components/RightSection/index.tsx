
import classes from "./RightSection.module.scss";
import CustomButton from "../../../../components/Button/CustomButton";

const RightSection: React.FC = () => {
    return (
        <>
            <div className={classes.rghtSec}>
                <div className="d-flex justify-content-between pb-4">
                    <span className="d-flex align-items-end">Guna Match</span>
                    <span className={classes.gunaNo}>16/36</span>
                </div>
                <p className="text-left">Get a detailed analysis of guna match score, manglik & bhakut dosh analysis and lots more</p>
                <CustomButton onClick={() => console.log("tab")}>
                    Get Kundli Milan
                </CustomButton>
                <CustomButton onClick={() => console.log("tab")}>
                    Know More
                </CustomButton>
                <ul>
                    <li>
                        <p>Place of Birth</p>
                        <p>Sasaram, Bihar, India</p>
                    </li>
                    <li>
                        <p>Date of Birth</p>
                        <p>Oct 15, 1993</p>
                    </li>
                    <li>
                        <p>Time of Birth</p>
                        <p>14 hrs:17 mins</p>
                    </li>
                    <li>
                        <p>Horoscope match is not necessary</p>
                    </li>
                    <li>
                        <p>Sun sign</p>
                        <p>Libra</p>
                    </li>
                    <li>
                        <p>Rashi/Moon Sign</p>
                        <p>Kanya Rashi (Non Manglik)</p>
                    </li>
                    <li>
                        <p>Nakshatra</p>
                        <p>Don't Know Nakshatra</p>
                    </li>
                    <li>
                        <p>Manglik</p>
                        <p>Non Manglik</p>
                    </li>
                </ul>
                <CustomButton onClick={() => console.log("tab")}>
                    View Horoscope
                </CustomButton>
                <CustomButton onClick={() => console.log("tab")}>

                    Check Kundli Report
                </CustomButton>
            </div>
        </>
    )
}

export default RightSection;