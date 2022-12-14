const multer = require("multer");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "videos/");
  },
  filename: function (req, file, cb) {
    const name = Math.random() + "-" + file.originalname;
    const path = `videos/${name}`;
    req.body[file.fieldname] = path;
    cb(null, name);
  },
});

const upload = multer({ storage });

module.exports = upload;
