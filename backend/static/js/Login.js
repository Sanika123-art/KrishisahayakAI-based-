document.getElementById("id2").addEventListener("click", function () {
    let username = document.querySelector(".id1").value;
    let password = document.querySelector(".pass").value;

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        if (data.success) {
            window.location.href = "/home";
        }
    })
    .catch(err => console.log(err));
});
