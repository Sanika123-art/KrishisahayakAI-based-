// Get elements
const fileInput = document.querySelector(".file-input");
const predictBtn = document.querySelector(".predict-btn");

const resultText = document.querySelector(".result-text");
const confidenceText = document.querySelector(".confidence-text");

// When Predict button is clicked
predictBtn.addEventListener("click", function () {

    // Check if file selected
    if (fileInput.files.length === 0) {
        alert("Please select an image first");
        return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    // Show loading text
    resultText.innerHTML = "Processing...";
    confidenceText.innerHTML = "Processing...";

    // Send image to Flask backend
    fetch("/predict1", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        // Display result
        resultText.innerHTML = data.disease;
        confidenceText.innerHTML = data.confidence + "%";

    })
    .catch(error => {

        console.error("Error:", error);

        resultText.innerHTML = "Error occurred";
        confidenceText.innerHTML = "--";

    });

});
