'use strict';

let emplList = {};
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
    save(emplList);
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
        emplList[counter] = tmp;
        counter++;
        showList();
        save();
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
    if (emplList) {
        employees.innerHTML = '<tr><th data-option="name">Name</th><th data-option="photo">Photo</th><th data-option="gender">Gender</th><th data-option="birthDate">Birth Date</th><th data-option="post">Post</th><th data-option="salary">Salary</th> </tr>';
        let th = employees.querySelectorAll('th');
        for (let i = 0; i < th.length; i++) {
            th[i].addEventListener('click', function () {
                sort(this.dataset.option);
                showList();
                save(emplList);

            })
        }
        for (let key in emplList) {
            let div = document.createElement('tr');
            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', `${key}`);
            div.innerHTML = `<td><label for="${key}">${emplList[key].name}</label></td><td><label for="${key}"><img class='photo' src='${emplList[key].photo }'></label></td><td><label for="${key}">${emplList[key].gender}</label></td><td><label for="${key}">${emplList[key].birthDate}</label></td><td><label for="${key}">${emplList[key].post}</label></td><td><label for="${key}">${emplList[key].salary}</label></td>`;
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
            delete emplList[checkboxes[i].getAttribute('id')];
            checkboxes[i].remove();
        }
    }
    save();
};

deleteBtn.addEventListener('click', remove);

function sort(op) {
    let tmp = [];
    for (let key in emplList) {
        tmp.push(emplList[key]);
    }
    tmp.sort((prev, next) => {
        return prev[op] > next[op] ? 1 : -1
    })
    emplList = {};
    for (let i = 0; i < tmp.length; i++) {
        emplList[i] = tmp[i];
    }
};

function save() {
    localStorage.setItem('employList', JSON.stringify(emplList));
}

window.onload = function () {
    if (!localStorage.getItem('employList')) return;
    downloadList();
    for (let key in emplList) {
        counter++;
    }
    showList();
}

function downloadList() {
    emplList = JSON.parse(localStorage.getItem('employList'));

}