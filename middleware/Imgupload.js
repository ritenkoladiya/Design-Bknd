const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        // console.log("file 12",file)
        cd(null, "./img");
    },
    filename: (req, file, cd) => {
        // console.log("file 3",file)
        cd(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const multerFilter = (req, file, cd) => {
    // console.log("fieldName",file)
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/mp4"
    ) {
        cd(null, true)
    } else {
        cd("please upload right image");
    }
};

const Image = multer({ storage: storage, fileFilter: multerFilter });
module.exports = Image;