import Vue from 'vue'
import Router from 'vue-router'
import bookmanager from '@/components/bookmanager'
import comment from '@/components/commentManage'
import userManager from '@/components/user'
import data from '@/components/datastatistics'
import creatBook from '@/components/creatBook'
import mainEditor from '@/components/editor/mainEditor'
import editbookinfo from '@/components/editor/editbookinfo'
import writeChaer from '@/components/editor/writeChaer'
import publish from '@/components/editor/publish'
import commentManager from '@/components/editor/commentManager'
import indent from '@/components/indent'

Vue.use(Router)
const Bar = { template: '<div>bar</div>' }

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: bookmanager
    },
    {
      path: '/comment',
      component: comment
    },
    {
      path: '/userManager',
      component: userManager
    },
    {
      path: '/datastatistics',
      component: data
    },
    {
      path: '/editor',
      component: mainEditor,
      children: [{
        path: 'editbookinfo/:bookId',
        component: editbookinfo

      },
      {
        path: 'WriteChapter/:bookId',
        component: writeChaer
      },
      {
        path: 'publish/:bookId',
        component: publish
      },
      {
        path: 'commentManager/:bookId',
        component: commentManager
      }
      ]
    },
    {
      path: '/createBook',
      component: creatBook
    },
    {
      path: '/indent',
      component: indent
    }
  ]
})
