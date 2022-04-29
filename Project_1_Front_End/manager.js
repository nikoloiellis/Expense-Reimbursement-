let logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt');

    window.location = './index.html';
});

window.addEventListener('load', (event) => {
    populatereimbursementsTable();
});

async function populatereimbursementsTable() {
    const URL = `http://localhost:8081/reimbursements`;

    let res = await fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include our JWT into the request
        }
        // credentials: 'include' // This is if you're using HttpSession w/ JSESSIONID cookies
    })

    if (res.status === 200) {
        let reimbursements = await res.json();

        for (let reimbursement of reimbursements) {
            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            td1.innerText = reimbursement.reim_id;

            let td2 = document.createElement('td');
            td2.innerText = reimbursement.amount;

            let td6 = document.createElement('td');
            td6.innerText = reimbursement.submitted;
            
            let td7 = document.createElement('td');
            td7.innerText = reimbursement.resolved;

            let td8 = document.createElement('td');
            td8.innerText = reimbursement.description;

            let td9 = document.createElement('td');
            td9.innerText = reimbursement.emplUsername;

            let td11 = document.createElement('td');
            td11.innerText = reimbursement.status;

            let td10 = document.createElement('td');
            td10.innerText = reimbursement.type;

            // let td5 = document.createElement('td');
            // td5.innerText = (reimbursement.graderUsername ? reimbursement.graderUsername : 'Not graded');
            // td5.style.color = (reimbursement.graderUsername ? td5.style.color : 'RGB(255, 0, 0)');

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);
            tr.appendChild(td9);
            tr.appendChild(td10);
            tr.appendChild(td11);
            let tbody = document.querySelector('#reimbursements-tbl > tbody');
            tbody.appendChild(tr);
        }
    }
}