import classes from "./SingleInput.module.scss";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
 
interface MyComponentProps {
    inputName: string;
    postArray: string[];
  }

const SingleInput = (prop: MyComponentProps) => {
    const [HostedArray, updateHostedArray] = useState<string[]>([]);
    const [activeList, setActiveList] = useState<boolean>(false);
    const [searchHostedArray, UpdatesearchHostedArray] = useState<string[]>(prop.postArray);
    console.log(HostedArray);
    

    const searchDataFunc = (query: string) => {
        const searchHostedArrays = prop.postArray.filter(country => country.toLowerCase().includes(query.toLowerCase()));
        UpdatesearchHostedArray(searchHostedArrays);
      }

    const openList = (action: boolean) => {
        setActiveList(action);
    }

    const getClickedData = (data: string) => {
        if (HostedArray.indexOf(data) === -1)
        updateHostedArray(prevArray => [...prevArray, data]);
    }
    const getClickedDeleteData = (data: number) => {
        const newArray = HostedArray.filter((_, index) => index !== data);
        updateHostedArray(newArray);
      };

    return (

        <React.Fragment>
            <div className={classes.singleBox} >
                <label>{prop.inputName}</label>
                <div className={classes.inputBox}  >
                    <ul onClick={() => openList(true)}>
                        {HostedArray.map((val: string, idd: number) => {
                            return (
                                <li key={val}><span>{val}</span><IoClose onClick={() => getClickedDeleteData(idd)} /></li>
                            )
                        })}
                        <li className={classes.blankInput}><input type="text" placeholder={HostedArray.length < 1 ? "Select Some Options" : ""} onChange={(e) => searchDataFunc(e.target.value)} /></li>
                    </ul>
                    <div className={`${activeList ? classes.active : ''} ${classes.inputBoxVal}`}>
                        <ul>
                            {searchHostedArray.map((val: string, idd: number) => {
                                return (
                                    <li key={idd} onClick={() => getClickedData(val)} className={HostedArray.includes(val) ? classes.tabActive : ""}><span>{val}</span></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default SingleInput;