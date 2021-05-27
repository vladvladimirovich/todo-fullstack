require("dotenv/config");
const { get } = require("../routes/users");
const jwtHelpers = require("./jwtHelpers");

const generateJwt = jwtHelpers.generateJwt;
const verifyJwt = jwtHelpers.verifyJwt;

test("Generate Jwt", () => {
  const payload = { username: "asdf" };
  const expiresIn = "1h";
  const secret = "qwe123";

  const responseTrue = generateJwt(payload, secret, expiresIn);
  expect(responseTrue.ok).toBe(true);

  const responseFalse = generateJwt(123, "qwe", 4);
  expect(responseFalse.ok).toBe(false);
});

test("Verify Jwt", async () => {
    const payload = {username: "asdf"};
    const expiresIn = "1h";
    const secret = "qwe123";

    const generateResponse = generateJwt(payload, secret, expiresIn);
    expect(generateResponse.ok).toBe(true);

    const token = generateResponse.value;
    const verifyResponseTrue = verifyJwt(token, secret);
    expect(verifyResponseTrue.ok).toBe(true);
    
    const value = verifyResponseTrue.value;
    expect(value.username).toBe(payload.username);

    const verifyResponseFalse = verifyJwt("asdf", secret);
    expect(verifyResponseFalse.ok).toBe(false);
})
