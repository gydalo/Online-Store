import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./index.module.css";
import * as yup from "yup";

/**
 * Yup schema for validating contact form fields.
 *
 * Fields:
 * - firstName: required, 2–15 characters
 * - lastName: required, 2–15 characters
 * - email: required, valid format
 * - subject: required, minimum 3 characters
 * - body: required, minimum 3 characters
 */
const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "Your first name should be at least 2 characters.")
      .max(15, "Your first name cannot be longer than 15 characters.")
      .required("Please enter your first name"),
    lastName: yup
      .string()
      .min(2, "Your last name should be at least 2 characters.")
      .max(15, "Your last name cannot be longer than 20 characters.")
      .required("Please enter your last name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    subject: yup
      .string()
      .min(3, "Your subject should be at least 3 characters.")
      .required("Please enter your subject"),
    body: yup
      .string()
      .min(3, "Your body should be at least 3 characters.")
      .required("Please enter your body"),
  })
  .required();

/**
 * Contact component
 *
 * A contact form that validates input using react-hook-form and yup.
 * On submission, it logs the form data, resets the form, and displays a confirmation message.
 *
 * @component
 * @returns {JSX.Element} The rendered contact form
 */
function Contact() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Handles form submission.
   *
   * @param {Object} data - The validated form data
   */
  function onSubmit(data) {
    console.log(data);
    setSuccessMessage("Thank you, we will get back to you soon!.");
    reset();
  }

  return (
    <div className={styles.contactForm}>
      <h2>Contact us</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputFormSmall}>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} />
          <p className={styles.errorMessage}>{errors.firstName?.message}</p>
        </div>

        <div className={styles.inputFormSmall}>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName")} />
          <p className={styles.errorMessage}>{errors.lastName?.message}</p>
        </div>

        <div className={styles.inputFormSmall}>
          <label htmlFor="email">Email</label>
          <input {...register("email")} />
          <p className={styles.errorMessage}>{errors.email?.message}</p>
        </div>

        <div className={styles.inputFormMedium}>
          <label htmlFor="subject">Subject</label>
          <input {...register("subject")} />
          <p className={styles.errorMessage}>{errors.subject?.message}</p>
        </div>

        <div className={styles.inputFormBig}>
          <label htmlFor="body">Body</label>
          <input {...register("body")} />
          <p className={styles.errorMessage}>{errors.body?.message}</p>
        </div>

        <div className={styles.inputForm}>
          <button type="submit">Submit</button>
        </div>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default Contact;
