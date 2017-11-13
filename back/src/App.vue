<template>
  <div id="app">
    <v-pre></v-pre>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li><router-link to="/">书籍管理</router-link ></li>
            <li><router-link to="/userManager/">用户管理</router-link></li>
            <li><router-link to="/comment/">推荐管理</router-link></li>
            <li><router-link to="/datastatistics/">数据统计</router-link></li>
            <li><router-link to="/indent/">订单统计</router-link></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pre from '@/components/pre.vue'
export default {
  name: 'app',
  components: {
    'v-pre': pre
  }
}
</script>
