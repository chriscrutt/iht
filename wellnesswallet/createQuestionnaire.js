var fhirBaseUrl = "https://hapi.fhir.org/baseR4"; // Replace with your FHIR server base URL

var questionnaire = {
    resourceType: "Questionnaire",
    title: "Fall Questions",
    status: "active",

    item: [
        {
            linkId: "1",
            text: "Have you fallen in the past year?",
            type: "choice",
            answerOption: [
                {
                    valueCoding: {
                        code: "yes",
                        display: "Yes",
                    },
                },
                {
                    valueCoding: {
                        code: "no",
                        display: "No",
                    },
                },
            ],
        },
        {
            linkId: "2",
            text: "Have you talked to a doctor about falling in the past year?",
            type: "choice",
            answerOption: [
                {
                    valueCoding: {
                        code: "yes",
                        display: "Yes",
                    },
                },
                {
                    valueCoding: {
                        code: "no",
                        display: "No",
                    },
                },
            ],
        },
        {
            linkId: "3",
            text: "Percent of video watched",
            type: "decimal",
        },
    ],
};

$.ajax({
    url: `${fhirBaseUrl}/Questionnaire`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(questionnaire),
    success: function (response) {
        console.log("Questionnaire created:", response);
    },
    error: function (error) {
        console.log("Error creating questionnaire:", error);
    },
});
