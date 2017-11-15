<template>
	<div>
		<div class="table-responsive">
	    <table class="table table-striped">
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>章节数</th>
            <th>章节名</th>
            <th>字数</th>
            <th>浏览量</th>
            <th>章节价格</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in items">
            <td>第{{ item.chaptersId }}章</td>
            <td>{{ item.chaptersName }}</td>
            <td>{{ item.wordNumber }}</td>
            <td>{{ item.chaptersPV }}</td>
            <td>{{ item.chapterMoney }}</td>
            <td>{{ item.updateTime }}</td>
            <td>
              <a  v-on:click="del(item.chaptersId)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="chaptersNumber"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				bookName: "",
        bookId: this.$route.params.bookId,
        numPage: 1,
        items: [{
            chaptersId: "",
            chaptersName: "",
            wordNumber: "",
            chaptersPV: 0,
            chapterMoney: 0,
            updateTime: "",
            chaptersNumber: 10
        }]
			}
		},
		mounted(){
			var _this = this
			$.get("http://www.3roo.cn/ChaptersListAPIView/",{
          bookId: _this.bookId,
          pagesNumber: 1
      }, function(data){
          data = $.parseJSON(data);
          console.log(data)
          _this.bookName = data.name;
          _this.items = data.chaptersList;
          _this.chaptersNumber = data.chaptersNumber
      })
		},
		methods: {
      del: function(chaptersId) {
      	var _this = this
        $.ajax({
          beforeSend: csrfTokenHeader,
          url: "http://www.3roo.cn/DeleteChapterAPIView/",
          async: false,
          data: {
              bookId: _this.bookId,
              chaptersId: chaptersId
          },
          dataType: "json",
          type: "GET",
          success: function(data) {
              console.log(data.code);
              if (!data.code) {
                  
                    $.get("http://www.3roo.cn/ChaptersListAPIView/",{
                        bookId: _this.bookId,
                        pagesNumber: _this.numPage
                    }, function(data){
                        data = $.parseJSON(data);
                        _this.bookName = data.name;
                        _this.items = data.chaptersList;
                    })
              }
          },
          error: function() {
              alert("错误");
          }
        })
      },
      handleCurrentChange: function(val){
        var _this = this
        this.numPage = val
        $.get("http://www.3roo.cn/ChaptersListAPIView/",{
            bookId: _this.bookId,
            pagesNumber: val
        }, function(data){
            data = $.parseJSON(data);
            console.log(data)
            _this.bookName = data.name;
            _this.items = data.chaptersList;
            _this.chaptersNumber = data.chaptersNumber
        })
      }
    }
	}
</script>