function resetpass()
{

let username=document.querySelector('.id1').value;
let pass=document.querySelector('.pass').value;
let conpass=document.querySelector('.conpass').value;

if(username.trim() === ""||pass.trim() === ""||conpass.trim() === "" )
{
    alert("fill field");
    return;
}
if(conpass !== pass)
{
    alert("password not match")
    return;
}


fetch("http://localhost:5000/forgot",{
  
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
        username:username,
        password:pass
    })
})

.then(res=>res.json())
.then(data=>{
    alert(data.message)
    if(data.message==="Password updated successfully")
    {
        window.location.href="/login"
    }
})

.catch(err=>
{
       console.error(err);
       alert("error accured");
}
)

}
