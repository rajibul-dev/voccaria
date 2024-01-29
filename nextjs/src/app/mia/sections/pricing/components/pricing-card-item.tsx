// styles
import styles from "./pricing-card-item.module.css";

// components
import Button from "@/app/components/button";

interface PricingCardItemProps {
  price: string;
  name: string;
  description: any;
  isRecommended?: boolean;
}

const PricingCardItem: React.FC<PricingCardItemProps> = ({
  price,
  name,
  description,
  isRecommended,
}) => {
  const nameSlittedArray = name.split(" ");
  const sliceFirstPart = nameSlittedArray.slice(0, -2).join(" ");
  const sliceSecondPart = nameSlittedArray.slice(-2).join(" ");

  const cookedName = (
    <>
      {sliceFirstPart}
      <br />
      {sliceSecondPart}
    </>
  );

  return (
    <li
      className={`${styles.card} ${
        isRecommended ? styles.recommendedTagContainer : ""
      }`}
    >
      {isRecommended && (
        <span className={styles.recommendedTag}>Recommended</span>
      )}
      <div className={styles.flex}>
        <span className={styles.price}>{price}</span>
        <h3 className={styles.name}>{cookedName}</h3>
        <p className={styles.description}>{description}</p>
        <Button
          isBlock={true}
          type="primary"
          size="big"
          className={styles.btn}
        >
          Buy now
        </Button>
      </div>
    </li>
  );
};

export default PricingCardItem;
