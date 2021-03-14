export default ({
  app
}) => {
  try {
    const routes = [].slice.call(app.router.options.routes).map(item => {
      return item.path
    })
    app.router.beforeEach(async (to, from, next) => {

      if (!to.path || to.path === '/') {
        next({
          path: '/article'
        })
      } else {
        next()
      }
    })
  } catch (e) {
    throw new Error('Plugins Exception: Route Plugins occourn error')
  }
}
