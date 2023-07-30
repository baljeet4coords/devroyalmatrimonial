import React from "react";
import classes from "./MenbershipCard.module.scss";
import { Image } from "react-bootstrap";
import { BsCheck2, BsCheckCircle, BsStars } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import CustomButton from "../Button/CustomButton";
import { useRouter } from "next/router";

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
  isUpgrade?: boolean;
}




const MembershipCard: React.FC<componentProps> = ({ card, isUpgrade }) => {
  const router = useRouter();


  const handlePackageUpdate = async (event: any) => {
    event.preventDefault();
    router.push(`/MembershipPricing/MemberShipCheckout?packagetype=${card.title}`)
    console.log(card.id, card.title);
  }

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
        {isUpgrade &&
          <button className={classes.customButton} onClick={(event) => handlePackageUpdate(event)}>
            Upgrade
          </button>
        }
        <p>For any help<span> Contact Sale </span></p>
      </div>
    </div>
  );
};

export default MembershipCard;
