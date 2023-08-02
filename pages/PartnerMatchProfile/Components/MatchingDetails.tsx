import React, { useEffect, useState } from 'react';
import classes from './MatchingDetails.module.scss'
import { Image, Table } from 'react-bootstrap';
import { IRegisterStep1Response, IRegisterStep2Response, IRegisterStep3Response, IRegisterStep4Response, IRegisterStep5Response } from '../../../types/register/userRegister';
import { City, Country, ICity, ICountry, IState, State } from 'country-state-city';
import { AnnualIncomeProfile, AnnualIncomeProfile0, Challenged, ChallengedWith0, ChildrenStatus, ChildrenStatus0, Diet, DietWith0, EducationTypeAndVal, EducationTypeAndValWith0, Manglik, ManglikWith0, MaritalStatus, MaritalStatusWith0, MotherTongue, MotherTongueWith0, Occupation, OccupationWith0, ReadyToSettleAbroad, ReadyToSettleAbroadWith0, Religion, ReligionWith0, ResidentialStatus, ResidentialStatusWith0, SmokeDrink, SmokeDrinkWith0 } from '../../../types/enums';
import { CastListArray } from '../../../constants/CastListArray';
import { step2 } from '../../../ducks/regiserUser/step2/actions';
import { PartnerPreferrenceResponse } from '../../../ducks/partnerPreferrence/types';
import { IPartnerDetailsInterestResponse, IPartnerDetailsPrivacyResponse } from '../../../types/PartnerDetails/partnerDetails';





interface MyProfileCompProps {
    partnerProfileAllData: {
        step1: {
            output: number;
            message: string;
            jsonResponse: IRegisterStep1Response | null;
        };
        step2: {
            output: number;
            message: string;
            jsonResponse: IRegisterStep2Response | null;
        };
        step3: {
            output: number;
            message: string;
            jsonResponse: IRegisterStep3Response | null;
        };
        step4: {
            output: number;
            message: string;
            jsonResponse: IRegisterStep4Response | null;
        };
        step5: {
            output: number;
            message: string;
            jsonResponse: IRegisterStep5Response | null;
        };
        profileCompletionScore: {
            output: number;
            message: string;
            jsonResponse: null;
            status: number;
            overallScore: number;
        };
    } | null;
    PartnerPreferenceJson: PartnerPreferrenceResponse | undefined;
    privacySetting?: IPartnerDetailsPrivacyResponse | null;
    interestResponse?: IPartnerDetailsInterestResponse | null;
}

