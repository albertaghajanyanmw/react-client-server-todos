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
    { id: "name", name: "name", label: M.get('todo.modal.name'), type: "text", variant: "outlined", required: true },
    { id: "expireDate", name: "expireDate", label: M.get('todo.modal.expireDate'), type: "datetime-local", variant: "outlined", minDate: '', required: false },
  ]
}

const tableOptions = {
  todo: {
    fields: [
      { id: 'id', label: 'todo.modal.id', type: 'text', sortable: true, width: '15%' },
      { id: 'name', label: 'todo.modal.name', type: 'text', sortable: true, width: '35%' },
      { id: 'expireDate', label: 'todo.modal.expireDate', type: 'text', sortable: true, width: '25%' },
      { id: 'status', label: 'todo.modal.status', type: 'text', sortable: true, width: '15%' },
    ],
    rowsPerPageOptions: [3, 5, 10, 25, 50, 100],
    searchFields: ['name']
  }
};
export { options, addTodoOptions, tableOptions };