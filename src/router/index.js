import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue' //@ 
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index'
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox
  }
  //mainbox的嵌套路由, 后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//每次路由跳转之前
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    //如果授权(已经登录过了) next()
    //未授权, 重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      if (!store.state.isGetterRouter) {
        ConfigRouter()
        next({
          path: to.fullPath
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  RoutesConfig.forEach(item => {
    router.addRoute("mainbox", item)
  })

  //改变isGetterRouter =  true

  store.commit("changeGetterRouter",true)
}

export default router
