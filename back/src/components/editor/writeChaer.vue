<template>
	<div>
		<div class="row"  style="border: solid 1px #E6E6E6; margin-top: 15px; height: 50px;  margin-left: 0px;">
      <div class="col-sm-2" style="background-color: #F6F6F6; border-right:  solid 1px #E6E6E6; height: 100%; text-align: center;">
          <label class="total" style="line-height: 50px;">共{{chaptersNumber}}章</label>    
      </div>                        
      <div class="col-sm-10">
        <div  class="navbar-form navbar-left" >
          <label>章节数：{{chaptersId}}</label>
          <label style="margin-left: 18px">章节类型：</label>                                
          <div class="form-group">
            <select class="form-control" @change="changechaptersType($event.target.value)">
              <option value="0">公众章节</option>
              <option value="1">默认付费(每字0.05猫币)</option>
            </select>  
            <el-button type="primary" @click="dialogFormVisible = true" style="margin-left: 30px;">自定义价格</el-button> 
            <span style="padding-left: 30px;">本章节价格： {{charpterMoney}}</span>                              
          </div>                             
        </div>
        <div class="navbar-form navbar-right">
          <button class="btn btn-default" @click="chapterDelete()" style="margin-left: 30px;" :disabled='delIsDisabled'>删除</button>
          <button class="btn  btn-default" @click="WordCountAPIView()">字数统计</button>
          <button class="btn  btn-default" @click="newChapter()">新建章节</button>
          <button class="btn  btn-default" @click="newChapter()">批量上传</button>
          <button class="btn btn-default" @click="saveChapter()">保存</button>
          <!-- <button class="btn btn-success" @click="releaseChapter()">发布</button> -->
        </div>                       
      </div>
	  </div>
    <div style="margin-left: 15px;">
  	  <div class="row"  style="border-right:  solid 1px #E6E6E6; border-left:  solid 1px #E6E6E6; border-bottom:  solid 1px #E6E6E6; height: 650px;">
  		  <div class="col-sm-2 table-responsive" style="border-right:  solid 1px #E6E6E6; padding-left: 0px; padding-right: 0px; height: 

        100%;">
  		      <div v-if="newChapterState"  style="border-bottom: solid 1px #E6E6E6; background-color: #E1F2FF; height: 65px; text-align: center;">
  		          <span style="line-height: 65px;">无标题</span>
  		      </div>
  		      <div v-for="item in items" v-on:click="turnto(item)" v-bind:class="{'click':item.clicked}">
  		        <p>第{{item.chaptersId}}章 <span>{{item.chaptersName}}</span></p>
  		        <p>共{{item.wordNumber}}字 <span>{{item.updateTime}}</span></p>
  	      	</div>
  		  </div>
  		  <div class="col-sm-10">
  		      <div class="row" style="padding-left: 6px; padding-right: 6px;">
  		        <input v-model="chapterName" placeholder="此处输入章节名" class="form-control" type="text" name="title" style="margin-top: 10px; margin-bottom: 8px; border: 0px;">
  		        <textarea v-model="chapterContent" style="border: 0px;  height: 570px;" placeholder="请输入章节内容"  class="form-control"></textarea>
  		      </div>
  		  </div>                 
    </div>
  	</div>
    <el-dialog title="设置本章节价格" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="猫币" :label-width="formLabelWidth">
          <el-input v-model="form.money" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="text" @click="reqChapt">更多章节</el-button>   
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="chapSure">确 定</el-button>
      </div>
    </el-dialog>
       
    <el-dialog title="设置其他章节价格" :visible.sync="clickprice">
      <div class='table-responsive'>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(city, index) in cities" :label="city" :key="index">第{{index+1}}章 {{city.chaptersName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-input v-model="otherChapterMoney" auto-complete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickprice = false">取 消</el-button>
        <el-button type="primary" @click="chapListSure">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>
