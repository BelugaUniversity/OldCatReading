<template>
	<div>
	 <div class="row">
		  <div class="col-lg-6" style="margin-bottom: 20px;">
		    <div class="input-group">
		      <input type="text" class="form-control" placeholder="请输入书名进行搜索" v-model="message" v-on:keyup.enter="searchBook">
		      <span class="input-group-btn">
		        <button class="btn btn-default" type="button" v-on:click="searchBook">搜索</button>
		      </span>
		    </div><!-- /input-group -->
		  </div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
		<div class='table-responsive'>
	    <table class='table table-striped bookMenu'>
	        <thead>
	        </thead>
	        <tbody>
	            <tr>
	                <th>书名</th>
	                <th>作者</th>
	                <th>分类</th>
	                <th>搜索展示</th>
	                <th>热门推荐</th>
	                <th>免费精品</th>
	                <th>上架精品</th>
	                <th>新书推荐</th>
	                <th>点击榜</th>
	                <th>订阅榜</th>
	                <th>追书榜</th>
	            </tr>
	            <tr v-for='item in items'>
	                <td>
	                    <img v-bind:src="'http://www.3roo.cn/static/coverImg/'+item.coverImg" style='width:60px; height: 66px; margin-right: 10px;'> {{item.bookName}}
	                </td>                            
	                <td>{{item.author}}</td>
	                <td>{{item.type}}</td>
	                <td v-for="(selected, index) in item.positions">
                	  <v-select :numberLists="numberLists(kindNumbers[index])" :defaultData="selected" :bookId="item.id" :index="index"></v-select>
	                </td>
	            </tr>
	        </tbody>
	    </table>
	</div>

	<nav class='text-right' style='margin-bottom: 50px;'>
	    <span>页数:{{ numPage }}/{{ pageNumber }}</span>
	    <button v-on:click='turnPage(numPage-1)' type='button' class='btn btn-primary' style='margin-left: 10px;'>上一页</button>
	    <button v-on:click='turnPage(numPage+1)' type='button' class='btn btn-primary' style='margin-left: 5px;'>下一页</button>
	</nav>
	</div>
</template>
<script>
	import selected from '@/components/selected'
	export default {
		name: 'comment',
		data: function () {
			return {
				items: [],
				numPage: 1,
				pageNumber: '',
				message: '',
				kindNumbers: [3, 6, 6, 6, 6, 10, 10, 10],		//每个标签有的位置数
				positions: [1, 2, 3, 4, 5, 6, 7, 8]		//每个标签的位置
			}
		},

		created:
			function(){
				//页面加载
				var _this = this;
				$.get('http://www.3roo.cn/RecommendBookListAPIView', {
		        numPage: 1
		    }, function(data) {
			        _this.clone(data);
			    })
			},

		methods: {
	    clone: function (obj) {
	    	//更新书籍列表
		    this.items = obj.bookList
		    this.pageNumber = obj.pageNumber
	    },
	  	searchBook: function(){
	  		//搜索书籍
	  		var _this = this
	  		console.log(this.message);
	  		$.ajax({
	  			url: 'http://www.3roo.cn/RecommendSearchBookAPIView/',
	  			async: false,
	  			data: {
	  				search: this.message
	  			},
	  			dataType: 'json',
	  			type: 'GET',
	        success: function(data) {
	        	//data = $.parseJSON(data);
	          console.log(data);
	          _this.clone(data)
	        },
	        error: function() {
	          alert('搜索失败');
	        }
	  		})
	  	},
	  	turnPage: function (numPage) {
    	//书籍翻页
	      const _this = this
	      if(numPage<=_this.pageNumber&&numPage>0)
	      {
	        _this.numPage = numPage
	        $.get('http://www.3roo.cn/BookListAPIView/', {
	          numPage: numPage
	        }, function(data) {
	            //data = $.parseJSON(data);
	          _this.clone(data);
	        });
	      }
	    },
	    numberLists: function(n) {
	    	//设置专栏书籍数量
				var list = new Array()
				for (var i = 0; i < n; i++) {
					list[i] = i + 1
				}
				return list
				}
			},

		components: {
			'v-select': selected
		}
	}
</script>