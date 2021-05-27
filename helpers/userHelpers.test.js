const User = require("../models/User");
const connectDB = require("../connectDB");
const userModel = User;

const userHelpers = require("./userHelpers");
const { response } = require("express");
const submitUser = userHelpers.submitUser;

beforeAll(() => connectDB());

test("Submit user", async () => {
  const username = Date.now().toString();
  const password = "asdf";

  const responseTrue = await submitUser(username, password, User);
  expect(responseTrue.ok).toBe(true);

  const submitedUser = responseTrue.value;
  expect(submitedUser.username).toBe(username);

  const responseFalse = await submitUser(3123, 21);
  expect(responseFalse.ok).toBe(false);
});