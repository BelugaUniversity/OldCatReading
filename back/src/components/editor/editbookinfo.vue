<template>
    <div>
        
      <div class="row" style="margin-top: 20px; margin-left:100px;">
        <el-upload
          class="avatar-uploader col-sm-2 control-label"
          action="http://www.3roo.cn/CoverImgUploadAPIView/"
          :show-file-list="false"
          :data="mydata"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，点击图片上传</div>
        </el-upload>
      </div>
      <form class="form-horizontal" role="form" style="margin-top: 20px;">

        <div class="form-group">
            <label class="col-sm-2 control-label">作品名称</label>
            <div class="col-sm-3">
                <input type="text" v-model="bookName" class="form-control" id="firstname">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">推荐语</label>
            <div class="col-sm-3">
                <input type="text" v-model="testimonials" class="form-control" id="firstname">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">作者</label>
            <div class="col-sm-3">
                <input type="text" class="form-control" v-model="author" id="firstname">
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">作品类型</label>
            <div class="col-sm-3">
                <select class="form-control" id="bookKind" @change="changeKind($event.target.value)">
                    <option value="1">仙剑</option>
                    <option value="2">玄幻</option>
                    <option value="3">悬疑</option>
                    <option value="4">奇幻</option>
                    <option value="5">军事</option>
                    <option value="6">历史</option>
                    <option value="7">竞技</option>
                    <option value="8">科幻</option>
                    <option value="9">校园</option>
                    <option value="10">社会</option>
                    <option value="11">其他</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">字数</label>
            <div class="col-sm-3" style="line-height: 35px;">
                <p>{{wordNumber}}</p>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">追书</label>
            <div class="col-sm-3" style="line-height: 35px;">
                <p>{{chaseBooksNumber}}</p>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">作品状态</label>
            <div class="col-sm-3">
                <select @change="changeState($event.target.value)" class="form-control" id="bookState">
                    <option value="0">连载中</option>
                    <option value="1">完结</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="firstname" class="col-sm-2 control-label">作品介绍</label>
            <div class="col-sm-3">
                <textarea v-model="describe" class="form-control" rows="4"></textarea>
            </div>
        </div>
        <div>
            <p style="margin-left: 200px; color: #AAA;">
                20-300个字，可自行修改，修改后一个工作日内可审核完毕
            </p>
        </div>
        
      </form>
      <el-button type="primary" @click="savesettings">提交</el-button>
    </div>
    
</template>
<script>
    export default{
        data() {
            return{
            bookId: "",
            coverImg: '2706179_185025082_2.jpg',
            bookName: "",
            author: "mcc",
            wordNumber: 1000,
            chaseBooksNumber: 100,
            describe: "hahahahahahah",
            testimonials: "",
            type:1,
            state:1,
            mydata:{"bookId": this.bookId},
            imageUrl: 'http://www.3roo.cn/static/coverImg/./2706179_185025082_2.jpg'
            }
        },
        watch: {
            bookId: function(){
                this.mydata = {"bookId": this.bookId}
            }
        },
        mounted(){
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
                _this.clone(data)
                document.getElementById('bookKind')[data.type - 1].selected = true
                document.getElementById('bookState')[data.state].selected = true;
                _this.imageUrl = 'http://www.3roo.cn/static/coverImg/'+data.coverImg
              },
              error: function() {
                alert('错误')
              }
            })                
        },
        methods: {
            clone: function(data) {
                this.coverImg = data.coverImg;
                this.bookName = data.bookName;
                this.author = data.author;
                this.wordNumber = data.wordNumber;
                this.chaseBooksNumber = data.chaseBooksNumber;
                this.describe = data.describe;
                this.type = data.type;
                this.state = data.state;
                this.testimonials = data.testimonials;
            },
            savesettings: function(){
                var _this = this
                $.ajax({
                    beforeSend: csrfTokenHeader,
                    url: "http://www.3roo.cn/EditBookInfoAPIView/",
                    async: false,
                    data: {
                        id: _this.bookId,
                        bookName: _this.bookName,
                        author: _this.author,
                        type: _this.type,
                        state: _this.state,
                        describe: _this.describe,
                        testimonials: _this.testimonials
                    },
                    dataType: "json",
                    type: "POST",
                    success: function(data) {
                        console.log(data)
                        if (data.state) {
                            alert("修改成功")
                        }
                    },
                    error: function() {
                        alert("错误");
                    }
                });
            },
            changeKind: function (kind){
                this.type=kind
            },
            changeState: function (state){
                this.state=state
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
              },
              beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
              }            
        }
    }
</script>
<style type="text/css">
    .bookMenu tbody tr td {
        line-height: 133px;
    }
    
    .sub-header span {
        color: #AAA;
    }
    
    .funcButton a {
        height: 33%;
        width: 100%;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 198px;
    height: 208px;
    display: block;
  }
  .el-upload__input{
    position: absolute;
    left: -9999px;
  }
</style>