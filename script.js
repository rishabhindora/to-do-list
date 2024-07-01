/* ========declaration of all the variables========== */

taskArray=[]

let input=document.getElementById('input-box');
let listContainer=document.querySelector('#list-container')
let tasksLeft=document.getElementsByClassName("task-left")[0];
let all = document.getElementById('all')
let incomplete = document.getElementById('incomplete')
let complete = document.getElementById('complete')
let clearAll=document.querySelector('.clear-all > span');

/*============ All the functions are here =========*/

/* ------Function to add  task in list------- */
function addTask(){
    
    let  testValue = input.value;
    testValue=testValue.replace(/\s/g, "");
    if (input.value === ''){
        alert ("Empty tasks? Feed me words, not air!")
        input.value=''
        return
    }
    else if ( testValue=='' ) {
        alert ("I don't need SPACES, I deserve better!")
        input.value=''
        return
    }
    

    let task={}
    task.name=input.value;
    task.id= generateUniqueId();
    task.status=false; //for marking as completed or not
    taskArray.push(task);
    input.value='';
    saveData();
    render();
};

/* ----Function to delete task from the array---- */
function deleteTask(id){
    for (let i =0 ;i<taskArray.length;i++){
        if (taskArray[i].id === id) {
            taskArray.splice(i,1);
            break;
        }
    }
    saveData();
    render();

}

/* ----Function to mark Task as completed or not---- */
function toggleCheck(id){
    for(let i=0;i<taskArray.length;i++){
       if(taskArray[i].id==id){
            taskArray[i].status=!taskArray[i].status;
            break;
        }           
    }
    saveData();
    render();
}

/* ----Function to Generate uniqueId---- */ 
function generateUniqueId() {
    let currentDate = new Date();

    // Construct a unique ID using the current date and time components
    const uniqueId = `${currentDate.getDate()}${currentDate.getMonth()}${currentDate.getFullYear()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}`;
    return uniqueId.toString();
}

/* ---Function to update tasks left--- */
function  taskLeftFunction(){
    let tasksleft=0;
    for(let i=0;i<taskArray.length;i++){
        if(taskArray[i].status===false){
            tasksleft+=1;
        }
    }
    return tasksleft;
}

function toggleActiveForTaskFilter(element){
    let spans=document.querySelectorAll('.task-filter > span')
    for (let i=0; i<spans.length;i++){
        spans[i].classList.remove('active')
    }
    element.classList.add("active");
}

/* ----|||Function to Render the Tasks from array|||---- */

function render(){
    if (listContainer.getAttribute('renderingMode')=='All'){
        renderTasks();
    }
    else if(listContainer.getAttribute('renderingMode')=="complete"){
        renderComplete();
    }
    else{
        renderIncomplete();
    }

    tasksLeft.innerText= taskLeftFunction();
    if (taskArray.length === 0){
        clearAll.style.display="none";
    }
    else{
        clearAll.style.display="block";
    }
}

function renderTasks(){
    listContainer.innerHTML="";
    for(let i=0; i<taskArray.length;i++){
        
        let li=document.createElement('LI');
        li.id=taskArray[i].id;
        if (taskArray[i].status){
            li.classList.add('checked')       
        }
        else{
            li.classList.remove('checked')
        }
        li.innerText=taskArray[i].name;
        let span=document.createElement('SPAN');
        span.innerText='\u00d7'; //Cross mark symbol
        li.appendChild(span);
        listContainer.appendChild(li);
    }        
};

/* ----Function to render only completed tasks---- */

function renderComplete(){
    listContainer.innerText='';
    for (let i=0;i<taskArray.length;i++) {
        if (taskArray[i].status){
            let li=document.createElement('LI');
            li.id=taskArray[i].id;
        if (taskArray[i].status){
            li.classList.add('checked')       
        }
        else{
            li.classList.remove('checked')
        }
        li.innerText=taskArray[i].name;
        let span=document.createElement('SPAN');
        span.innerText='\u00d7'; //Cross mark symbol
        li.appendChild(span);
        listContainer.appendChild(li);
        }
    }
}
/* ----Function to render only completed tasks---- */
function renderIncomplete(){
    listContainer.innerText='';
    for (let i=0;i<taskArray.length;i++) {
        if (!taskArray[i].status){
            let li=document.createElement('LI');
            li.id=taskArray[i].id;
        if (taskArray[i].status){
            li.classList.add('checked')       
        }
        else{
            li.classList.remove('checked')
        }
        li.innerText=taskArray[i].name;
        let span=document.createElement('SPAN');
        span.innerText='\u00d7'; //Cross mark symbol
        li.appendChild(span);
        listContainer.appendChild(li);
        }
    }
};



/* ------Function to save TaskArray------- */
function saveData(){
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
}

// Retrieve data upon loading of page
window.onload = function () {
    retrieveData();
};

/* -------Function to retrieve saved tasks---------*/
function retrieveData() {
    let storedTaskArray = JSON.parse(localStorage.getItem("taskArray"));
    if (storedTaskArray !== null) {
      taskArray = storedTaskArray;
      render();
    }  
}

/* |||||||||-------Executions------||||||||| */
tasksLeft.innerText='0'
listContainer.setAttribute('renderingMode','All');


/* =========All Event Listners========== */

clearAll.addEventListener( "click" , function(){taskArray=[];
    saveData();
    render();
});

/* ---input event listener--- */
input.addEventListener("keydown", function (event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

/* ---list Container Event Listner--- */
listContainer.addEventListener('click',function(e){
    
    // Task Clicked Event Listner
    if(e.target.tagName==='LI'){
        toggleCheck(e.target.id)
        /* e.target.classList.toggle('checked'); */
    }
    // Delete Clicked Event Listner
    else if(e.target.tagName==='SPAN'){
        let id =e.target.parentElement.id;
        deleteTask(id);
    }
});




/* ---Change rendering mode --- */
all.addEventListener('click', function(){
    listContainer.setAttribute('renderingMode','All');
    toggleActiveForTaskFilter(all);
    render();
} );
incomplete.addEventListener('click', function(){
    listContainer.setAttribute('renderingMode','incomplete');
    toggleActiveForTaskFilter(incomplete);
    render();
} );
complete.addEventListener('click', function(){
    listContainer.setAttribute('renderingMode','complete');
    toggleActiveForTaskFilter(complete);
    render();
} );