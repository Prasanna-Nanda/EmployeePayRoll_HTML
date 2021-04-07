let isUpdate = false;
let empPayrollObj = {};

window.addEventListener('DOMContentLoaded', (event)=>{
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if(name.nodeValue.length == 0){
           setSelectedValue('.text-error',"");
            return;
    }
    try {
        (new EmployeePayrollData()).name = name.value;
        setTextValue('.text-error',"");
    } catch (e){
        setTextValue('.text-error',e);
    }
});

const date= document.querySelector('#date');
date.addEventListener('input', function() {
    let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
    getInputValueById('#year');
    try{
        (new EmployeePayrollData()).startDate = new Date (Date.parse(startDate));
        setTextValue('.date-error',"");
    }catch (e) {
        setTextValue('.date-error',e);
    }
    });


const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});

checkForUpdate();

});

const save = (event) => {
    event.preventDefalut();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
        } catch(e) {
        return;
    }
}


function createAndUpdateStorage (EmployeePayrollData){
     let createEmployeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

     if(EmployeePayrollList) {
         let empPayrollData = EmployeePayrollList.
                     find(empData => empData._id == employeePayrollObj._id);
         if (!empPayrollData){
            let empPayrollData = EmployeePayrollList.
            find(empData => empData._id == employeePayrollObj._id);
            if(!empPayrollData) {
                EmployeePayrollList.push(createEmployeePayrollData());
            } else {
                const index = EmployeePayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);
                EmployeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
            }
   } else {
         EmployeePayrollList = [createEmployeePayrollData()]

     }
     localStorage.setItem("EmployeePayrollList", JSON.stringify(EmployeePayrollList))
    }
     
const setEmployeepayrollDate = (empPayrollData) => {
    try{
        EmployeePayrollData.name = employeePayrollObj._name;

    }catch (e){
        setTextValue('.text-error',e);
        throw e;
    }
    EmployeePayrollData.profilePic = employeePayrollObj._profilePic;
    EmployeePayrollData.gender = employeePayrollObj._gender;
    EmployeePayrollData.department = employeePayrollObj._department;
    EmployeePayrollData.salary = employeePayrollObj._salary;
    EmployeePayrollData.note = employeePayrollObj._note;
    try{
        EmployeePayrollData.startDate = 
        new Date(Date.parse(empPayrollObj._startDate)); 
    }catch(e){
        settextValue{'.date-error', e};
        throw e;
    }
    alert{EmployeePayrollData.toString()};
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID =!empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}


const createEmployeePayrollData = (id) => {
    let EmployeePayrollData = new empPayrollData();
    if (!id) empPayrollData = new empPayrollData();
    else empPayrollData.id = createNewEmployeeId();
    setEmployeePayrollData(empPayrollData);
    return empPayrollData;
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

const setForm = () => {
    setValue('#name', empPayrollObj.name);
    setSelectedValue('[#name=profile]', empPayrollObj._profilePic);
    setSelectedValue('[#name=gender]', empPayrollObj._gender);
    setSelectedValue('[#name=department]', empPayrollObj._department);
    setValue('.salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._note);
    let date = StringifyDate(empPayrollObj._startDate).split("");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);

}

const setSelectedValues = (propertyValue,value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }

        else if (item.value === value)
        item.checked = true;
    });
}
 const resetForm = () => {
     setValue('#name','');
     unsetSelectValues('[name=profile]');
     unsetSelectValues('[name=gender]');
     unsetSelectValues('name=department]');
     setValue('#salary','');
     setValue('#notes','');
     setSelectedValue('#day','0');
     setSelectedValue('#month', '0');
     setSelectedValue('#year','0');
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

const setSelectedIndex  = (id,index) => {
    const element = document.querySelector(id);
    element.setSelectedIndex = index;
}

const checkFOrUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

