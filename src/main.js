document.addEventListener('DOMContentLoaded', () => {
    // Добавление событий для основных кнопок
    document.getElementById('checkInBtn').addEventListener('click', promptForCheckIn);
    document.getElementById('checkOutBtn').addEventListener('click', promptForCheckOut);
    document.getElementById('addEmployeeBtn').addEventListener('click', promptForAddEmployee);
    document.getElementById('removeEmployeeBtn').addEventListener('click', promptForRemoveEmployee);

    // Добавление событий для появляющихся кнопок 
    document.getElementById('checkInBtnInsideForm').addEventListener('click', checkIn);
    document.getElementById('checkOutBtnInsideForm').addEventListener('click', checkOut);
    document.getElementById('addEmployeeBtnInsideForm').addEventListener('click', addEmployee);
    document.getElementById('removeEmployeeBtnInsideForm').addEventListener('click', removeEmployee);

    // Показать модальное окно со статистикой
    document.getElementById('showStatisticsBtn').addEventListener('click', () => {
        statisticsModal.style.display = 'block';
        updateStatistics();
    });

    // Закрыть модальное окно при клике на кнопку закрытия (крестик)
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('statisticsModal').style.display = 'none';
    });

    // Закрыть модальное окно при клике вне его содержимого
    window.addEventListener('click', (event) => {
        if (event.target === document.getElementById('statisticsModal')) {
            document.getElementById('statisticsModal').style.display = 'none';
        }
    });
});

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
    var currentDateTime = new Date();
    var formattedDate = currentDateTime.getFullYear().toString() + '-' +
        (currentDateTime.getMonth() + 1).toString().padStart(2, '0') + '-' +
        currentDateTime.getDate().toString().padStart(2, '0');
    var formattedTime = currentDateTime.getHours().toString().padStart(2, '0') + ':' +
        currentDateTime.getMinutes().toString().padStart(2, '0') + ':' +
        currentDateTime.getSeconds().toString().padStart(2, '0');

    const rows = timeLog.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Проверка ушел ли сотрудник, которого нужно добавить
        if (row.cells[0].textContent === employeeName && row.cells[3].textContent === "---") {
            alert("Данный сотрудник уже есть в таблице");
            return;
        }
    }

    // Добавляем запись в таблицу
    timeLog.innerHTML = '<tr><td>' + employeeName + '</td><td>' + formattedDate + '</td><td>' + formattedTime + '</td><td>---</td></tr>' + timeLog.innerHTML;

    // Добавляем запись в массив
    checkedInEmployees.push(employeeName);

    // Скрываем форму
    checkInForm.style.display = 'none';
}

function checkOut() {
    const employeeNameOut = document.getElementById('employeeNameOut').value;
    const timeLog = document.getElementById('timeLog');
    var currentDateTime = new Date();
    var formattedTime = currentDateTime.getHours().toString().padStart(2, '0') + ':' +
        currentDateTime.getMinutes().toString().padStart(2, '0') + ':' +
        currentDateTime.getSeconds().toString().padStart(2, '0');

    // Находим строку сотрудника и добавляем время ухода
    const rows = timeLog.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].textContent === employeeNameOut) {
            rows[i].cells[3].textContent = formattedTime;
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

    updateStatistics();
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
    for (let i = 0; i < rows.length; i++) {
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

function formatTimeDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    
    return `${days} дня(ей) ${hours} часа(ов) ${minutes} минут(ы) ${seconds} секунд(ы)`;
}

function updateStatistics() {
    const timeLogRows = document.querySelectorAll('#timeLog tbody tr');
    const employeeDate = {};

    for (let i = 0; i < timeLogRows.length; i++) {
        const row = timeLogRows[i];
        const employeeName = row.cells[0].textContent;
        const checkInDate = Date.parse(row.cells[1].textContent + 'T' + row.cells[2].textContent);
        // Если работник еще не ушел, его не считаем
        // Если месяц не совпадает, то тоже не считаем
        if(row.cells[3].textContent === '---' || new Date(checkInDate).getMonth() != new Date().getMonth())
        {
            continue;
        }
        const checkOutDate = Date.parse(row.cells[1].textContent + 'T' + row.cells[3].textContent);
        const currentDate = checkOutDate - checkInDate       
        if (!employeeDate[employeeName]) {
            employeeDate[employeeName] = 0;
        }
        employeeDate[employeeName] += currentDate;
    }

    // Очищаем текущие данные в таблице статистики
    const statisticsTBody = document.querySelector('#statisticsTable tbody');
    statisticsTBody.innerHTML = '';

    // Заполняем таблицу статистики данными
    for (const [employee, date] of Object.entries(employeeDate)) {
        const row = statisticsTBody.insertRow();
        row.insertCell(0).textContent = employee;
        row.insertCell(1).textContent = formatTimeDuration(date); // Округление до двух знаков после запятой
    }
}