const MatchingDetails: React.FC<MyProfileCompProps> = ({ partnerProfileAllData, PartnerPreferenceJson, privacySetting, interestResponse }) => {

    const [partnerPreferenceJson, setPartnerPreferenceJson] = useState(PartnerPreferenceJson);
    const Step1Data = partnerProfileAllData?.step1.jsonResponse;
    const Step2Data = partnerProfileAllData?.step2.jsonResponse;
    const Step3Data = partnerProfileAllData?.step3.jsonResponse;
    const Step4Data = partnerProfileAllData?.step4.jsonResponse;


    useEffect(() => {
        PartnerPreferenceJson && setPartnerPreferenceJson(PartnerPreferenceJson)
    }, [PartnerPreferenceJson])


    const dateNow = new Date();
    const nowYear = dateNow.getFullYear();
    const dob = Step1Data && Step1Data?.dob.split("-");
    const dobYear = dob && dob[0];

    function getKeyByValue(value: string, enumObject: any) {
        for (const [key, val] of Object.entries(enumObject)) {
            if (val === value) {
                return key.replaceAll("_", " ");
            }
        }
    }

    function castGet(idd: number) {
        const castname = CastListArray.map((cast) => {
            if (cast.id === String(idd)) {
                return cast.caste;
            }
        });

        return castname;
    }



    const countries: ICountry[] = Country.getAllCountries();
    const [countryCode, setCountryCode] = useState<string>(
        Step4Data?.family_native_country != (undefined && null)
            ? countries[Step4Data?.family_native_country - 1].isoCode
            : "IN"
    );

    useEffect(() => {
        if (countries[0].name === "Does Not Matter") {
            countries.shift();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stateOfCountry: IState[] = State.getStatesOfCountry(countryCode);
    const stateOfCountryArr: IState[] = State.getStatesOfCountry('IN');
    const [stateCode, setStateCode] = useState<string>(
        Step4Data?.family_native_state != (undefined && null)
            ? stateOfCountry[Step4Data?.family_native_state - 1]?.isoCode
            : "AS"
    );

    const cityOfState: ICity[] = City.getCitiesOfState(countryCode, stateCode);
    const allCitiesOfCountry: ICity[] = City.getCitiesOfCountry(countryCode) || [];
    const allCitiesOfCountryArr: ICity[] = City.getCitiesOfCountry('IN') || [];


    useEffect(() => {
        Step4Data?.family_native_country !== undefined &&
            countries[Step4Data?.family_native_country] !== undefined &&
            setCountryCode(countries[Step4Data?.family_native_country - 1]?.isoCode);
        Step4Data?.family_native_state != undefined &&
            stateOfCountry[Step4Data?.family_native_state] !== undefined &&
            Step4Data?.family_native_state >= 0 &&
            setStateCode(stateOfCountry[Step4Data?.family_native_state - 1]?.isoCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        countryCode,
        stateCode,
        cityOfState,
        Step4Data?.family_native_country,
        Step4Data?.family_native_state,
    ]);

    function getCountry(CountryCode: number) {
        return (
            countries[CountryCode - 1]?.name
        );
    }
    function getState(state: number) {
        console.log(stateOfCountry[state - 1]?.name);
        return (
            stateOfCountry[state - 1]?.name
        );
    }
    function getCity(city: number) {
        return allCitiesOfCountry[city - 1]?.name;
    }


    function getCityArr(city: number) {
        return allCitiesOfCountryArr[city - 1]?.name;
    }
    function getStateArr(state: number) {
        return (
            stateOfCountryArr[state - 1]?.name
        );
    }

    const isHeightMatch = () => {
        if (partnerPreferenceJson?.height_greater_than && partnerPreferenceJson.height_less_than && Step1Data?.height_cm) {
            return +partnerPreferenceJson?.height_greater_than <= Step1Data?.height_cm &&
                Step1Data?.height_cm <= +partnerPreferenceJson?.height_less_than
        }
    };
    const isAgeMatch = () => {
        if (partnerPreferenceJson?.age_greater_than && partnerPreferenceJson.age_less_than) {
            const age = dobYear && dobYear != undefined && dobYear != null && nowYear - +dobYear;
            return +partnerPreferenceJson?.age_greater_than <= Number(age) &&
                Number(age) <= +partnerPreferenceJson?.age_less_than
        }
    };

    const isValMatch = (val1: number[], val2: number) => {
        return val1.includes(val2);
    }


    const reptNameHide = () => <>{Step1Data?.fullname.slice(0, 3)}<span>{'*'.repeat(8)}</span></>;


    const matchingData = [
        {
            title: 'Age',
            Val1: `${partnerPreferenceJson?.age_greater_than} - ${partnerPreferenceJson?.age_less_than}`,
            val2: `${dobYear && dobYear != undefined && dobYear != null ? nowYear - +dobYear : "NA"}`,
            Status: isAgeMatch() ? 'Match' : 'Not Match',
        },
        {
            title: 'Height in feet',
            Val1: `${partnerPreferenceJson?.height_greater_than} - ${partnerPreferenceJson?.height_less_than}`,
            val2: Step1Data?.height_cm,
            Status: isHeightMatch() ? 'Match' : 'Not Match',
        },
        {
            title: 'Preferred Country',
            Val1: partnerPreferenceJson?.country !== (undefined || null) && partnerPreferenceJson?.country.map((Country, index) => {
                return getCountry(Country) ? getCountry(Country)?.concat(index < partnerPreferenceJson.country.length - 1 ? ' , ' : ' ') : 'Does Not Matter'
            }),
            val2: Step4Data && Step4Data?.family_native_country !== (undefined || null) && getCountry(Step4Data?.family_native_country) || 'not filed',
            Status: partnerPreferenceJson && Step4Data && isValMatch(partnerPreferenceJson?.country, Step4Data?.family_native_country) || partnerPreferenceJson?.country[0] === 0 ? 'Match' : 'Not Match',
        },
        {
            title: 'Preferred Indian State',
            Val1: partnerPreferenceJson?.state !== (undefined || null) && partnerPreferenceJson?.state.map((state, index) => {
                return getStateArr(state) ? getStateArr(state)?.concat(index < partnerPreferenceJson.state.length - 1 ? ' , ' : ' ') : 'Does Not Matter'
            }),
            val2: Step4Data && Step4Data?.family_native_state !== (undefined || null) && getState(Step4Data?.family_native_state) || 'not filed',
            Status: partnerPreferenceJson && Step4Data && isValMatch(partnerPreferenceJson?.state, Step4Data?.family_native_state) || partnerPreferenceJson?.state[0] === 0 ? 'Match' : 'Not Match',
        },
        {
            title: 'Preferred Indian City',
            Val1: partnerPreferenceJson?.city !== (undefined || null) && partnerPreferenceJson?.city.map((city, index) => {
                return getCityArr(city) ? getCityArr(city)?.concat(index < partnerPreferenceJson.city.length - 1 ? ' , ' : ' ') : 'Does Not Matter'
            }),
            val2: Step4Data && Step4Data?.family_native_city !== (undefined || null) && getCity(Step4Data?.family_native_city) || 'not filed',
            Status: partnerPreferenceJson && Step4Data && isValMatch(partnerPreferenceJson?.city, Step4Data?.family_native_city) || partnerPreferenceJson?.city[0] === 0 ? 'Match' : 'Not Match',
        },
        {
            title: 'Education',
            Val1: partnerPreferenceJson?.education !== (undefined || null) && partnerPreferenceJson?.education.map((val, index) => {
                return getKeyByValue(String(val), EducationTypeAndValWith0)?.concat(index < partnerPreferenceJson.education.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step2Data?.education), EducationTypeAndVal) || 'not filed',
            Status: partnerPreferenceJson && Step2Data && isValMatch(partnerPreferenceJson?.education.map((val) => +val), Step2Data?.education) || partnerPreferenceJson?.education[0] == '0' ? 'Match' : 'Not Match',
        },
        {
            title: 'Occupation',
            Val1: partnerPreferenceJson?.occupation !== (undefined || null) && partnerPreferenceJson?.occupation.map((val, index) => {
                return getKeyByValue(String(val), OccupationWith0)?.concat(index < partnerPreferenceJson.occupation.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step2Data?.occupation), Occupation) || 'not filed',
            Status: partnerPreferenceJson && Step2Data && isValMatch(partnerPreferenceJson?.occupation.map((val) => +val), Step2Data?.occupation) || Number(partnerPreferenceJson?.occupation[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Annual Income',
            Val1: getKeyByValue(String(partnerPreferenceJson?.annual_income_greater_than), AnnualIncomeProfile0) || 'not filed',
            val2: getKeyByValue(String(Step2Data?.annual_income), AnnualIncomeProfile) || 'not filed',
            Status: partnerPreferenceJson?.annual_income_greater_than == String(0) || partnerPreferenceJson?.annual_income_greater_than === Step2Data?.annual_income ? 'Match' : 'Not Match',
        },
        {
            title: 'Marital Status',
            Val1: partnerPreferenceJson?.marital_status !== (undefined || null) && partnerPreferenceJson?.marital_status.map((val, index) => {
                return getKeyByValue(String(val), MaritalStatusWith0)?.concat(index < partnerPreferenceJson.marital_status.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.marital_status), MaritalStatus) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.marital_status.map((val) => +val), Step1Data?.marital_status) || Number(partnerPreferenceJson?.marital_status[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Religion',
            Val1: partnerPreferenceJson?.religion !== (undefined || null) && partnerPreferenceJson?.religion.map((val, index) => {
                return getKeyByValue(String(val), ReligionWith0)?.concat(index < partnerPreferenceJson.religion.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.religion), Religion) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.religion.map((val) => +val), Step1Data?.religion) || Number(partnerPreferenceJson?.religion[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Mother Tongue',
            Val1: partnerPreferenceJson?.mother_tongue !== (undefined || null) && partnerPreferenceJson?.mother_tongue.map((val, index) => {
                return getKeyByValue(String(val), MotherTongueWith0)?.concat(index < partnerPreferenceJson.mother_tongue.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.mother_tongue), MotherTongue) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.mother_tongue.map((val) => +val), Step1Data?.mother_tongue) || Number(partnerPreferenceJson?.mother_tongue[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Caste',
            Val1: partnerPreferenceJson?.caste !== (undefined || null) && partnerPreferenceJson?.caste.map((val, index) => {
                return castGet(val) ? castGet(val)?.concat(index < partnerPreferenceJson.caste.length - 1 ? ' , ' : ' ') : 'Does Not Matter';
            }),
            val2: Step1Data?.caste && castGet(Step1Data?.caste) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.caste, Step1Data?.caste) ? 'Match' : 'Not Match',

        },
        {
            title: 'Residential Status',
            Val1: partnerPreferenceJson?.Residential_status !== (undefined || null) && partnerPreferenceJson?.Residential_status.map((val, index) => {
                return getKeyByValue(String(val), ResidentialStatusWith0)?.concat(index < partnerPreferenceJson.Residential_status.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step2Data?.residentialstatus), ResidentialStatus) || 'not filed',
            Status: partnerPreferenceJson && Step2Data && isValMatch(partnerPreferenceJson?.Residential_status.map((val) => +val), Step2Data?.residentialstatus) || Number(partnerPreferenceJson?.Residential_status[0]) === 0 ? 'Match' : 'Not Match',
        },
        {
            title: 'Manglik',
            Val1: partnerPreferenceJson?.manglik !== (undefined || null) && partnerPreferenceJson?.manglik.map((val, index) => {
                return getKeyByValue(String(val), ManglikWith0)?.concat(index < partnerPreferenceJson.manglik.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.marital_status), Manglik) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.manglik.map((val) => +val), Step1Data?.manglik) || Number(partnerPreferenceJson?.manglik[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Diet',
            Val1: getKeyByValue(String(partnerPreferenceJson?.diet), DietWith0) || 'not filed',
            val2: getKeyByValue(String(Step3Data?.diet), Diet) || 'not filed',
            Status: partnerPreferenceJson?.diet == String(0) || partnerPreferenceJson?.diet === Step3Data?.diet ? 'Match' : 'Not Match',
        },
        {
            title: 'Smoking',
            Val1: getKeyByValue(String(partnerPreferenceJson?.smoking), SmokeDrinkWith0) || 'not filed',
            val2: getKeyByValue(String(Step3Data?.smoking), SmokeDrink) || 'not filed',
            Status: partnerPreferenceJson?.smoking == String(0) || partnerPreferenceJson?.smoking === Step3Data?.smoking ? 'Match' : 'Not Match',

        },
        {
            title: 'Drinking',
            Val1: getKeyByValue(String(partnerPreferenceJson?.drinking), SmokeDrinkWith0) || 'not filed',
            val2: getKeyByValue(String(Step3Data?.drinking), SmokeDrink) || 'not filed',
            Status: partnerPreferenceJson?.drinking == String(0) || partnerPreferenceJson?.drinking === Step3Data?.drinking ? 'Match' : 'Not Match',

        },
        {
            title: 'Ready to settle abroad',
            Val1: getKeyByValue(String(partnerPreferenceJson?.ready_to_settleAbroad), ReadyToSettleAbroadWith0) || 'not filed',
            val2: getKeyByValue(String(Step2Data?.readytosettleabroad), ReadyToSettleAbroad) || 'not filed',
            Status: partnerPreferenceJson?.ready_to_settleAbroad == String(0) || partnerPreferenceJson?.ready_to_settleAbroad === Step2Data?.readytosettleabroad ? 'Match' : 'Not Match',

        },
        {
            title: 'Challenged',
            Val1: partnerPreferenceJson?.Challenged !== (undefined || null) && partnerPreferenceJson?.Challenged.map((val, index) => {
                return getKeyByValue(String(val), ChallengedWith0)?.concat(index < partnerPreferenceJson.Challenged.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.challenged), Challenged) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.Challenged.map((val) => +val), Step1Data?.challenged) || Number(partnerPreferenceJson?.Challenged[0]) === 0 ? 'Match' : 'Not Match',

        },
        {
            title: 'Children Status',
            Val1: partnerPreferenceJson?.children_status !== (undefined || null) && partnerPreferenceJson?.children_status.map((val, index) => {
                return getKeyByValue(String(val), ChildrenStatus0)?.concat(index < partnerPreferenceJson.children_status.length - 1 ? ' , ' : ' ')
            }),
            val2: getKeyByValue(String(Step1Data?.children_status), ChildrenStatus) || 'not filed',
            Status: partnerPreferenceJson && Step1Data && isValMatch(partnerPreferenceJson?.children_status.map((val) => +val), Step1Data?.children_status) || Number(partnerPreferenceJson?.children_status[0]) === 0 ? 'Match' : 'Not Match',

        },
    ]

    const ShowNameONConditions = Step1Data && Step1Data?.fullname.length > 16
        ? (Step1Data?.fullname).toLocaleLowerCase().substring(0, 15).concat('...')
        : Step1Data?.fullname.toLocaleLowerCase();


    return (
        <div className={classes.MainWrapper}>
            <h3>Profile Comparision</h3>
            <div className={classes.ComparisonMain}>
                <Table width={'full'} responsive="sm" hover >
                    <thead className='text-center'>
                        <tr>
                            <th>Matching Field</th>
                            <th className='text-Capitalize'>{
                                privacySetting
                                    ? privacySetting?.privacy_show_name === 'P'
                                        ? ShowNameONConditions
                                        : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A' || interestResponse?.Recieve === 'S'
                                            ? interestResponse?.Send === 'D' || interestResponse?.Recieve === 'D'
                                                ? reptNameHide()
                                                : ShowNameONConditions
                                            : reptNameHide()
                                    : ShowNameONConditions
                            } </th>
                            <th>Your Profile</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchingData.map((data) => {
                            return (<tr className='text-center ' key={data.title} >
                                <td width={'30%'}>{data.title}</td>
                                <td width={'30%'}>{data.val2} </td>
                                <td width={'30%'}>{data.Val1}</td>
                                <td width={'10%'}>{data.Status != 'null' && <Image src={data.Status == 'Match' ? "./done.svg" : "./error-icon.svg"} width={data.Status == 'Match' ? 23 : 25} height={data.Status == 'Match' ? 23 : 25} alt="done" className="pe-1" />}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}

export default MatchingDetails