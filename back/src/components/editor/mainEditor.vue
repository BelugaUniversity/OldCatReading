<template>
	<div>
		<ol class="breadcrumb">
	    <li><router-link to="/bookManager/">作品管理</router-link></li>
	    <li class="active">{{bookName}}</li>
	  </ol>
	  <ul class="nav nav-tabs">
	    <li><router-link :to="'/editor/editbookinfo/'+bookId">作品设置</router-link></li>
	    <li><router-link v-bind:to="'/editor/WriteChapter/'+bookId">章节写作</router-link></li>
	    <li><router-link v-bind:to="'/editor/publish/'+bookId">已发布章节</router-link></li>
	    <li><router-link v-bind:to="'/editor/commentManager/'+bookId">评论管理</router-link></li>
	  </ul>
		<router-view></router-view>
</div>
</template>
<script>
//console.log($route.params.bookId)
export default{
	mounted:
	function(){
		this.bookId = this.$route.params.bookId
		var _this = this
		$.ajax({
      url: 'http://www.3roo.cn/ShowBookInfoAPIView/',
      async: false,
      data: {
        bookId: _this.bookId
      },
      dataType: 'json',
      type: 'GET',
      success: function(data) {
      	_this.bookName = data.bookName
      },
      error: function() {
        alert('错误')
      }
    })
	},
	data() {
		return{
			bookId: 0,
			bookName: ''	
		}
	}
}
</script>
