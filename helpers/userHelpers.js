async function submitUser(username, password, userModel) {
  if (typeof username !== "string") {
    return { ok: false, error: Error("username must be string") };
  }
  if (typeof password !== "string") {
    return { ok: false, error: Error("password must be string") };
  }
  const newUser = new userModel({
    username: username,
    password: password,
  });
  try {
    const submitedUser = await newUser.save();
    return {
      ok: true,
      value: submitedUser,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function getUser(username, userModel) {
  try {
    const user = await userModel.findOne({ username: username });
    if (user) {
      return {
        ok: true,
        value: user,
      };
    }
    return {
      ok: false,
      error: Error("User not found"),
      value: null,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

module.exports = {
  submitUser,
  getUser,
};
