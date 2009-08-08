// Wait for DOM to be ready (2009 style)
document.observe('dom:loaded', function() {
    // Todo List functionality
    var todoForm = $('todo-form');
    var todoList = $('todo-list');
    var newTodo = $('new-todo');

    // Handle input focus for placeholder-like behavior
    newTodo.observe('focus', function() {
        if (this.value === 'Add a new task...') {
            this.value = '';
        }
    });

    newTodo.observe('blur', function() {
        if (this.value === '') {
            this.value = 'Add a new task...';
        }
    });

    todoForm.observe('submit', function(e) {
        e.stop();
        var task = newTodo.value;
        if (task.strip() && task !== 'Add a new task...') {
            var li = new Element('li');
            li.update(task);
            
            // Add delete button
            var deleteBtn = new Element('button', {
                'class': 'delete-btn'
            }).update('×');
            
            deleteBtn.observe('click', function() {
                li.fade({
                    duration: 0.5,
                    afterFinish: function() {
                        li.remove();
                    }
                });
            });
            
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
            newTodo.value = 'Add a new task...';
        }
    });

    // Effects Demo
    var fadeButton = $('fade-button');
    var fadeElement = $('fade-element');
    
    fadeButton.observe('click', function() {
        if (fadeElement.visible()) {
            fadeElement.fade({
                duration: 0.5
            });
        } else {
            fadeElement.appear({
                duration: 0.5
            });
        }
    });

    // AJAX Demo
    var loadButton = $('load-data');
    var ajaxResult = $('ajax-result');
    
    loadButton.observe('click', function() {
        // Simulate AJAX request with a timeout
        ajaxResult.update('Loading...');
        
        new Ajax.Request('dummy-data.json', {
            method: 'get',
            onSuccess: function(transport) {
                var response = transport.responseText.evalJSON();
                ajaxResult.update(response.message);
            },
            onFailure: function() {
                ajaxResult.update('Error loading data');
            }
        });
    });
}); 