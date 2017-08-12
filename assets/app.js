function todoStorage() {
  var defaultTasks = '[{"text": "Add some tasks", "completed": false}]'
  var storageAddress = 'todoStorage'
  return {
    fetch: function() {
      return JSON.parse(localStorage.getItem(storageAddress) || defaultTasks)
    },
    save: function(todos) {
      localStorage.setItem(storageAddress, JSON.stringify(todos))
    }
  }
}

var app = new Vue({
  el: '#app',
  data () {
    return {
      todos: todoStorage().fetch(),
      newTodo: '',
    }
  },
  methods: {
    addTodo: function() {
      console.log('adding a todo');
      this.todos.push({text: this.newTodo, completed: false});
      this.newTodo = '';
    },
    removeCompleted: function() {
      console.log('removing completed');
      this.todos = this.todos.filter(function(item) { return !item.completed });
    },
    removeTodo: function(todo) {
      console.log('removing a todo', todo);
      let hasDeleted = false;
      this.todos = this.todos.filter(function(item) {
        if (!hasDeleted) {
          let match = item.text === todo.text &&
            item.completed === todo.completed;
          if (match) {
            hasDeleted = true;
          }
          return !match;
        }
        return true;
      });
    },
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage().save(todos);
      },
      deep: true
    }
  }
})
