const { compare } = require('bcrypt');
const bcryptHelpers = require('./bcryptHelpers');
const encrypt = bcryptHelpers.encrypt;
const compareHash = bcryptHelpers.compareHash;

test("Encrypt", async () => {
    const payload = "asdfasdf";
    const saltRound = 10;
    const response = await encrypt(payload, saltRound);
    expect(response.ok).toBe(true);
})

test("Compare hash", async () => {
    const payload = "asdfasdf";
    const saltRound = 10;
    const encryptResponse = await encrypt(payload, saltRound);
    const hash = encryptResponse.value;

    const compareResponse = await compareHash(payload, hash);
    expect(compareResponse.ok).toBe(true);
    console.log(compareResponse.value);
    expect(compareResponse.value).toBe(true);

})