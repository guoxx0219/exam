import Vue from 'vue'
import Router from 'vue-router'
//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入vue-resource，可以进行http请求的发送
import VueResource from  'vue-resource'

import login from '../components/login/login.vue'

//manager
import manager from '../components/manager/manager.vue'

import managerDir from '../components/manager/direction/managerDir.vue'
import dirUpdate from '../components/manager/direction/dirUpdate.vue'
import dirAdd from '../components/manager/direction/dirAdd.vue'

import managerStage from '../components/manager/stage/managerStage.vue'
import stageUpdate from '../components/manager/stage/stageUpdate.vue'
import stageAdd from '../components/manager/stage/stageAdd.vue'

import managerClass from '../components/manager/classes/managerClass.vue'
import classUpdate from '../components/manager/classes/classUpdate.vue'
import classAdd from '../components/manager/classes/classAdd.vue'

import managerTea from '../components/manager/teacher/managerTea.vue'
import teaUpdate from '../components/manager/teacher/teaUpdate.vue'
import teaAdd from '../components/manager/teacher/teaAdd.vue'

import managerStu from '../components/manager/student/managerStu.vue'
import stuUpdate from '../components/manager/student/stuUpdate.vue'
import stuAdd from '../components/manager/student/stuAdd.vue'

//teacher
import teacher from '../components/teacher/teacher.vue'

import managerTypes from '../components/teacher/types/managerTypes.vue'
import typesAdd from '../components/teacher/types/typesAdd.vue'
import typesUpdate from '../components/teacher/types/typesUpdate.vue'

import managerTest from '../components/teacher/test/managerTest.vue'
import testAdd from '../components/teacher/test/testAdd.vue'
import testUpdate from '../components/teacher/test/testUpdate.vue'

import managerPaper from '../components/teacher/paper/managerPaper.vue'
import paperAdd from '../components/teacher/paper/paperAdd.vue'
import paperUpdate from '../components/teacher/paper/paperUpdate.vue'

import student from '../components/student/student.vue'
import studentExam from '../components/student/studentExam.vue'
import studentPaper from '../components/student/studentPaper.vue'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueResource)

export default new Router({
  routes: [
      {
        path:'/',
          name:'login',
          component:login
      },
      {
          path:'/manager',
          name:'manager',
          component:manager,
          children:[
              {
                  path:'managerDir',
                  name:'managerDir',
                  component:managerDir
              },
              {
                  path:'dirUpdate',
                  name:'dirUpdate',
                  component:dirUpdate
              },
              {
                  path:'dirAdd',
                  name:'dirAdd',
                  component:dirAdd
              },
              {
                  path:'managerStage',
                  name:'managerStage',
                  component:managerStage
              },
              {
                  path:'stageUpdate',
                  name:'stageUpdate',
                  component:stageUpdate
              },
              {
                  path:'stageAdd',
                  name:'stageAdd',
                  component:stageAdd
              },
              {
                  path:'managerClass',
                  name:'managerClass',
                  component:managerClass
              },
              {
                  path:'classUpdate',
                  name:'classUpdate',
                  component:classUpdate
              },
              {
                  path:'classAdd',
                  name:'classAdd',
                  component:classAdd
              },
              {
                  path:'managerTea',
                  name:'managerTea',
                  component:managerTea
              },
              {
                  path:'teaUpdate',
                  name:'teaUpdate',
                  component:teaUpdate
              },
              {
                  path:'teaAdd',
                  name:'teaAdd',
                  component:teaAdd
              },
              {
                  path:'managerStu',
                  name:'managerStu',
                  component:managerStu
              },
              {
                  path:'stuUpdate',
                  name:'stuUpdate',
                  component:stuUpdate
              },
              {
                  path:'stuAdd',
                  name:'stuAdd',
                  component:stuAdd
              }
          ]
      },
      {
          path:'/teacher',
          name:'teacher',
          component:teacher,
          children:[
              {
                  path:'managerTypes',
                  name:'managerTypes',
                  component:managerTypes,
              },
              {
                  path:'typesAdd',
                  name:'typesAdd',
                  component:typesAdd,
              },
              {
                  path:'typesUpdate',
                  name:'typesUpdate',
                  component:typesUpdate,
              },
              {
                  path:'managerTest',
                  name:'managerTest',
                  component:managerTest,
              },
              {
                  path:'testAdd',
                  name:'testAdd',
                  component:testAdd,
              },
              {
                  path:'testUpdate',
                  name:'testUpdate',
                  component:testUpdate,
              },
              {
                  path:'managerPaper',
                  name:'managerPaper',
                  component:managerPaper,
              },
              {
                  path:'paperAdd',
                  name:'paperAdd',
                  component:paperAdd,
              },
              {
                  path:'paperUpdate',
                  name:'paperUpdate',
                  component:paperUpdate,
              },
          ]
      },
      {
          path:'/student',
          name:'student',
          component:student,
          children:[
              {
                  path:'studentExam',
                  name:'studentExam',
                  component:studentExam
              },
              {
                  path:'studentPaper',
                  name:'studentPaper',
                  component:studentPaper
              },
          ]
      }
  ]
})
