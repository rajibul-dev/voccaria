// styles
import styles from "./item-details.module.css";
import PaypalButton from "./paypalButton";

interface ItemDetailsProps {
  name: string;
  currency: string;
  amount: number;
  price: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  currency,
  amount,
  price,
}) => {
  return (
    <div className="item-details">
      <h3 className={styles.price}>{price}</h3>
      <p className={`goto-paragraph ${styles.name}`}>{name}</p>
      <PaypalButton
        name={name}
        currencyCode={currency.toUpperCase()}
        amount={amount}
      />
    </div>
  );
};

export default ItemDetails;
