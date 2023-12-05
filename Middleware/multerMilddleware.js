const multer = require("multer");

// import { verifyToken } from "./verfyToken";
//set storage for the file /image

const storage = multer.diskStorage({
  //destination eath folderil aano save cheyyandth aa path evide kodukkaa
  //3 arguemnts indakum req,res(equal to "file" ) then a callback function

  destination: (req, file, callback) => {
    //athava file onnm vannillenkil null ellenkil evideaano store cheyyandath athinte path
    //null value verunnadth error aanu veraa
    callback(null, "public/image");
  },
  //evide nammal eath file namil aano store aakandath ath evide kodukum
  //unique aaya namil store aakandit aaanu "Datenow()" kodukkunnath

  //what will be name of file
  filename: (req, file, callback) => {
    //file name image vechitaanu  start aakandth
    //pinna "file.originalname" nammmale original name kittan vendi
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

//file filtering eath type images /files aanu accept cheyyandth enn evide kodukkum
////mimetype file type check cheyyan vndi

const filterFile = (req, file, callback) => {
  //image type aanel image anu use aakaa bakki ulla video type okke nammal "mimetype" check cheytha manasilakum
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    //file type same allankil error msg frontilekk ayakanam

    return callback(new Error("only accepts png/jpg/jpeg format files"));
  }
};

//storage:storage
//key and value same aayond direct use aakam

const upload = multer({ storage, filterFile });

module.exports = upload;
