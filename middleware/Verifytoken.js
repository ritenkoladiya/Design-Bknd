const jwt = require("jsonwebtoken");

const VerifyToken = (req, resp, next) => {

    const token = req.headers["Bearer ", "authorization"];
    const mysecretkey = "mysecretkey";
    console.log("token:::::::", token);
    var decoded = jwt.verify(token, mysecretkey);
    jwt.verify(token, mysecretkey, (err, decoded) => {
        if (err) {
            console.log('err', err)
            return resp.status(422).send({ message: "please provide valid token" });
            // return err;
        } else {

            next();
            console.log("comp", decoded)
        }
    })
}

module.exports = VerifyToken;