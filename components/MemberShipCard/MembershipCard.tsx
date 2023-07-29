import React from "react";
import classes from "./MenbershipCard.module.scss";
import { Image } from "react-bootstrap";
import { BsCheck2, BsCheckCircle, BsStars } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import CustomButton from "../Button/CustomButton";

interface cardType {
  id: number,
  cardlogo: string,
  Bestoffer: boolean,
  title: string,
  price: number,
  durrations: string,
  featurs: string[]
  colorValue: string[]
}
interface componentProps {
  card: cardType;
}




const MembershipCard: React.FC<componentProps> = ({ card }) => {

  // const cardBGCode = [
  //   {
  //     key: 'Silver',
  //     value: ['#b7bac670', '#b3b7c2']
  //   },
  //   {
  //     key: 'Gold',
  //     value: ['#f0c75970', '#de952954']
  //   },
  //   {
  //     key: 'Silver',
  //     value: ['#70e5fe70', '#55c1ed6b']
  //   },
  // ]


  // const getBackground = (key: string) => {
  //   cardBGCode.map((bgcode) => {
  //     if (bgcode.key === key) {
  //       console.log(bgcode.value[0]);

  //       return bgcode.value[0]
  //     }
  //   })
  // }
  // const getOfferBackground = (key: string) => {
  //   cardBGCode.map((bgcode) => {
  //     if (bgcode.key === key) {
  //       return bgcode.value[1]
  //     }
  //   })
  // }

  return (
    <div className={classes.MCardContainer} style={{
      background: card.colorValue[0],
    }}>
      <div className={classes.MHeaderSec}>
        <Image src={card.cardlogo} alt={card.cardlogo + card.title} />
        {
          card.Bestoffer &&
          <div className={classes.MOfferType} style={{
            background: card.colorValue[1],
          }}>
            <BsStars className={classes.MOfferTypeImg} />
            <span>Best offer</span>
          </div>
        }
      </div>
      <div className={classes.MCardHeadingSec}>
        <h3>{card.title}</h3>
        <p>For large team & corprate</p>
      </div>

      <div className={classes.MCardPriceSec}>
        <span className={classes.MCardPriceRS}>RS {card.price}</span>
        <span className={classes.MCardPriceDurrations}> / {card.durrations}</span>
      </div>
      <hr />

      <div className={classes.MCardFeatureSec}>
        <p className={classes.MCardFeatureHeading}>Features</p>
        <div className={classes.MCardFeatureList}>
          {card.featurs.map((list, index) => {
            return <p key={list + index}> <FcCheckmark /> {list} </p>
          })}
        </div>
      </div>

      <div className={classes.MCardButtonSec}>
        <CustomButton onClick={() => { }}>
          Upgrade
        </CustomButton>

        <p>For any help<span> Contact Sale </span></p>
      </div>
    </div>
  );
};

export default MembershipCard;
