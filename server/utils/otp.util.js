const fast2sms = require("fast-two-sms");

exports.generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.fast2sms = async ({ message, contactNumber }) => {
    console.log(message);
    fast2sms.sendMessage({
      authorization: "4n87bg1SGMOurFP5witAysavUzeXJZ2x0pcNCh3kmTDI6QloY9QXx1tYAdlcmfLhD456akseIzVvJNWK",
      message,
      numbers: ["9404584441"],
    }).then((res)=>{
        console.log(res);
        console.log("done");
    }).catch((err)=>{
        console.log(err);
    })
  };