export const user = {
  path: '/user',
  component: '../layouts/UserLayout',
  routes: [
    {
      path: '/user',
      redirect: '/user/login',
    },
    {
      name: 'Login',
      path: '/user/login',
      component: './User/login',
    },
    {
      name: 'Register',
      path: '/user/register',
      component: './User/register',
    },
    {
      name: 'Email-Verification',
      path: '/user/verify/email',
      component: './User/verification',
    },
    {
      name: 'Forgot-Password',
      path: '/user/forgot',
      component: './User/forgot',
    },
    {
      component: './404',
    },
  ],
};
