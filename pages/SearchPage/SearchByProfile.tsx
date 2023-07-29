import { useState } from "react";
import classes from "./Search.module.scss";
import { Container, Form, Button, Spinner } from "react-bootstrap"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";




const SearchById: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userProfileId, setUserProfileId] = useState<string>("");

    const handleUserid = (e: any) => {
        setUserProfileId(e.target.value);
    }


    const searchUserByProfile = async (event: any) => {
        event.preventDefault();
        setLoading(true)
        router.push(`/PartnerMatchProfile?uid=${userProfileId}`)
    };



    return (
        <>
            <Container className={`${classes.Search_body} w-75 mt-5`}>
                <Form>
                    <Form.Group className={classes.search_group}>
                        <Form.Label className={classes.search_lable}>Search By Profile</Form.Label>
                        <Form.Control type="email" defaultValue={userProfileId} placeholder="e.g. 999RMA1DD7, 8875RMA1DD7, etc." onChange={(e) => handleUserid(e)} className={classes.input_search} />
                    </Form.Group>

                    <div className={classes.buttonWrapper}>
                        <Button
                            className={classes.savePartnerBtn}
                            onClick={searchUserByProfile}
                            disabled={userProfileId.length < 5}
                        >
                            {loading && (
                                <Spinner
                                    className={classes.loginSpiner}
                                    animation="border"
                                    variant="light"
                                />
                            )}
                            {loading ? 'Searching' : 'Search'}
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default SearchById;