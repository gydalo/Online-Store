import styles from "./index.module.css";

function Checkout() {
  return (
    <div className={styles.orderConfirmation}>
      <h1>Thank You for your order!</h1>
      <p>
        You will get a confirmation email when your products have been shipped.
      </p>
    </div>
  );
}

export default Checkout;
