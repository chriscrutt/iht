var fhirBaseUrl = "http://localhost:8080/fhir"; // Replace with your FHIR server base URL

const patientId = "6"; // Replace with your Patient ID
const questionnaireId = "16"; // Replace with your Questionnaire ID

const questionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    questionnaire: `Questionnaire/${questionnaireId}`,
    status: "completed",
    subject: {
        reference: `Patient/${patientId}`,
    },
    item: [
        {
            linkId: "1",
            answer: [
                {
                    valueCoding: {
                        code: "yes", // Replace with the actual answer ("yes" or "no")
                    },
                },
            ],
        },
        {
            linkId: "2",
            answer: [
                {
                    valueCoding: {
                        code: "yes", // Replace with the actual answer ("yes" or "no")
                    },
                },
            ],
        },
        {
            linkId: "3",
            answer: [
                {
                    valueDecimal: 1.75, // Replace with the actual answer
                },
            ],
        },
    ],
};

$.ajax({
    url: `${fhirBaseUrl}/QuestionnaireResponse`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(questionnaireResponse),
    success: function (response) {
        console.log("Questionnaire response created:", response);
    },
    error: function (error) {
        console.log("Error creating questionnaire response:", error);
    },
});
