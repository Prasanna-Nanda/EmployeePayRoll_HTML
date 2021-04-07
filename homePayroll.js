let EmployeePayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{
    EmployeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector("emp-count").textContent = EmployeePayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')): [];
}



//template literal ES6 Feature
const createInnerHtml = () => { 
    if (EmployeePayrollList.length == 0) return;
    const headerHtml = "<th> </th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th> <th> action</th>";
    if(EmployeePayrollList.length == 0) return;
    let innerHtml = ${headerHtml};
    
    for(const empPayrollData of EmployeePayrollList){
    innerHtml = ${innerHtml}
    <tr>
        <td><img class="profile" 
        src="${empPayrollData._prfilePic}"></img></td>
        <td>${EmployeePayrollData._name}</td>
        <td>${EmployeePayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>
            <div class='dept-label'>${EmployeePayrollData._department[0]}</div>
            <div class='dept-label'>${EmployeePayrollData._department[1]}</div>
        </td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td> 
    <td>

        <img id = "${EmployeePayrollData._id}" onclick="remove(this)" alt="delete"
        src="../assets/icons/delete-black-18dp.svg"></img>
        <img id = "${EmployeePayrollData._id}"  onclick="update(this)" 
        src="../assets/icons/create-black-18dp.svg" alt="edit"></img>
    </td>
    </tr>
    ;
    }
        document.querySelector('#table-display').innerHTML = innerHtml;

}

       
const getDeptHtml = (deptList) => {
    let getDeptHtml = '';
    for (const dept of deptList) {
        deptHtml = ${deptHtml} <div class='dept-label'>${dept}</div>
    }
    return deptHtml;
}
