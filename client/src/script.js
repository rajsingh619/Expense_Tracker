const registerButton = document.getElementById('register')



registerButton.addEventListener('click',async()=>{
    const response = await fetch("http://127.0.0.1:5000/register",{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            user: document.getElementById('username').value,
            pwd: document.getElementById('password').value
        })
    }
    )
    if(response.status===409){
        console.log("User already exists please proceed to log in")
    }
})