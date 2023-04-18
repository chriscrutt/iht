var fhirBaseUrl = "http://localhost:8080/fhir"; // Replace with your FHIR server base URL

var patient = {
    resourceType: "Patient",
    name: [
        {
            family: "Doe",
            given: ["John"],
        },
    ],
    gender: "male",
    birthDate: "1990-01-01",
};

$.ajax({
    url: `${fhirBaseUrl}/Patient`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(patient),
    success: function (response) {
        console.log("Patient created:", response);
    },
    error: function (error) {
        console.log("Error creating patient:", error);
    },
});