<script>
	export default{
		data() {
			return{
        chapterID: [],                //发送的id列表
				newChapterState: 1,          // 新建章节显示状态
			  chaptersNumber: "",          // 章节总数
			  bookId: this.$route.params.bookId,         // 当前书籍ID
			  bookName: "",                // 当前书名
			  chaptersId: 1,               // 当前显示章节ID
			  chapterName: "",             // 当前显示章节名
			  chapterContent: "",          // 当前显示章节内容
			  chaptersType: "",
			  chaptersState: "",
			  items:[{
		      chaptersId:"",
		      chaptersName: "",
		      wordNumber: "",
		      updatetime: "",
		      clicked: ""            // 是否为正在点击
			  }],
        otherChapterMoney: 0,   //其他章节的金额
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          money: '',      //本章节的金额
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        formLabelWidth: '120px',
        clickprice: false,
        checkAll: true,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
        delIsDisabled: false,
        charpterMoney: 0,
        wordMoney: 0.05       //每字的价格
			}
    },
    watch: {
      chapterContent: function(){
        if(this.chaptersType == '1'){
          this.changechaptersType('1')
        }
      }
    },
    mounted() {
    	var _this = this
    	$.get("http://www.3roo.cn/EditChapterListAPIView/", {
          bookId: _this.bookId
      }, function(data) {
          data = $.parseJSON(data);

          _this.cities = data.chaptersList
          _this.bookName = data.name;
          _this.chaptersNumber = data.chaptersNumber;
          _this.chaptersId = _this.chaptersNumber + 1;
          _this.items = data.chaptersList;
      })
    },
    methods:{
      chapListSure: function(){
        this.clickprice = false
        this.chapterID = []
        for(var i = 0; i < this.checkedCities.length; i++){
          this.chapterID[i] = this.checkedCities[i].chaptersId
          if(this.chapterID[i] == this.chaptersId){
            this.charpterMoney = this.otherChapterMoney
          }
        }
        var _this = this
        console.log(this.chaptersId)
        $.ajax({
            url: "http://www.3roo.cn/SettingChapterMoneyAPIView/",
            type: "GET",
            data: {
              bookId: _this.bookId,
              chapterID: _this.chapterID,
              money: _this.otherChapterMoney
            },
            traditional: true,//这里设置为true
            success: function(data) {
              if(data.state){
                alert("成功")
              }else{
                alert("阿哦，失败了")
              }
            }
        })
      },
      chapSure: function(){
        //本章输入确认
        this.dialogFormVisible = false
        var _this = this
        this.chapterID = []
        this.chapterID[0] = this.chaptersId
        this.charpterMoney = this.form.money
        $.get("http://www.3roo.cn/SettingChapterMoneyAPIView/", {
            bookId: _this.bookId,
            chapterID: _this.chapterID,
            money: _this.form.money
        }, function(data) {
            if(data.state){
              alert("成功")
            }else{
              alert("阿哦，失败了")
            }
        }) 
      },

      reqChapt: function(){
        //点击更多章节时
        this.dialogFormVisible = false
        this.clickprice = true
        var _this = this
        $.get("http://www.3roo.cn/EditChapterListAPIView/", {
            bookId: _this.bookId
        }, function(data) {
            data = $.parseJSON(data);
            _this.cities = data.chaptersList
        })      
      },
      turnto: function(item){

        // if (_this.chapterName!="" || _this.chapterContent!="" )
        //     saveChapter();

        this.newChapterState=0;

        for (var i = this.items.length - 1; i >= 0; i--) {
            this.items[i].clicked=0
        }
        item.clicked=1
        var _this = this
        _this.chaptersId = item.chaptersId

        $.get("http://www.3roo.cn/ShowChapterAPIView/", {
            bookId: _this.bookId,
            chaptersId: item.chaptersId,
        }, function(data){
            data=$.parseJSON(data);
            _this.chapterName = data.chaptersName;
            _this.chapterContent = data.chaptersContent;
            _this.chaptersState = data.chaptersState;
            _this.chaptersType = data.chaptersType;
            _this.charpterMoney = data.charpterMoney
        });
      },
      newChapter: function (){
      	var _this = this
      	//建立新章节
        _this.newChapterState=1;
        for (var i = 0; i < _this.items.length; i++) {
            _this.items[i].clicked=0;
            _this.chaptersId = _this.chaptersNumber+1;
        }
        _this.chapterName="";
        _this.chapterContent="";
	    },
	    saveChapter: function () {
	    	var _this = this
	    	//保存章节
        if(this.chapterName && this.chapterContent)
        {
          $.ajax({
            beforeSend: csrfTokenHeader,
            url: "http://www.3roo.cn/EditBookInfoAPIView",
            async: false,
            data: {
                bookId: _this.bookId,
                chaptersId: _this.chaptersId,
                chaptersName: _this.chapterName,
                chaptersContent: _this.chapterContent,
                charpterMoney: _this.charpterMoney
            },
            dataType: "json",
            type: "POST",
            success: function(data) {
                if (!data.code) {
                    _this.orginRequest()
                } else {
                    alert(data.data);
                }
                _this.chapterContent = ''
                _this.chapterName = ''
            },
            error: function() {
                alert("创建失败");
            }
          })
        }else{
          alert('章节不能为空')
        }    
      },
      chapterDelete: function () {
      	//删除章节
        this.delIsDisabled = true
      	var _this = this
        if(this.chaptersId){
         $.ajax({
            url: "http://www.3roo.cn/DeleteChapterAPIView/",
            async: false,
            data: {
                bookId: _this.bookId,
                chaptersId: _this.chaptersId
            },
            dataType: "json",
            type: "GET",
            success: function(data) {
                _this.orginRequest()
                _this.delIsDisabled = false
            },
            error: function() {
                alert("创建失败");
                _this.delIsDisabled = false
            }
        })    
        }
  
	    },
      WordCountAPIView: function () {
      	//字数统计
        alert("本章节"+this.chapterContent.length+"字")
      },
      changechaptersType: function (value){
        this.chaptersType = value
        if(value == '0'){
          this.charpterMoney = 0
        }
        if(value == '1'){
          this.charpterMoney = this.chapterContent.length * this.wordMoney
        }
        
      },
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? this.cities : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      orginRequest(){
        var _this = this
        $.get("http://www.3roo.cn/EditChapterListAPIView/", {
            bookId: _this.bookId
        }, function(data) {
            data = $.parseJSON(data);
            _this.cities = data.chaptersList
            _this.bookName = data.name;
            _this.chaptersNumber = data.chaptersNumber;
            _this.chaptersId = _this.chaptersNumber + 1;
            _this.items = data.chaptersList;
        })
      }
    }
	}
</script>
<style type="text/css">
.writeheader {
    border-top: solid 1px #E6E6E6;
}

.writeheader .total {
    color: #E6E6E6;
    width: 180px;
    height: 50px;
    line-height: 60px;
    padding-left: 10px;
    border: solid 1px #E6E6E6;
    border-top: none;
    border-bottom: none;
    background: #DDD;
}

.writeheader .selectword {
    margin-left: 30px;
    color: #AAA;
}

.writeheader select {
    background: #FFF;
}

.writeheader {
    border-bottom: solid 1px #E6E6E6;
    border-right: solid 1px #E6E6E6;
}

.writeheader label {
    margin-bottom: 0;
}

.clickper {
    background: #DDD;
}

.click {
    background: #efefef;
}

.per {
    margin: 0;
    padding: 10px 0 0 5px;
    border-bottom: solid 1px #E6E6E6;
    height: 70px;
}
.box-card {
  width: 200px;
}
</style>
