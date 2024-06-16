document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('todoForm')
  const input=document.getElementById('todoInput')
  const list=document.getElementById('todoList')
  const completedList = document.getElementById('completedList');

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTask(input.value);
    input.value='';
  });
  function addTask(task){
    const li=document.createElement('li');
    li.textContent=task;

    const completeButton =document.createElement('button');
    completeButton.textContent='Complete';
    completeButton.addEventListener('click',()=>{
      completeTask(li);
    });
    const deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click',()=>{
      li.remove();
    });
    li.append(completeButton);
    li.append(deleteButton);
    list.appendChild(li);
  }
  function completeTask(taskElement) {
    taskElement.classList.add('completed');
    taskElement.querySelector('button').remove();
    completedList.appendChild(taskElement);
}
});