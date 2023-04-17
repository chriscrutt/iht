const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const serveStatic = require("serve-static");

const app = express();
app.use(bodyParser.json());
app.use(serveStatic(".")); // Add this line to serve static files from the current directory

app.post("/getAccessToken", async (req, res) => {
    try {
        const response = await axios.post(
            "https://login.microsoftonline.com/185231c3-f035-41fb-bbec-bfc5ae2df5c0/oauth2/v2.0/token",
            {
                client_id: "5d812192-7cf1-4c0e-9639-5f77f1d03174",
                scope: "https://ogfiretest.azurehealthcareapis.com/.default",
                client_secret: "dEN8Q~U1h~PqWVRep3WPGRtc9nzXHh0MjUzQCcow",
                grant_type: "client_credentials",
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                transformRequest: [
                    (data, headers) => {
                        const urlEncodedData = Object.entries(data)
                            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                            .join("&");

                        return urlEncodedData;
                    },
                ],
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to get access token" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
