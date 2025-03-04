import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .max(10, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),
    lastName: yup
      .string()
      .min(1, "Your last name should be at least 1 characters.")
      .max(10, "Your first name cannot be longer than 10 characters.")
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

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <label htmlFor="lastName">Last Name</label>
      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>
      <label htmlFor="email">Email</label>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
      <label htmlFor="subject">Subject</label>
      <input {...register("subject")} />
      <p>{errors.subject?.message}</p>
      <label htmlFor="body">Body</label>
      <input {...register("body")} />
      <p>{errors.body?.message}</p>
      <input type="submit" />
    </form>
  );
}

export default Contact;
