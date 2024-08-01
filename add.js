//set up add icon
const add_text = document.querySelector('.add-button-text');
const add_button = document.querySelector('.add-button');
const text_box = document.getElementById('task')

add_button.addEventListener('mouseenter', () => {
    add_text.style.opacity = '1';
    text_box.style.width = '200px';
});

add_button.addEventListener('mouseleave', () => {
    add_text.style.opacity = '0';
    text_box.style.width = '50px';
});

//show and hide add-task-view
const add_task_view = document.querySelector('.add-task-view');
const buttons = document.querySelectorAll('button')

add_button.addEventListener('click', ()=>{
    add_task_view.style.display = 'flex';
});

buttons.forEach(button =>{
    button.addEventListener('click', (e) =>{
        add_task_view.style.display = 'none';
    });
});