import M from 'messages';

const pages = [
    { id: "users", name: "users", label: M.get('navbar.users'), link: '/users' },
    { id: "todo", name: "todo", label: M.get('navbar.todo'), link: '/todo' },
];

const settings = [
    { id: "logout", name: "logout", label: M.get('navbar.logout') },
];

export { pages, settings };