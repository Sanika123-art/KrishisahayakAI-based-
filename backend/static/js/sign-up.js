document.getElementById("id2").addEventListener("click", function () {
    let username = document.querySelector(".id1").value;
    let mobile = document.querySelector(".mobi").value;
    let password = document.querySelector(".pass").value;
    let confirm = document.querySelector(".conpass").value;

    if (password !== confirm) {
        alert("Password does not match!");
        return;
    }

    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, mobile, password })
    })
    .then(res => {
        if(res.ok)
    {
        window.location.href="/login";
    }
        
        
    res.json();
})
    .then(data => alert(data.message))
    .catch(err => console.log(err));

   
});
