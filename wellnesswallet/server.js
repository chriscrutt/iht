const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const serveStatic = require("serve-static");

const app = express();
app.use(bodyParser.json());
app.use(serveStatic("."));

var token;

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

        token = response.data.access_token;
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to get access token" });
    }
});

app.post("/create-questionnaire", async (req, res) => {
    const questionnaireForm = {
        resourceType: "Questionnaire",
        title: "Fall Questions",
        status: "draft",
        item: [
            {
                linkId: "1",
                text: "Have you fallen in the past year?",
                type: "boolean",
            },
            {
                linkId: "2",
                text: "Have you talked to a doctor about falling in the past year?",
                type: "boolean",
            },
        ],
    };

    const fhirServerUrl = "https://ogfiretest.azurehealthcareapis.com"; // Replace with your FHIR server URL

    try {
        const response = await axios.post(`${fhirServerUrl}/Questionnaire`, questionnaireForm, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        res.json(response);
    } catch (error) {
        console.error("Error creating questionnaire:", error.response ? error.response.data : error); // Log the error on the server-side
        res.status(500).json({
            message: "Error creating questionnaire",
            error: error.response ? error.response.data : error,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
