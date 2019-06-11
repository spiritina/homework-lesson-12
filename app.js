import save from './save.js';
'use strict';

let employList = {};
let NameInp = document.getElementById('name');
let PhotoInp = document.getElementById('photo');
let GenderInp = document.getElementById('gender');
let birthDateInp = document.getElementById('birthDay');
let postInp = document.getElementById('post');
let salaryInp = document.getElementById('salary');
let addBtn = document.getElementById('addBtn');
let employees = document.getElementById('employees');
let sortBtn = document.getElementById('sort');
let deleteBtn = document.getElementById('delete');
let headers = document.getElementsByTagName('th');
let counter = 0;


function Employee(name, photo, gender, birthDate, post, salary) {
    this.name = name;
    this.photo = photo;
    this.gender = gender;
    this.birthDate = birthDate;
    this.post = post;
    this.salary = salary;

};

sortBtn.addEventListener('click', function () {
    let option = document.getElementById('option');
    sort(option.value);
    showList();
    save('employList',employList);
})


const add = () => {

    let Name = NameInp.value,
        Photo = PhotoInp.value,
        Gender = GenderInp.value,
        birthDate = birthDateInp.value,
        post = postInp.value,
        salary = parseFloat(salaryInp.value);
    if (NameInp.validity.valid && PhotoInp.validity.valid && GenderInp.validity.valid && birthDateInp.validity.valid && postInp.validity.valid && salaryInp.validity.valid) {
        let tmp = new Employee(Name, Photo, Gender, birthDate, post, salary);
        counter++;
        employList[counter] = tmp;
        
        showList();
        save('employList',employList);
        save('counter',counter);
        cleanFields();
    } else {
        alert("Fill all the Fields!!!")
    }
}

const cleanFields = () => {
    NameInp.value = '';
    PhotoInp.value = '';
    GenderInp.value = '';
    birthDateInp.value = '';
    postInp.value = '';
    salaryInp.value = '';
}

function showList() {
    if (employList) {
        employees.innerHTML = '<tr><th data-option="name">Name</th><th data-option="photo">Photo</th><th data-option="gender">Gender</th><th data-option="birthDate">Birth Date</th><th data-option="post">Post</th><th data-option="salary">Salary</th> </tr>';
        let th = employees.querySelectorAll('th');
        for (let i = 0; i < th.length; i++) {
            th[i].addEventListener('click', function () {
                sort(this.dataset.option);
                showList();
                save('employList',employList);
            })
        }
        for (let key in employList) {
            let div = document.createElement('tr');
            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${key}`);
            div.innerHTML = `<td><label for="${key}">${employList[key].name}</label></td><td><label for="${key}"><img class='photo' src='${employList[key].photo }'></label></td><td><label for="${key}">${employList[key].gender}</label></td><td><label for="${key}">${employList[key].birthDate}</label></td><td><label for="${key}">${employList[key].post}</label></td><td><label for="${key}">${employList[key].salary}</label></td>`;
            employees.appendChild(input);
            employees.appendChild(div);
        }
    } else {
        employees.innerHTML = ''
    }
}
addBtn.addEventListener('click', add);

const remove = () => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = (checkboxes.length - 1); i > -1; i--) {
        if (checkboxes[i].checked) {
            checkboxes[i].nextSibling.remove();     
            delete employList[checkboxes[i].getAttribute('id')];
            checkboxes[i].remove();
        }
    }
    save('employList',employList);
 
};


deleteBtn.addEventListener('click', remove);

function sort(op) {
    let tmp = [];
    for (let key in employList) {
        tmp.push(employList[key]);
    }
    tmp.sort((prev, next) => {
        return prev[op] > next[op] ? 1 : -1
    })
    employList = {};
    for (let i = 0; i < tmp.length; i++) {
        employList[i] = tmp[i];
    }
};

window.onload = function () {
    if (!localStorage.getItem('employList')) return;
    downloadList();
    counter = JSON.parse(localStorage.getItem('counter'));
    console.log(employList);
    console.log(counter);
    showList();
}

function downloadList() {
    employList = JSON.parse(localStorage.getItem('employList'));
    

}