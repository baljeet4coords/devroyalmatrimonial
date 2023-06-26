import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./CasteMultiple.module.scss";
import { IoClose } from "react-icons/io5";
import {
  CastListArray,
  ICastListArray,
} from "../../../constants/CastListArray";

interface CastMultiple {
  onChangeCaste: (caste: number[]) => void;
  defaultValues: number[];
}
interface ModifiedDataState {
  id: string;
  caste: string;
}
const CasteMultiple: React.FC<CastMultiple> = ({
  onChangeCaste,
  defaultValues,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const DoesNotMatter: ModifiedDataState = {
    id: "0",
    caste: "Does Not Matter",
  };
  const ListOfCaste: ICastListArray[] = [DoesNotMatter, ...CastListArray];
  const [castesIds, setCastesIds] = useState<number[]>(defaultValues);
  const [HostedArray, updateHostedArray] = useState<ICastListArray[]>(
    CastListArray.filter((cast) => defaultValues.includes(Number(cast.id)))
  );
  const [activeList, setActiveList] = useState<boolean>(false);

  const [searchHostedArray, UpdatesearchHostedArray] =
    useState<ICastListArray[]>(ListOfCaste);

  const [searchInput, setSearchInput] = useState("");
  const [stateSize, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 767);
    });
    window.dispatchEvent(new Event("resize"));
  }, []);

  useEffect(() => {
    if (searchHostedArray[0].caste != "Does Not Matter") {
      searchHostedArray.unshift(DoesNotMatter);
    }
  }, []);

  const searchDataFunc = (query: string) => {
    const searchHostedArrays = ListOfCaste.filter((item) =>
      item.caste.toLowerCase().includes(query.toLowerCase())
    );
    setSearchInput(query);
    UpdatesearchHostedArray(searchHostedArrays);
  };

  // For removeing the selcted item if Does not Matter is selected
  useEffect(() => {
    onChangeCaste(castesIds);
  }, [castesIds]);

  const getClickedData = useCallback(
    (caste: ICastListArray) => {
      const getIndex = ListOfCaste.findIndex(
        (obj) => obj.caste === caste.caste
      );


      if (getIndex == 0) {
        // For removeing the selcted item if Does not Matter is selected
        setCastesIds([0]);
        updateHostedArray([caste]);
        setTimeout(() => {
          setActiveList(false);
        }, 0);
      } else {
        if (!HostedArray.some((item) => Object.is(item, caste))) {
          setCastesIds(castesIds.filter((indx) => indx > 0));
          updateHostedArray(HostedArray.filter((item) => item.id != "0"));
          setCastesIds((prev) => [...prev, Number(caste.id)]);
          updateHostedArray((prevArray) => [...prevArray, caste]);
        }
      }
      setSearchInput("");
      UpdatesearchHostedArray(ListOfCaste);
      inputRef.current?.focus();
    },
    [HostedArray, castesIds]
  );
  const getClickedDeleteData = (id: string, item: ModifiedDataState) => {
    const itemname = String(item.caste);
    const getIndex = searchHostedArray.findIndex(
      (obj) => obj.caste === itemname
    );

    const casteidsCode = castesIds.filter((item) => item !== Number(id));
    const newArray = HostedArray.filter((item) => item.id !== id);
    updateHostedArray(newArray);
    setCastesIds(casteidsCode);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef?.current?.contains(event.target)) {
        setActiveList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef]);

  function HandleCloseDropdown() {
    setTimeout(() => {
      setActiveList(false)
    }, 50);
  }

  return (
    <>
      <div className={classes.singleBox} ref={elementRef}>
        <label>Caste</label>
        <div
          className={classes.inputBox}
          onClick={() => {
            setActiveList(true);
          }}
        >
          {activeList && (
            <div className={classes.inputbox_Sections}>
              <input
                type="text"
                placeholder={HostedArray.length < 1 ? "Select Some Options" : ""}
                value={searchInput}
                onChange={(e) => searchDataFunc(e.target.value)}
                ref={inputRef}
                autoFocus
              />
              {stateSize && <div onClick={HandleCloseDropdown}>
                <IoClose />close
              </div>}
            </div>

          )}
          <ul className={activeList ? classes.ul_maxh_64 : ""}>
            {HostedArray.length > 0
              ? HostedArray.map((item) => {
                return (
                  <li key={item.id}>
                    <span>{item.caste}</span>
                    <IoClose
                      onClick={() => getClickedDeleteData(item.id, item)}
                    />
                  </li>
                );
              })
              : !activeList && <span>Select Some Options</span>}
          </ul>
          <div
            className={`${activeList ? classes.active : ""} ${classes.inputBoxVal
              }`}
            ref={elementRef}
          >
            <ul>
              {searchHostedArray.length > 0 ? (
                searchHostedArray.map((item, index) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => getClickedData(item)}
                      className={
                        HostedArray.includes(item) ? classes.tabActive : ""
                      }
                    >
                      <span>{item.caste}</span>
                    </li>
                  );
                })
              ) : (
                <span>No Data Found</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasteMultiple;
