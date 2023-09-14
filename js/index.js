var newTask = document.querySelector("#newTask")
var modal = document.querySelector("#modal")
var addTaskBtn = document.querySelector("#addBtn")
var updateBtn = document.querySelector("#updateBtn")
var tasks = document.querySelectorAll(".tasks")
var task = document.querySelectorAll(".task")
var statusInput = document.querySelector("#status")
var categoryInput = document.querySelector("#category")
var titleInput = document.querySelector("#title")
var descriptionInput = document.querySelector("#description")
var root = document.querySelector(":root")
var lightMode = document.querySelector("#lightMode")
var darkMode = document.querySelector("#darkMode")
var nextUpCount = document.querySelector("#nextUpCount")
var inProgressCount = document.querySelector("#inProgressCount")
var doneCount = document.querySelector("#doneCount")
var todoNum = doneCount.querySelectorAll("#toDO .task")
var inProgressNum = doneCount.querySelectorAll("#inProgress .task")
var doneNum = doneCount.querySelectorAll("#done .task")
var sections=document.querySelectorAll("section")
var barsBtn=document.querySelector("#barsBtn")
var gridBtn=document.querySelector("#gridBtn")
let titleReg=/^[a-z]{3,10}$/
let descReg=/^\S{3,20}$/




var updateIndex

var containeers = {
    nextUp: document.querySelector("#nextUp"),
    inProgress: document.querySelector("#inProgress"),
    done: document.querySelector("#done"),
}
gridBtn.addEventListener("click",function(){
    barsBtn.classList.remove("active")
    gridBtn.classList.add("active")
    for(let i=0;i<sections.length;i++){
        sections[i].classList.remove("col-12")
        sections[i].classList.add("col-md-6","col-lg-4")

    }
    for(let j=0;j<tasks.length;j++){
        tasks[j].removeAttribute("data-view")
    }
})
barsBtn.addEventListener("click",function(){
    gridBtn.classList.remove("active")
    barsBtn.classList.add("active")
    for(let i=0;i<sections.length;i++){
        sections[i].classList.remove("col-md-6","col-lg-4")
        sections[i].classList.add("col-12")
        sections[i].style.overflow="auto"

    }
    for(let j=0;j<tasks.length;j++){
        tasks[j].setAttribute("data-view","bars")
    }
})
function light() {
    root.style.setProperty("--main-black", "#fff")
    root.style.setProperty("--sec-black", "#ddd")
    root.style.setProperty(" --finance-color", "#30a277")
    root.style.setProperty(" --health-color", "#fb882e")
    root.style.setProperty("--productivity-color", "#fc3637")
    root.style.setProperty(" --education-color", "#2e4acd")
    root.style.setProperty("--mid-gray", "#f1f1f1")
    root.style.setProperty("--gray-color", "#333")
    root.style.setProperty("--text-color", "#222")
    lightMode.classList.replace("d-block", "d-none")
    darkMode.classList.replace("d-none", "d-block")

}
function dark() {
    root.style.setProperty("--main-black", "#0d1117")
    root.style.setProperty("--sec-black", "#161b22")
    root.style.setProperty(" --finance-color", "#30a277")
    root.style.setProperty(" --health-color", "f#b882e")
    root.style.setProperty("--productivity-color", "#fc3637")
    root.style.setProperty(" --education-color", "#2e4acd")
    root.style.setProperty("--mid-gray", "#474a4e")
    root.style.setProperty("--gray-color", "#dadada")
    root.style.setProperty("--text-color", "#a5a6a7")
    darkMode.classList.replace("d-block", "d-none")
    lightMode.classList.replace("d-none", "d-block")

}
lightMode.addEventListener("click", light)
darkMode.addEventListener("click", dark)
var tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];
for (var i = 0; i < tasksArr.length; i++) {
    displayTask(i)
}
function clear() {
    titleInput.value = ""
    descriptionInput.value = ""
}
function resetInput() {
    statusInput.value = "nextUp"
    categoryInput.value = "Education"
    titleInput.value = ""
    descriptionInput.value = ""
}
function addTask() {
    if( validation(titleReg,titleInput) && validation(descReg,descriptionInput) ){
        var task = {
            status: statusInput.value,
            category: categoryInput.value,
            title: titleInput.value,
            description: descriptionInput.value,
        }
        tasksArr.push(task)
        window.localStorage.setItem("tasks", JSON.stringify(tasksArr))
        displayTask(tasksArr.length - 1)
        removaModel()
        clear()
    } else{
        window.alert("there is a wrong input")
    }


}
function addNewTask() {
    modal.classList.replace("d-none", "d-flex")
    document.body.style.overflow="hidden"
    window.scroll(0,0)

}

