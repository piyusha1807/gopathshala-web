export const webpage = {
  path: '/webpage',
  component: '../layouts/WebpageLayout',
  routes: [
    {
      name: 'webpage',
      path: '/webpage',
      component: './webpage',
    },
    {
      component: './404',
    },
  ],
};
