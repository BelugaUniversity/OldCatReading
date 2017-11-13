<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
          <thead>
          </thead>
          <tbody>
              <tr>
                  <th>用户名</th>
                  <th>评论标题</th>
                  <th>评论内容</th>
                  <th>评论类型</th>
                  <th>评论时间</th>
                  <th>操作</th>
              </tr>
              <tr v-for="item in items">
                  <td>{{item.userName}}</td>
                  <td>{{item.commentTitle}}</td>
                  <td>{{item.commentContent}}</td>
                  <td>{{item.commentType}}</td>
                  <td>{{item.commentTime}}</td>
                  <td>
                    <el-button type="text" @click="editCommentState(item)">管理</el-button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  <el-dialog title="评论管理" :visible.sync="dialogFormVisible">
      <div class="row">
          <div class="form-group col-sm-2">
              <label>是否置顶</label>
              <input v-model="editCommentStick" id="commentStick" type="checkbox" class="form-control">
          </div>
          <div class="form-group col-sm-2">
              <label>是否精华</label>
              <input v-model="editCommentEssence" id="commentEssence" type="checkbox" class="form-control">
          </div>
          <div class="form-group col-sm-2">
              <label>禁止显示</label>
              <input v-model="editIsShow" id="isShow" type="checkbox" class="form-control">
          </div>
      </div>
      <div class="row">
          <div class="form-group col-sm-4">
              <div v-on:click="saveCommentState" class="btn btn-primary">
                  保存更改
              </div>
          </div>
      </div>
  </el-dialog>
  <nav class="text-right" style="margin-bottom: 50px;">
      <span>页数:{{numPage}}/{{pageNumber}}</span>
      <button v-on:click="turnPage(numPage-1)" type="button" class="btn btn-primary" style="margin-left: 10px;">上一页</button>
      <button v-on:click="turnPage(numPage+1)" type="button" class="btn btn-primary" style="margin-left: 5px;">下一页</button>
  </nav>
  </div>
</template>
<script>
export default
{ 
  data(){
    return{
      dialogFormVisible: false,
      numPage: 1,
      pageNumber: "",
      bookName: "",
      bookId: this.$route.params.bookId,

      editCommentId: "",
      editIsShow: "",
      editCommentStick: "",
      editCommentEssence: "",

      items: [{
          userName: "",
          commentTitle: "",
          commentContent: "",
          commentType: "",
          commentTime: "",
      }]
    }
  },
  created(){
    var _this = this
    $.get("http://www.3roo.cn/CommentManagerViewAPI/",{
            bookId: _this.bookId,
            numPage: _this.numPage
        }, function(data){
            data = $.parseJSON(data);
            _this.bookName = data.bookName;
            _this.items = data.commentManagerItems;
            _this.pageNumber = data.pageNumber;
        })
  },
  methods: {
    turnPage: function (numPage) {
      var _this = this
        if(numPage<=_this.pageNumber&&numPage>0)
        {
          _this.numPage = numPage
            $.get("http://www.3roo.cn/CommentManagerViewAPI/", {
                bookId: _this.bookId,
                numPage: numPage
            }, function(data) {
                data = $.parseJSON(data);
                _this.numPage = numPage;
                _this.items = data.commentManagerItems;
            });
        }
    },
    editCommentState: function(comment) {
            this.dialogFormVisible = true
            var _this = this
            _this.editCommentId = comment.id;
            _this.editCommentStick = comment.commentStick;
            _this.editCommentEssence = comment.commentEssence;
            _this.editIsShow = comment.isShow;
    },
    saveCommentState: function() {
      this.dialogFormVisible = false
      var _this = this
         $.get("http://www.3roo.cn/EditCommentManagerViewAPI/",{
                bookId: _this.bookId,
                commentId: _this.editCommentId,
                commentStick: _this.editCommentStick,
                commentEssence: _this.editCommentEssence,
                isShow: _this.editIsShow
            }, function(){
                console.log("ok");
                $('#remodal').remodal().close();
                window.location.href = "/commentManager/" + _this.bookId;
            });
    }
  }
}
</script>