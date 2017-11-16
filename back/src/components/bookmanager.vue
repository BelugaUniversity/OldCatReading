<template>
<div>
	<div class='row'>
    <ol class='breadcrumb' style="margin-left: 15px;">
      <li class='active'>书籍管理</li>
    </ol>
	</div>
	<div class='row'>
    <div class='col-sm-8'>
      <div class='row'>
        <div class='panel panel-default' style="margin-left: 15px;">
          <div class='panel-body'>
            <div class='row'>
              <div class='col-sm-2 text-center'>
                <strong>书籍总数</strong><br><br>
                <label>{{total}}</label>
              </div>
              <div class='col-sm-2'>
                仙剑 ：<label>{{sword}}</label><br>
                玄幻 ：<label>{{illusion}}</label><br>
                悬疑 ：<label>{{suspense}}</label>
              </div>
              <div class='col-sm-2'>
                奇幻 ：<label>{{strange}}</label><br>
                军事 ：<label>{{military}}</label><br>
                历史 ：<label>{{history}}</label>
              </div>
              <div class='col-sm-2'>
                竞技 ：<label>{{sports}}</label><br>
                科幻 ：<label>{{science}}</label><br>
                校园 ：<label>{{campus}}</label>
              </div>
              <div class='col-sm-2'>
                社会 ：<label>{{society}}</label><br>
                其他 ：<label>{{other}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>

	<div class='row text-left' style='margin: 0 0 20px 0;'>
		<button class='btn btn-info'><router-link to='/createBook/'  style="color: #FFF">创建作品</router-link></button>
	</div>

  <div class="row" style="margin-bottom: 20px;">
    <div class="col-lg-6">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="请输入书名进行搜索" v-model="message" v-on:keyup.enter="searchBook">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" v-on:click="searchBook">搜索</button>
        </span>
      </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
  </div><!-- /.row -->

	<div class="btn-group" role="group" aria-label="...">
		<button type="button" class="btn btn-default" v-on:click="filterBook(0)">All</button>
<!-- 	  <button type="button" class="btn btn-default" v-on:click="filterBook(1)">已上传</button>
	  <button type="button" class="btn btn-default" v-on:click="filterBook(2)">未上传</button> -->
	  <button type="button" class="btn btn-default" v-on:click="filterBook(3)">连载</button>
	  <button type="button" class="btn btn-default" v-on:click="filterBook(4)">完结</button>
	  <button type="button" class="btn btn-default" v-on:click="filterBook(6)">已审核</button>
	  <button type="button" class="btn btn-default" v-on:click="filterBook(5)">未审核</button>
	  <button type="button" class="btn btn-default" v-on:click="filterBook(7)">已屏蔽</button>

	</div>



	<div class='table-responsive'>
    <table class='table table-striped bookMenu'>
      <thead>
      </thead>
      <tbody>
        <tr>
          <th>书名</th>
          <th>最新章节数</th>
          <th>作者</th>
          <th>分类</th>
          <th>状态</th>
          <th>订阅量</th>
          <th>追书</th>
          <th>总访问量</th>
          <th>审核状态</th>
          <th>操作</th>
        </tr>
        <tr v-for='(item, index) in items'>
          <td>
              <img v-bind:src="'http://www.3roo.cn/static/coverImg/'+item.coverImg" style='width:60px; height: 66px; margin-right: 10px;'> {{item.bookName}}
          </td>
          <td v-if='item.chaptersNumber' style='line-height: 66px;'>第{{item.chaptersNumber}}	章</td>
          <td style='line-height: 66px;' v-else>未创建章节</td>
          <td>{{item.author}}</td>
          <td>{{item.type}}</td>

          <td>{{item.state}}</td>
          <td>{{item.subscribersNumber}}</td>
          <td>{{item.chaptersNumber}}</td>
          <td>{{item.clicksNumber}}</td>
          <td>{{VcauditingState(index)}}</td>
          <td>
            <div class='btn-group'>
              <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                操作 <span class='caret'></span>
              </button>
              <ul class='dropdown-menu'>
                <li><router-link v-bind:to="'editor/editbookinfo/'+item.id">编辑书籍</router-link></li>
                <li><a v-on:click="examine(1, item.id)">通过审核</a></li>
                <li><a v-on:click="examine(0, item.id)">不通过审核</a></li>
                <li><a v-on:click="shield(1, item.id)">屏蔽书籍</a></li>
                <li><a v-on:click="shield(0, item.id)">恢复书籍</a></li>
                <li><a href="#">整本下载</a></li>
                <li><a v-on:click="del(item.id)">删除</a></li>
              </ul>
            </div>
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
export default {
	name: 'bookManager',
  data() {
  	return {
	    total: 1,
		  sword: 0,        // 仙剑类型的数量
	    illusion: 0,         // 玄幻类型的数量
	    suspense: 0,      // 悬疑类型的数量
	    strange: 0,      // 奇幻类型的数量
	    military: 0,         // 军事类型的数量
	    history: 0,      // 历史类型的数量
	    sports: 0,      // 竞技类型的数量
	    science: 0,         // 科幻类型的数量
	    campus: 0,      // 校园类型的数量
	    society: 0,         // 社会类型的数量
	    other: 0,       // 其他类型的数量
	    numPage: 1,
	    pageNumber: 1,
      cauditingState: '', //审核状态
	    pages: 10,
	    items: [],
	    message: '',
	    filterState: 0	//当前筛选状态
 	 }
  },
  created:
  	function(){
  		//页面加载的请求
			const _this = this
			$.ajax({
				url: 'http://www.3roo.cn/BookListAPIView/',
				async: false,
				data: {
					numPage: 1
				},
				dataType: 'json',
				type: 'GET',
	      success: function(data) {
	      	_this.clone(data)
	      },
	      error: function() {
	        alert('加载失败');
	      }
      })
      $.ajax({
				url: 'http://www.3roo.cn/BookNumberAPIView/',
				async: false,
				data: {
				},
				dataType: 'json',
				type: 'GET',
	      success: function(data) {
	      	_this.total = data.amount,
	      	_this.sword = data.sword,
	      	_this.illusion = data.illusion,
	      	_this.suspense = data.suspense,
	      	_this.strange = data.strange,
	      	_this.military = data.military,
	      	_this.history = data.history,
	      	_this.sports = data.sports,
	      	_this.science = data.science,
	      	_this.campus = data.campus,
	      	_this.society = data.society,
	      	_this.other = data.other
	      }
      })
		},
  methods: {
    VcauditingState: function(index){
      //审核中文
      if(this.items[index].auditingState){
        return '通过'
      }else{
        console.log(this.items[index].auditingState)
        return '未通过'
      }
    },
  	examine: function(n, id){
  		//审核请求
  		const _this = this
  		$.ajax({
  			url: 'http://www.3roo.cn/AuditingBookAPIView/',
  			async: false,
  			data: {
  				bookId: id,
  				auditingState: n
  			},
  			dataType: 'json',
  			type: 'GET',
        success: function(data) {
        	if(data.state){
        		_this.filterBook(_this.filterState)
        	}else{
        		alert("阿哦，失败了")
        	}
        },
        error: function() {
          alert('筛选失败');
        }
  		})
  	},
  	shield: function(n, id){
  		//屏蔽请求
  		const _this = this
  		$.ajax({
  			url: 'http://www.3roo.cn/IsShowBookAPIView/',
  			async: false,
  			data: {
  				bookId: id,
  				isShow: n
  			},
  			dataType: 'json',
  			type: 'GET',
        success: function(data) {
        	if(data.state){
        		_this.filterBook(_this.filterState)
        	}else{
        		alert("阿哦，失败了")
        	}
        },
        error: function() {
          alert('筛选失败');
        }
  		})
  	},
  	filterBook: function(n){
  		//筛选书籍
  		this.filterState = n
      this.numPage = 1
  		const _this = this
  		$.ajax({
  			url: 'http://www.3roo.cn/BookFilterAPIView/',
  			async: false,
  			data: {
  				filter: n,
          numPage: _this.numPage
  			},
  			dataType: 'json',
  			type: 'GET',
        success: function(data) {
         console.log(data)
			    _this.clone(data)
        },
        error: function() {
          alert('筛选失败');
        }
  		})
  	},
  	searchBook: function(){
  		//搜索书籍
  		const _this = this
  		$.ajax({
  			url: 'http://www.3roo.cn/AdminSearchBookAPIView/',
  			async: false,
  			data: {
  				search: this.message
  			},
  			dataType: 'json',
  			type: 'GET',
        success: function(data) {
        	_this.clone(data)
        },
        error: function() {
          alert('搜索失败');
        }
  		})
  	},

    clone: function (obj) {
    	//更新书籍列表
      this.items = obj.bookList
      this.pageNumber = obj.pageNumber
    },

    del: function (id) {
    	//删除书籍
    	const _this = this
      $.ajax({
        url: 'http://www.3roo.cn/DeleteBookAPIView/',
        async: false,
        data: {
          bookId: id
        },
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          if (data.state) {
            alert("删除成功")
        		_this.filterBook(_this.filterState)
        	}
        },
        error: function() {
          alert('错误');
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
    }
	}
}
</script>


<style>
.bookMenu tbody tr td {
    line-height: 66px;
}

.sub-header span {
    color: #AAA;
}

.funcButton a {
    height: 33%;
    width: 100%;
}

.bookMenu tbody tr td{
  line-height: 66px;
}
</style>
