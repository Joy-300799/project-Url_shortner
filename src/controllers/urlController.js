const urlModel = require("../models/urlModel.js");
const validator = require("../validators/validator.js");
//const validUrl = require("valid-url");
const shortid = require("shortid");
const baseUrl = "http://localhost:3000/";

// Converting long URL to short.
const urlShort = async function(req, res) {
    try {
        const requestBody = req.body;

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: "Invalid request parameters. Please provide URL details",
            });
        }

        let longUrl = req.body.longUrl;
        const trimlongUrl = longUrl.trim(); //removing extra spcaes from the URL

        if (!validator.isValid(trimlongUrl)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Long URL." });
        }

        const urlCode = shortid.generate();
        const lowerUrlCode = urlCode.toLowerCase();

        const shortUrl = baseUrl + lowerUrlCode;

        const data = {};
        data["longUrl"] = trimlongUrl;
        data["shortUrl"] = shortUrl;
        data["urlCode"] = lowerUrlCode;
        const savedData = await urlModel.create(data);

        res.status(201).send({
            status: true,
            message: "Successfully Shorten the URL",
            data: savedData
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: false, message: "Something went wrong", Error: err.message });
    }
};

const redirectUrl = async function(req, res) {
    try {
        const urlData = req.params.urlCode;

        const validData = await urlModel
            .findOne({ urlCode: urlData })
            .select({ longUrl: 1 });

        if (!validData) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide a valid URL Code" });
        }

        res.redirect(307, validData.longUrl);
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports.urlShort = urlShort;
module.exports.redirectUrl = redirectUrl;