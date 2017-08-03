import Vue from 'vue'
import Router from 'vue-router'
import Left from '../components/left.vue'
import r_h from '../components/right/right_head.vue'
import r_n from '../components/right/right_nav.vue'
import r_m from '../components/right/right_main.vue'
import r_n_regDriver from '../components/addDriver/addRegDriver.vue'
import r_n_newDriver from '../components/addDriver/addNewDriver.vue'
import r_m_order from '../components/right/order.vue'
import r_m_source from '../components/right/source.vue'
// import Hello from '@/components/Hello'
// import main from '../components/main.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:r_n,
        right_main:r_m,
      },
      // children:[
      //   {
      //     path:'driverList',
      //     children:[
      //       {
      //         path:'/'
      //       },
      //       // {
      //       //   path:'addNewDriver',
      //       //   components:{
      //       //     right_main:Hello,
      //       //   }
      //       // },
      //       // {
      //       //   path:'addRgDriver',
      //       //   components:{
      //       //     right_main:Hello,
      //       //   }
      //       // }
      //     ]
      //   }
      // ]
    },
    {
      path: '/driverList',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:r_n,
        right_main:r_m,
      },
    },
    {
      path: '/driverList/addNewDriver',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:r_n,
        right_main:r_n_newDriver,
      },
    },
    {
      path: '/driverList/addRegDriver',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:r_n,
        right_main:r_n_regDriver,
      },
    },
    {
      path: '/sourceList',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:null,
        right_main:r_m_source,
      },
    },
    {
      path: '/order',
      components: {
        left:Left,
        'right_head':r_h,
        right_nav:null,
        right_main:r_m_order,
      },
    },
  ]
})
