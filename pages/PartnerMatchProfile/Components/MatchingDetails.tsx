import React from 'react';
import classes from './MatchingDetails.module.scss'
import { Image, Table } from 'react-bootstrap';

const MatchingDetails = () => {
    const matchingData = [
        {
            title: 'Age',
            Val1: '18-32',
            val2: '27',
            Status: 'Match',
        },
        {
            title: 'Height in feet',
            Val1: '160-170',
            val2: '164',
            Status: 'Match',
        },
        {
            title: 'Preferred Country',
            Val1: 'India , Indonasia , Pakistan',
            val2: 'India',
            Status: 'Match',
        },
        {
            title: 'Preferred Indian State',
            Val1: 'Haryana , New Delhi',
            val2: 'Chandighad',
            Status: 'Not Match',
        },
        {
            title: 'Preferred Indian City',
            Val1: '',
            val2: 'Chandighad',
            Status: 'null',
        },
        {
            title: 'Education',
            Val1: 'B E BTech , MBA PGDM , MS Engineering , MS Engineering',
            val2: 'MS Engineering',
            Status: 'Match',
        },
        {
            title: 'Occupation',
            Val1: 'Advertising Media Entertainment , Not Working , Agricultural , AirlineAviation',
            val2: 'Engineering',
            Status: 'Not Match',
        },
        {
            title: 'Annual Income',
            Val1: 'Greater than 50 lakhs',
            val2: 'Greater than 20 lakhs',
            Status: 'Not Match',
        },
        {
            title: 'Marital Status',
            Val1: 'Never Married , Awaiting Divorce , Separated',
            val2: 'Separated',
            Status: 'Match',
        },
        {
            title: 'Religion',
            Val1: 'Does Not Matter',
            val2: 'Buddhist',
            Status: 'Match',
        },
        {
            title: 'Mother Tongue',
            Val1: 'Assamese , Oriya , Bengali',
            val2: 'Punjabi',
            Status: 'Not Match',
        },
        {
            title: 'Caste',
            Val1: '',
            val2: 'Sikh: Rai Sikh',
            Status: 'null',
        },
        {
            title: 'Residential Status',
            Val1: 'Temporary Visa , Student Visa , Work Permit',
            val2: 'Permanent Resident',
            Status: 'Not Match',
        },
        {
            title: 'Manglik',
            Val1: 'Angshik partial manglik , Non Manglik',
            val2: 'Non Manglik',
            Status: 'Match',
        },
        {
            title: 'Diet',
            Val1: 'Eggetarian',
            val2: 'Eggetarian',
            Status: 'Match',
        },
        {
            title: 'Smoking',
            Val1: 'Occasionally',
            val2: 'Occasionally',
            Status: 'Match',
        },
        {
            title: 'Drinking',
            Val1: 'Occasionally',
            val2: 'Occasionally',
            Status: 'Match',
        },
        {
            title: 'Ready to settle abroad',
            Val1: 'Yes',
            val2: 'No',
            Status: 'Not Match',
        },
        {
            title: 'Challenged',
            Val1: 'Mentally Duetoaccident , Mentally Frombirth',
            val2: 'Mentally Frombirth',
            Status: 'Match',
        },
        {
            title: 'Children Status',
            Val1: 'Yes Living Separatly , Yes Living together',
            val2: 'Yes Living together',
            Status: 'Match',
        },
    ]
    return (
        <div className={classes.MainWrapper}>
            <h3>Profile Comparision</h3>
            <div className={classes.ComparisonMain}>
                <Table width={'full'} responsive  >
                    <thead className='text-center'>
                        <tr>
                            <th>Matching Field</th>
                            <th>Your Profile</th>
                            <th>Rzayak Singh Oberoi</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchingData.map((data) => {
                            return (<tr className='text-center' key={data.title} >
                                <td width={'30%'}>{data.title}</td>
                                <td width={'30%'}>{data.Val1}</td>
                                <td width={'30%'}>{data.val2} </td>
                                <td width={'10%'}>{data.Status != 'null' && <Image src={data.Status == 'Match' ? "./done.svg" : "./error-icon.svg"} width={data.Status == 'Match' ? 23 : 25} height={data.Status == 'Match' ? 23 : 25} alt="done" className="pe-1" />}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MatchingDetails