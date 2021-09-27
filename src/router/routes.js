
const routes = [
  {
    // path: '/',
    // component: () => import('src/App.vue'),
    // children: [
    //   {
        path: '/',
        component: () => import('pages/Index'),
        children: [
          {
            path: '/',
            component: () => import('pages/Home')
          },
          {
            path: '/cart',
            component: () => import('pages/Cart')
          }
        ]
    //   },
    // ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
