const bcrypt = require("bcrypt");

async function encrypt(payload, saltRounds) {
  try {
    const encodedPayload = await bcrypt.hash(payload, saltRounds);
    return {
      ok: true,
      value: encodedPayload,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

async function compareHash(payload, hash) {
  try {
    const isEqual = await bcrypt.compare(payload, hash);
    return {
      ok: true,
      value: isEqual,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}
module.exports = {
  encrypt,
  compareHash
};
