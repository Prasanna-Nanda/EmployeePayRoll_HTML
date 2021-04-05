window.addEventListener('DOMContentLoaded', (event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    if(name.nodeValue.length == 0){
        textError.textContent = "";
        return;
    }
    try {
        (new EmployeePayrollData()).name = name.value ;;
        textError.textContent = "";
    } catch (e){
        textError.textContent = e;
    }
});

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});

const save = () => {
    try{
        let EmployeePayrollData = createEmployeePayroll();
    } catch(e) {
        return;
    }
}


function createAndUpdateStorage (EmployeePayrollData){
     let createEmployeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

     if(EmployeePayrollList != undefined) {
         EmployeePayrollList.push(EmployeePayrollData);

     } else{
         EmployeePayrollList = [EmployeePayrollData]

     }
     alert(EmployeePayrollList.toString());
     localStorage.setItem("EmployeePayrollList", JSON.stringify(EmployeePayrollList))
}


const createEmployeePayroll = () => {
    let EmployeePayrollData = new EmployeePayrollData();
    try {
        EmployeePayrollData.name = getInputValueById('#name');
    }catch (e){
        setTextValue('.text-error', e);
        throw e;
    }
    EmployeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    EmployeePayrollData.gender = getSelectedValues ('[name=gender]').pop();
    EmployeePayrollData.department = getSelectedValues('[name=deprtment]');
    EmployeePayrollData.salary = getInputValueById('#salary');
    EmployeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
        getInputValueById('#year');
        EmployeePayrollData.date = Date.parse(date);
        alert(EmployeePayrollData.toString());
        return EmployeePayrollData;
}

const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}



const getInputValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectValues('[name=profile]');
    unsetSelectValues('[name=gender]');
    unsetSelectValues("[name=department]");
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');

}

const unsetSelectValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, Value ) => {
    const element = document.querySelector(id);
    element.textContent=value;
}
