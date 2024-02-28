// webpack
// const modulesFiles = require.context('./options', true, /index.js$/)
// let modules = {}
// modulesFiles.keys().forEach((item) => {
//   modules = Object.assign({}, modules, modulesFiles(item).default)
// })
// export default modules

// vite
const modulesFiles = import.meta.globEager('./options/**/*.js')
let modules = {}
Object.keys(modulesFiles).forEach((item) => {
  modules = Object.assign({}, modules, modulesFiles[item].default)
})
export default modules
