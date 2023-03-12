
import classes from "./Edu.module.scss";
import { ImBook } from "react-icons/im";

const Education: React.FC = () => {
    return (
        <>
            <div className={classes.content}>
                <div className={classes.eduCont}>
                    <span><ImBook />Education & Career</span>
                    <ul>
                        <li>
                            <p>Highest Education</p>
                            <p>MBA/PGDM</p>
                        </li>
                        <li>
                            <p>School Name</p>
                            <p>Kendriya Vidhyalaya Pune</p>
                        </li>
                        <li>
                            <p>UG Degree</p>
                            <p>B.E/B.Tech</p>
                        </li>
                        <li>
                            <p>PG Degree</p>
                            <p>MBA/PGDM</p>
                        </li>
                        <li>
                            <p>UG College</p>
                            <p>St Peters Engineering College JNTU Hyderabad</p>
                        </li>
                        <li>
                            <p>PG College</p>
                            <p>Sikkim Manipal University</p>
                        </li>
                        <li>
                            <p>Other UG Degree</p>
                            <p>Not filled in</p>
                        </li>
                        <li>
                            <p>Other PG Degree</p>
                            <p>Not filled in</p>
                        </li>
                        <li>
                            <p>Employed In</p>
                            <p>Private Sector</p>
                        </li>
                        <li>
                            <p>Occupation</p>
                            <p>Analyst</p>
                        </li>
                        <li>
                            <p>Organization Name</p>
                            <p>Wells Fargo India Solutions Private Limited</p>
                        </li>
                        <li>
                            <p>Annual Income</p>
                            <p>Rs. 10 - 15 Lakh per Annum</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Education;