let loginBtn = document.querySelector('.signin');




loginBtn.addEventListener('click', async () => {
    let usernameInput = document.querySelector('#username');
    let passwordInput = document.querySelector('#password');


    const URL = 'http://localhost:8081/login';

    const jsonString = JSON.stringify({
        "username": usernameInput.value,
        "password": passwordInput.value
    });

  
    let res = await fetch(URL, {
        method: 'POST',
        body: jsonString,
       
    });


    
    let token = res.headers.get('Token');
    localStorage.setItem('jwt', token);
  

    if (res.status === 200) {
        let user = await res.json();

        
        localStorage.setItem('user_id', user.user_id); 

        if (user.user_roles === 'manager') {
            window.location = './Manager.html';
        
        } else if (user.user_roles === 'employee') {
            window.location = './Employee.html';
        }
    } else {
        let errorMsg = await res.text();
        console.log(errorMsg);

        let errorElement = document.querySelector('#error-msg');
        errorElement.innerText = errorMsg;
        errorElement.style.color = 'red';
    }

});

