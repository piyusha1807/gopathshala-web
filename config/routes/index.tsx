import { home } from "./home";
import { analytics } from "./analytics";
import { courses } from "./courses";
import { website } from "./website";
import { webpage } from "./webpage";
import { users } from "./users";
import { user } from "./user";

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        redirect: '/webpage',
      },
      webpage,
      user,
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/courses/:courseId/courseView',
            component: '../layouts/BlankLayout',
            routes: [
              {
                path: '/courses/:courseId/courseView',
                name: 'Course View',
                component: './Courses/courseView',
              }
            ]
          },
          {
            path: '/website/editor',
            component: '../layouts/BlankLayout',
            routes: [
              {
                path: '/website/editor',
                name: 'Editor',
                component: './Website/editor',
              },
            ]
          },
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['user'],
            routes: [
              home,
              analytics,
              users,
              website,
              courses,
              {
                component: './404',
              },
            ],
          },
          
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