function getColor() {
    var colorChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
    var color = "#"
    for (var i = 0; i < 6; i++) {
        var randomNum = Math.trunc(Math.random() * colorChar.length)
        color += colorChar[randomNum]
    }
    return color + "55";
}
function changeColor(event) {
    event.target.closest(".task").style.backgroundColor = getColor()
}
function deleteItem(index) {
    emptyarr()
    tasksArr.splice(index, 1);
    window.localStorage.setItem("tasks", JSON.stringify(tasksArr))
    for (var i = 0; i < tasksArr.length; i++) {
        displayTask(i)
    }

}
function emptyarr() {
    for (x in containeers) {
        containeers[x].querySelector(".tasks").innerHTML = ""
    }
}
function displayTask(index) {
    var taskHTML = `
    <div class="task">
        <h3 class="text-capitalize">${tasksArr[index].title}</h3>
        <p class="description text-capitalize">${tasksArr[index].description}</p>
        <h4 class="category ${tasksArr[index].category} text-capitalize">${tasksArr[index].category}</h4>
        <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
          <li><i class="bi bi-pencil-square" onclick="showInfo(${index})" ></i></li>
          <li><i class="bi bi-trash-fill" onclick="deleteItem(${index})" ></i></li>
          <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
        </ul>
    </div>
    `
    containeers[tasksArr[index].status].querySelector(".tasks").innerHTML += taskHTML
}
function showInfo(index) {
    addNewTask()
    descriptionInput.value = tasksArr[index].description;
    titleInput.value = tasksArr[index].title;
    categoryInput.value = tasksArr[index].category;
    statusInput.value = tasksArr[index].status;
    addTaskBtn.classList.replace("d-block", "d-none")
    updateBtn.classList.replace("d-none", "d-block")
    updateIndex = index


}
function updateTask() {
    tasksArr[updateIndex].description = descriptionInput.value;
    tasksArr[updateIndex].title = titleInput.value;
    tasksArr[updateIndex].category = categoryInput.value;
    tasksArr[updateIndex].status = statusInput.value;
    window.localStorage.setItem("tasks", JSON.stringify(tasksArr))
    addTaskBtn.classList.replace("d-none", "d-block")
    updateBtn.classList.replace("d-block", "d-none")
    for (var x = 0; x < tasks.length; x++) {
        tasks[x].innerHTML = ""
    }
    removaModel()
    resetInput()
    for (var i = 0; i < tasksArr.length; i++) {
        displayTask(i)
    }
    updateBtn.classList.replace("d-block", "d-none")
    addTaskBtn.classList.replace("d-none", "d-block")
}
function validation(regex,element){
    if (regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.parentElement.nextElementSibling.classList.add("d-none")
        return true

    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.parentElement.nextElementSibling.classList.remove("d-none")

        return false
    }
}
titleInput.addEventListener("input",function(){
    validation(titleReg,titleInput)
})
descriptionInput.addEventListener("input",function(){
    validation(descReg,descriptionInput)
})
updateBtn.addEventListener("click", updateTask)

newTask.addEventListener("click", addNewTask)

function removaModel() {
    resetInput()
    updateBtn.classList.replace("d-block", "d-none")
    addTaskBtn.classList.replace("d-none", "d-block")

    modal.classList.replace("d-flex", "d-none")
    document.body.style.overflow="visible"
}
modal.addEventListener("click", function (e) {
    if (e.target.id == "modal") {
        removaModel()
    }
})
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        removaModel()
    }
})
addTaskBtn.addEventListener("click", function () {
    // removaModel()
    // resetInput()
    addTask()

}
)
