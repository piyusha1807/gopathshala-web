const G_COURSES_AUTHORITY = ['su','ad', 'st', 'stu'];

export const courses = {
  path: '/courses',
  name: 'Courses',
  icon: 'ReadOutlined',
  authority: G_COURSES_AUTHORITY,
  routes: [
    {
      path: '/courses',
      name: 'Courses',
      component: './Courses',
      hideInMenu: true,
    },
    {
      path: '/courses/:courseId',
      name: 'Curriculum',
      component: './Courses/courseMenu',
      hideInMenu: true,
      routes: [
        {
          path: '/courses/:courseId/curriculum',
          name: 'Curriculum',
          component: './Courses/curriculum',
          hideInMenu: true,
        },
        {
          path: '/courses/:courseId/pricing',
          name: 'Pricing',
          component: './Courses/pricing',
          hideInMenu: true,
        },
        {
          path: '/courses/:courseId/certificate',
          name: 'Certificate',
          component: './Courses/certificate',
          hideInMenu: true,
        },
        {
          path: '/courses/:courseId/students',
          name: 'Students',
          // component: './Courses/students',
          hideInMenu: true,
        },
        {
          path: '/courses/:courseId/settings',
          name: 'Course Settings',
          component: './Courses/settings',
          hideInMenu: true,
        },
      ]
    },
    // {
    //   path: '/courses/:courseId/courseView',
    //   name: 'Course View',
    //   component: './Courses/courseView',
    // },
    {
      component: './404',
    },
  ],
};
