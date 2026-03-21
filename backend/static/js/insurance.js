/**
 * Fetches scheme details from the Flask backend and opens the modal.
 * @param {string} schemeId - The unique ID of the insurance scheme (e.g., 'pmfby')
 */
function openScheme(schemeId) {
    // 1. Fetch data from the dynamic Flask route
    fetch('/get_scheme_details/' + schemeId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Scheme not found');
            }
            return response.json();
        })
        .then(data => {
            // 2. Insert the data into the Modal elements
            const titleElement = document.getElementById('modalTitle');
            const bodyElement = document.getElementById('modalBody');

            if (titleElement && bodyElement) {
                titleElement.innerText = data.name;
                bodyElement.innerText = data.details;
                
                // 3. Show the Modal using flex to center the content
                document.getElementById('schemeModal').style.display = 'flex';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Could not load details. Please check your connection.");
        });
}

/**
 * Closes the modal pop-up.
 */
function closeModal() {
    document.getElementById('schemeModal').style.display = 'none';
}

/**
 * Close modal if the user clicks anywhere on the dark background (outside the box).
 */
window.onclick = function(event) {
    const modal = document.getElementById('schemeModal');
    if (event.target === modal) {
        closeModal();
    }
}