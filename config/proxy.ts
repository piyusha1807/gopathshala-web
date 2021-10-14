/**
 * In the production environment, the proxy cannot take effect, 
 * so there is no production environment configuration here
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/server/api/': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/server/api/': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/server/api/': {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
