const G_USERS_AUTHORITY = ['su','ad'];

export const users = {
    path: '/users',
    name: 'Users',
    icon: 'UserOutlined',
    authority: G_USERS_AUTHORITY,
    routes: [
        {
            path: '/users/:userTypes/list',
            component: './Users/list',
            hideInMenu: true,
        },
        {
            path: '/users/admins/list',
            name: 'Admins',
            component: './Users/list',
        },
        {
            path: '/users/staffs/list',
            name: 'Staffs',
            component: './Users/list',
        },
        {
            path: '/users/students/list',
            name: 'Students',
            component: './Users/list',
        },
        {
            path: '/users/:userId/form',
            component: './Users/form',
            hideInMenu: true,
        },
        {
            path: '/users/new/form',
            name: 'Add User',
            component: './Users/form',
        },
        {
            component: './404',
        },
    ],
};
