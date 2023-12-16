const checkInForm = document.getElementById('checkInForm');
const checkOutForm = document.getElementById('checkOutForm');
const addEmployeeForm = document.getElementById('addEmployeeForm');
const removeEmployeeForm = document.getElementById('removeEmployeeForm')
let checkedInEmployees = []; // Массив отмеченных сотрудников
let allEmployees = []; // Массив всех сотрудников

function promptForCheckIn() {
    if (allEmployees.length == 0) {
        alert('Сотрудники отсутствуют. Добавьте сотрудника');
        return;
    }

    if (checkInForm.style.display == 'block') {
        checkInForm.style.display = 'none';
        return;
    }
    else {
        if (checkOutForm.style.display == 'block') {
            checkOutForm.style.display = 'none';
        }
        if (addEmployeeForm.style.display == 'block') {
            addEmployeeForm.style.display = 'none';
        }
        if (removeEmployeeForm.style.display == 'block') {
            removeEmployeeForm.style.display = 'none';
        }
        checkInForm.style.display = 'block';
    }
}

function promptForCheckOut() {
    if (checkedInEmployees.length == 0) {
        alert('Отмеченные сотрудники отсутствуют.');
        return;
    }

    if (checkOutForm.style.display == 'block') {
        checkOutForm.style.display = 'none';
    }
    else {
        if (checkInForm.style.display == 'block') {
            checkInForm.style.display = 'none';
        }
        if (addEmployeeForm.style.display == 'block') {
            addEmployeeForm.style.display = 'none';
        }
        if (removeEmployeeForm.style.display == 'block') {
            removeEmployeeForm.style.display = 'none';
        }
        const select = document.getElementById('employeeNameOut');
        select.innerHTML = '';

        // Заполняем список только теми сотрудниками, которые отметили приход
        checkedInEmployees.forEach(function (employee) {
            const option = document.createElement('option');
            option.value = employee;
            option.textContent = employee;
            select.appendChild(option);
        });
        checkOutForm.style.display = 'block';
    }
}

function promptForAddEmployee() {
    if (addEmployeeForm.style.display == 'block') {
        addEmployeeForm.style.display = 'none';
    }
    else {
        if (checkOutForm.style.display == 'block') {
            checkOutForm.style.display = 'none';
        }
        if (checkInForm.style.display == 'block') {
            checkInForm.style.display = 'none';
        }
        if (removeEmployeeForm.style.display == 'block') {
            removeEmployeeForm.style.display = 'none';
        }
        addEmployeeForm.style.display = 'block';
    }
}

function promptForRemoveEmployee() {
    if (allEmployees.length == 0) {
        alert('Сотрудники отсутствуют. Добавьте сотрудника');
        return;
    }

    if (removeEmployeeForm.style.display == 'block') {
        removeEmployeeForm.style.display = 'none';
    }
    else {
        if (checkOutForm.style.display == 'block') {
            checkOutForm.style.display = 'none';
        }
        if (checkInForm.style.display == 'block') {
            checkInForm.style.display = 'none';
        }
        if (addEmployeeForm.style.display == 'block') {
            addEmployeeForm.style.display = 'none';
        }
        const select = document.getElementById('employeeToRemove');
        select.innerHTML = '';

        // Заполняем список сотрудников
        allEmployees.forEach(function (employee) {
            const option = document.createElement('option');
            option.value = employee;
            option.textContent = employee;
            select.appendChild(option);
        });
        removeEmployeeForm.style.display = 'block';
    }
}

function checkIn() {
    var employeeName = document.getElementById('employeeName').value;
    var timeLog = document.getElementById('timeLog');
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();

    const rows = timeLog.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        // Проверка ушел ли сотрудник, которого нужно добавить
        if (row.cells[0].textContent === employeeName && row.cells[3].textContent === "---") {
            alert("Данный сотрудник уже есть в таблице");
            return;
        }
    }

    // Добавляем запись в таблицу
    timeLog.innerHTML += '<tr><td>' + employeeName + '</td><td>' + currentDate + '</td><td>' + currentTime + '</td><td>---</td></tr>';

    // Добавляем запись в массив
    checkedInEmployees.push(employeeName);

    // Скрываем форму
    checkInForm.style.display = 'none';
}

function checkOut() {
    const employeeNameOut = document.getElementById('employeeNameOut').value;
    const timeLog = document.getElementById('timeLog');
    const currentTime = new Date().toLocaleTimeString();

    // Находим строку сотрудника и добавляем время ухода
    const rows = timeLog.getElementsByTagName('tr');
    for (let i = rows.length - 1; i > 0; i--) {
        if (rows[i].cells[0].textContent === employeeNameOut) {
            rows[i].cells[3].textContent = currentTime;
            break;
        }
    }

    // Скрыть форму для ухода
    checkOutForm.style.display = 'none';

    // Удаляем сотрудника из массива checkedInEmployees
    const index = checkedInEmployees.indexOf(employeeNameOut);
    if (index > -1) {
        checkedInEmployees.splice(index, 1);
    }
}

function addEmployee() {
    const newEmployeeName = document.getElementById('newEmployeeName').value.trim();
    if (newEmployeeName && allEmployees.indexOf(newEmployeeName) === -1) {
        allEmployees.push(newEmployeeName);
        // Очищаем поле ввода для следующего ввода
        document.getElementById('newEmployeeName').value = '';
        // Скрываем форму добавления сотрудника
        document.getElementById('addEmployeeForm').style.display = 'none';
        updateEmployeeList();
    } else {
        alert('Введите уникальное ФИО сотрудника.');
    }
}

function updateEmployeeList() {
    // Обновляем список сотрудников в форме прихода
    const select = document.getElementById('employeeName');
    select.innerHTML = '';
    allEmployees.forEach(function (employee) {
        const option = document.createElement('option');
        option.value = employee;
        option.textContent = employee;
        select.appendChild(option);
    });
}

function removeEmployee() {
    const select = document.getElementById('employeeToRemove');
    const employeeName = select.value;
    var timeLog = document.getElementById('timeLog');

    const rows = timeLog.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        // Проверка ушел ли сотрудник, которого нужно удалить
        if (row.cells[0].textContent === employeeName && row.cells[3].textContent === "---") {
            alert("Данный сотрудник еще не покинул рабочее место");
            return;
        }
    }

    const index = allEmployees.indexOf(employeeName);
    if (index > -1) {
        allEmployees.splice(index, 1);
        checkedInEmployees = checkedInEmployees.filter(e => e !== employeeName);
        updateEmployeeList();

        // Скрываем форму удаления сотрудника
        removeEmployeeForm.style.display = 'none';
    }
}