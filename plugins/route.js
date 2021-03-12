
export default ({ app }) => {
  app.router.beforeEach(async (to, from, next) => {
    if (!to.path || to.path === '/') {
      next({
        path: '/article'
      })
    } else {
      next()
    }
  })
}
