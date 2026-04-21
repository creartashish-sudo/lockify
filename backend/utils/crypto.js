const CryptoJS =  require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY || "mySuperSecretKey";

 const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

 const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };