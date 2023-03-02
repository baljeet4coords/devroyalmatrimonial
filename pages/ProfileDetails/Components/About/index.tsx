
import classes from "./About.module.scss";

const About: React.FC = () => {
    return(
        <>
          <div className={classes.content}>
                <div className={classes.aboutCont}>
                    <h4>Her profile is managed by Parent</h4>
                    <p>We come from a upper middle class family and I am from Bihar but settled in Delhi since 3 decades. I am serving in Indian Air force and my wife is a homemaker. My daughter is a very kind heart , down to earth and a simple person working in Hyderabad as a senior technology operations analyst. she love travelling and listening to music. she is strong believer in equality amongst all of us. She is financially independent and a highly capable person. She would love to work/study abroad.</p>
                    <h4>About her Family</h4>
                    <p>We are family 4 with modern values. I work in Indian Air Force currently posted in Delhi. My wife is a homemaker. I have 1 son who is currently working in American Express Gurgaon.</p>
                    <h4>Education</h4>
                    <p>she has completed her education from different parts of the country namely Assam, Delhi, Pune, Hyderabad, Sikkim Manipal(Distance learning )</p>
                    <h4>Occupation</h4>
                    <p>She has total of 7yrs of experience in IT sector. she started working with IBM as Security Delivery Specialist (Hyderabad ). Now she is working with Wells Fargo as Senior Technology Operations Analyst (Hyderabad ).</p>
                </div>
            </div>
        </>
    )
}

export default About;