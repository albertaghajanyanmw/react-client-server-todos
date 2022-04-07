import M from 'messages';

const options = {
  selectTitle: 'Status',
  todoStatuses: [
    { id: "all", name: "all", label: M.get('todo.statuses.all'), value: 'all' },
    { id: "inprogress", name: "inprogress", label: M.get('todo.statuses.inprogress'), value: 'inprogress' },
    { id: "completed", name: "completed", label: M.get('todo.statuses.completed'), value: 'completed' },
  ]
}

const addTodoOptions = {
  inputs: [
    { id: "name", name: "name", autoFocus: true, label: M.get('todo.modal.name'), type: "text", variant: "outlined", required: true },
    { id: "estimatedDate", name: "estimatedDate", label: M.get('todo.modal.estimatedDate'), type: "datetime-local", variant: "outlined", required: false },
  ]
};

const remindTodoOptions = {
  inputs: [
    { id: "reminderDate", name: "reminderDate", label: M.get('todo.modal.reminderDate'), type: "datetime-local", variant: "outlined", required: true },
  ]
};

const tableOptions = {
  todo: {
    fields: [
      { id: 'id', label: 'todo.table.id', type: 'text', sortable: true, width: '15%' },
      { id: 'name', label: 'todo.table.name', type: 'text', sortable: true, width: '25%' },
      { id: 'estimatedDate', label: 'todo.table.estimatedDate', type: 'text', sortable: true, width: '25%' },
      { id: 'status', label: 'todo.table.status', type: 'text', sortable: true, width: '15%' },
      { id: 'userName', label: 'todo.table.user', type: 'text', sortable: false, width: '15%' },
    ],
    rowsPerPageOptions: [3, 5, 10, 25, 50, 100],
    searchFields: ['name']
  }
};
export { options, addTodoOptions, tableOptions, remindTodoOptions };