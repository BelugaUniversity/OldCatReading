 <template>
	<div>
		<div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>用户名</th>
            <th>电话号码</th>
            <th>注册时间</th>
            <th>推荐票</th>
            <th>钻石票</th>
            <th>猫币余额</th>
            <th>是否禁用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="userInfoItem in userInfo">
          <tr>
            <td>{{userInfoItem.userName}}</td>
            <td>{{userInfoItem.phone}}</td>
            <td>{{userInfoItem.registerTime}}</td>
            <td>{{userInfoItem.recommendTicket}}</td>
            <td>{{userInfoItem.diamondTicket}}</td>
            <td>{{userInfoItem.balance}}</td>
            <td v-if="userInfoItem.isForbidden">用户禁用</td>
            <td v-else>用户可用</td>
            <td><el-button type="text" @click="editUser(userInfoItem)">编辑</el-button></td>
          </tr>

         </tbody>
      </table>
	  </div>



    <el-dialog title="修改用户信息" :visible.sync="editorUs">
      <div class="row">
          <div class="col-sm-6">
              <label>用户名</label>
              <input v-model="editUserName" type="text" class="form-control">
          </div>
      </div>
      <div class="row" style="margin-top: 15px;">
          <div class="col-sm-6">
              <label>手机号</label>
              <input v-model="editPhone" type="text" class="form-control">
          </div>
      </div>
      <div class="row" style="margin-top: 15px;">
          <div class="col-sm-6">
              <div class="form-group">
                  <label>是否禁用</label>
                  <input type="checkbox" class="form-control">
              </div>
          </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorUs = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo">确 定</el-button>
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
	export default {
    data(){
    	return {
        editorUs: false,
	      numPage: 1,
	      pageNumber: "",

	      editId: "",
	      editUserName: "",
	      editPhone: "",
	      editUserType: "",
	      editPassword: "",

	      userInfo: []
	    }
    },
    created:
    	function(){
    		//页面加载时请求
    		const _this = this
    		$.ajax({
	        url: "http://www.3roo.cn/ShowUserListAPIView/",
	        async: false,
	        type: "GET",
	        data: {numPage: _this.numPage},
	        dataType: 'json',
	        success: function(data) {
	        	_this.clone(data)
	        },
	        error: function() {
	          alert("加载失败");
	        }
		    });
    	},
    methods: {
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
      clone: function(obj) {
        this.pageNumber = obj.pageNumber
        this.userInfo = obj.userInfo
      },
	    editUser: function(user){
        this.editorUs = true
        this.EditState = 1
        this.editId = user.id;
        this.editUserName = user.userName;
        this.editPhone = user.phone;
	    },
	    saveUserInfo: function(){
        this.editorUs = false
        const _this = this
        $.ajax({
				  beforeSend: csrfTokenHeader,
          url: "http://www.3roo.cn/EditUserAPIView/",
          async: false,
          type: "POST",
          data: {
              userId: this.editId,
              userName: this.editUserName,
              userPhone: this.editPhone,
              userPassword: this.editPassword,
              userType: 1
          },
          success: function(data) {

              $.ajax({
                url: "http://www.3roo.cn/ShowUserListAPIView/",
                async: false,
                type: "GET",
                data: {numPage: _this.numPage},
                dataType: 'json',
                success: function(data) {
                  _this.clone(data)
                },
                error: function() {
                  alert("加载失败");
                }
              });
            },
          error: function() {
            alert("创建失败");
          }
        })
	    }
    }
	}
</script>
