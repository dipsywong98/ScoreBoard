import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld'
import Panel from './Panel'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/hello', component: HelloWorld }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h=>h(window.location.href.match('panel')?Panel:App)
}).$mount('#app')
