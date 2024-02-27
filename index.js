// import { dotenv } from "dotenv";

// import { Resend } from "resend";
// import express from "express";
const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");
const resend = new Resend("re_c5npX5Vi_362ffCqD3sYS6skQiwVooxqr");
const app = express();

app.use(express.json());
//Potentially need to set up for js delivr but maybe not.
app.use(
  cors({
    origin: ["http://localhost:3000", "https://webflowsite.com"],
  })
);

app.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, phoneNumber, message } =
      req.body;
    const data = await resend.emails.send({
      from: "Keyview website <development@outkast.studio>",
      to: ["will@outkast.studio"],
      subject: "New Contact Form Submission",
      html: `<div>
      <h1>Contact Form Submission</h1>
      <p>Tag: Contact Form</p>
      <p>First Name: ${firstName}</p>
      <p>Last Name: ${lastName}</p>
      <p>Email Address: ${emailAddress}</p>
      <p>Phone Number: ${phoneNumber}</p>
      <p>Message: ${message}</p>
      </div>`,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/application", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      message,
      investorType,
    } = req.body;
    const data = await resend.emails.send({
      from: "Keyview website <development@outkast.studio>",
      to: ["will@outkast.studio"],
      subject: "New Application Form Submission",
      html: `<div>
      <h1>Application Form Submission</h1>
      <p>Tag: Application Form</p>
      <p>First Name: ${firstName}</p>
      <p>Last Name: ${lastName}</p>
      <p>Email Address: ${emailAddress}</p>
      <p>Phone Number: ${phoneNumber}</p>
      <p>Wholesale or sophisticated investor: ${
        investorType ? "True" : "False"
      }</p>
      ${message ? "<p>Message: " + message + "</p>" : ""}
      </div>`,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/newsletter-home", async (req, res) => {
  try {
    const { emailAddress, investorType } = req.body;
    const data = await resend.emails.send({
      from: "Keyview website <development@outkast.studio>",
      to: ["will@outkast.studio"],
      subject: "New Newsletter Homepage Form Submission",
      html: `<div>
      <h1>Newsletter Homepage Form Submission</h1>
      <p>Tag: Newsletter Homepage Signup</p>
      <p>Email Address: ${emailAddress}</p>
      <p>Wholesale or sophisticated investor: ${
        investorType ? "True" : "False"
      }</p>
      </div>`,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/newsletter", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailAddress,
      findOut,
      investorType,
      isSophisticatedInvestor,
    } = req.body;

    const data = await resend.emails.send({
      from: "Keyview website <development@outkast.studio>",
      to: ["will@outkast.studio"],
      subject: "New Newsletter Form Submission",
      html: `<div>
      <h1>Newsletter Form Submission</h1>
      <p>Tag: Newsletter Signup</p>
      <p>First Name: ${firstName}</p>
      <p>Last Name: ${lastName}</p>
      <p>Email Address: ${emailAddress}</p>
      <p>Wholesale or sophisticated investor: ${
        isSophisticatedInvestor ? "True" : "False"
      }</p>
      <p>How did you find out about us: ${findOut}</p>
      <p>Investor Type: ${investorType}</p>
      </div>`,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on http://localhost:3000");
});
