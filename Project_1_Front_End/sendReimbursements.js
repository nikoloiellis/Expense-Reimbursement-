let SendBtn = document.querySelector('.Send');

SendBtn.addEventListener('click', async () => {
    let amountInput = document.querySelector('#amount');
    let descInput = document.querySelector('#desc');
    let typeInput = document.querySelector('#type');
    let authorInput = document.querySelector('#author');
    const URL = `http://localhost:8081/users/${localStorage.getItem('user_id')}/reimbursements`;

    const jsonString = JSON.stringify({
        "amount": amountInput.value,
        "desc": descInput.value,
        "type": typeInput.value,
        "author": authorInput

    });

    let res = await fetch(URL, {
        method: 'POST',
        body: jsonString,
       
    });

    
    if (res.status === 200) {
        let user = await res.json();

        
        localStorage.setItem('user_id', user.user_id); 

       if (user.user_roles === 'Employee') {
            window.location = '/Employee.html';
        }
    } 
    

});
