<template>
	<div>
		<ol class="breadcrumb">
      <li><router-link to="/">书籍管理</router-link ></li>
      <li class="active">书籍创建</li>
    </ol>
    <form class="form-horizontal" role="form" style="margin-top: 90px;" id="form">
      <div class="form-group">
        <label for="firstname" class="col-sm-2 control-label">作品名称</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="firstname">
        </div>
      </div>
      <div>
        <p style="margin-left: 200px; color: #AAA;">15字内，请勿添加书名号等特殊符号</p>
      </div>
      <div class="form-group">
        <label for="firstname" class="col-sm-2 control-label">作者</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="writename">
        </div>
      </div>
      <div class="form-group">
        <label for="firstname" class="col-sm-2 control-label">作品类型</label>
        <div class="col-sm-5">
          <select class="form-control" id="writekind">
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
        <label for="firstname" class="col-sm-2 control-label">作品介绍</label>
        <div class="col-sm-5">
          <textarea class="form-control" rows="4" id="discreb"></textarea>
        </div>
      </div>
      <div>
        <p style="margin-left: 200px; color: #AAA;">20~300字</p>
      </div>
      <div class="achieve" style="margin-left: 200px;">
        <button type="button" class="btn btn-info" v-on:click='creatBook()'>创建作品</button>
        <button type="button" class="btn btn-default">返回上一步</button>
      </div>
    </form>
	</div>
</template>
<script>
export default { 
  data(){
    return{

    }
  },
  methods: {
    creatBook: function(){
      var bookName=$("#firstname").val();
      var author=$("#writename").val();
      var type=$("#writekind").val();
      var describe=$("#discreb").val();
      console.log(bookName);
      $.ajax({
        beforeSend: csrfTokenHeader,
        url:"http://www.3roo.cn/CreateBookAPIView/",
        async:false,
        data:{
          bookName:bookName,
          author:author,
          type:type,
          describe:describe
        },
        dataType:"json",
        type:"POST",
        success: function(data){
          if (!data.code){
            window.location.href = "/";
          }
          else {
            alert(data.data+"error");
          }
        },
        error: function(){
          alert("创建失败");
        }
      })
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

	.achieve button {
	    padding: 10px 40px 10px 40px;
	}
</style>