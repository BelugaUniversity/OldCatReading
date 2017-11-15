<template>
	<div>
      <div class="row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    总访问量<br>
                    <div class="text-center"><label class="h2">{{TotalPVNumber}}</label></div>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    总注册量<br>
                    <div class="text-center"><label class="h2">{{TotalRegisterNumber}}</label></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-3">
                            总打赏量<br>
                            <label class="h2" style="margin-left: 22px;">{{TotalRewardNumber}}</label>
                        </div>
                       <div class="col-sm-3 text-center" style="text-align: center;">
                                &nbsp&nbsp&nbsp猫球 :
                                <label>{{TotalCatBallNumber}} 个</label><br>
                                猫薄荷 : <label>{{TotalCatnipNumber}} 个</label>
                            </div>
                            <div class="col-sm-3">
                                逗猫棒 : <label>{{TotalCatStickNumber}} 个</label><br>
                                &nbsp&nbsp&nbsp猫粮 : <label>{{TotalCatFoodNumber}} 个</label>
                            </div>
                            <div class="col-sm-3">
                                &nbsp&nbsp&nbsp鱼 : <label>{{TotalCatFishNumber}} 个</label><br>
                                猫窝 : <label>{{TotalCatHouseNumber}} 个</label>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


			<div>
				<div id="myChart" :style="{width: '420px', height: '420px'}"></div>
      	<div id="myChartReward" :style="{width: '420px', height: '420px'}"></div>
			</div>
      <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1" @click="indentSelect(1)">日数据</el-menu-item>
              <el-menu-item index="2" @click="indentSelect(0)">月数据</el-menu-item>
          </el-menu>
        <el-table
    :data="dayData"
    stripe
    style="width: 100%" v-if="this.judge === 1">
        <el-table-column
          prop="id"
          label="订单ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="produceDataDate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dayPVNumber"
          label="日浏览量">
        </el-table-column>
        <el-table-column
          prop="dayRechargeNumber"
          label="日注册量">
        </el-table-column>
        <el-table-column
          prop="dayRewardNumber"
          label="日打赏量">
        </el-table-column>
        <el-table-column
          prop="dayLogonNumber"
          label="日浏览量">
        </el-table-column>
        <el-table-column
          prop="dayChaseBooksNumber"
          label="日追书量">
        </el-table-column>
        <el-table-column
          prop="daySubscribersNumber"
          label="日订阅量">
        </el-table-column>
      </el-table>
      <el-table
    :data="monthDate"
    stripe
    style="width: 100% margin-top: 50px;" v-if="this.judge === 0">
        <el-table-column
          prop="id"
          label="订单ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="produceDataDate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="monthPVNumber"
          label="月浏览量">
        </el-table-column>
        <el-table-column
          prop="monthRechargeNumber"
          label="月注册量">
        </el-table-column>
        <el-table-column
          prop="monthRewardNumber"
          label="月打赏量">
        </el-table-column>
        <el-table-column
          prop="monthLogonNumber"
          label="月浏览量">
        </el-table-column>
        <el-table-column
          prop="monthChaseBooksNumber"
          label="月追书量">
        </el-table-column>
        <el-table-column
          prop="monthSubscribersNumber"
          label="月订阅量">
        </el-table-column>
      </el-table>
      </div>
    <nav class='text-right' style='margin: 50px 0 50px 0;'>
        <span>页数:{{ numPage }}/{{ pageNumber }}</span>
        <button v-on:click='turnPage(numPage-1)' type='button' class='btn btn-primary' style='margin-left: 10px;'>上一页</button>
        <button v-on:click='turnPage(numPage+1)' type='button' class='btn btn-primary' style='margin-left: 5px;'>下一页</button>
    </nav>
	</div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      imgY: [],
      imgDataPV: [],
      activeIndex: '1',
      imgReward: [],
      judge: 1,
      numPage: 1,
      pageNumber: 1,
      dayData: [],       //日数据
      monthDate: [],      //月数据
      TotalPVNumber: 0,
      TotalRegisterNumber: 0,
      TotalRewardNumber: 0,
      TotalCatBallNumber: 0,
      TotalCatnipNumber: 0,
      TotalCatStickNumber: 0,
      TotalCatFoodNumber: 0,
      TotalCatFishNumber: 0,
      TotalCatHouseNumber: 0,
    }
  },
  mounted(){
    var _this = this
    $.ajax({
      beforeSend: csrfTokenHeader,
      url:"http://www.3roo.cn/LineCharDataAPIView/",
      async: false,
      data:{
      },
      dataType:"json",
      type:"get",
      success: function(data){
        console.log(data.LineChartData[3].produceDataDate)
        for(var i = 0; i < data.LineChartData.length; i++){
          _this.imgY[i] = data.LineChartData[i].produceDataDate
          _this.imgDataPV[i] = data.LineChartData[i].dayPVNumber
          _this.imgReward[i] = data.LineChartData[i].dayRewardNumber
        }
      },
      error: function(){
        alert("创建失败");
      }
    })
    $.ajax({
      beforeSend: csrfTokenHeader,
      url:"http://www.3roo.cn/DayDateAPIView/",
      async: false,
      data:{
        dayDataNumPage: _this.numPage
      },
      dataType:"json",
      type:"get",
      success: function(data){
        _this.dayData = data.dayDate
      }
    })
    $.ajax({
        url: "http://www.3roo.cn/TotalDataAPIView/",
        async: false,
        type: "GET",
        data: {
        },
        dataType: "json",
        success: function(data) {
          _this.TotalPVNumber = data.pv
          _this.TotalRegisterNumber = data.UserNum
          _this.TotalRewardNumber = data.RewardNum
          _this.TotalCatBallNumber = data.TotalCatBallNumber
          _this.TotalCatnipNumber = data.TotalCatnipNumber
          _this.TotalCatStickNumber = data.TotalCatStickNumber
          _this.TotalCatFoodNumber = data.TotalCatFoodNumber
          _this.TotalCatFishNumber = data.TotalCatFishNumber
          _this.TotalCatHouseNumber = data.TotalCatHouseNumber
        },
    })
    this.drawLine();
    this.drawLineReward();
  },
 methods: {
    turnPage: function (numPage) {
        //书籍翻页
      const _this = this
      if(numPage<=_this.pageNumber&&numPage>0)
      {

      }
    },
    indentSelect(val){
        this.judge = val
        this.numPage = 1
        this.allRequest(this.judge)
    },
    allRequest(type){
        var _this = this
        if(type == 1)
        {
            $.ajax({
              beforeSend: csrfTokenHeader,
              url:"http://www.3roo.cn/DayDateAPIView/",
              async: false,
              data:{
                dayDataNumPage: _this.numPage
              },
              dataType:"json",
              type:"get",
              success: function(data){
                _this.dayData = data.dayDate
              }
            })
        }else{
            $.ajax({
              beforeSend: csrfTokenHeader,
              url: "http://www.3roo.cn/MonthDataAPIView/",
              async: false,
              data:{
                monthDataNumPage: _this.numPage
              },
              dataType:"json",
              type:"get",
              success: function(data){
                _this.monthDate = data.monthDate
              }
            })
        }
    },
    drawLineReward(){
      var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChartReward = this.$echarts.init(document.getElementById('myChartReward'))
        // 绘制图表
        myChartReward.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '日打赏面积图',
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: _this.imgY
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'打赏量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: this.imgReward
                }
            ]
        })
    },
    drawLine(){
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '日浏览量面积图',
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: _this.imgY
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name:'浏览量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: this.imgDataPV
                }
            ]
        });
    }
  }
}
</script>
