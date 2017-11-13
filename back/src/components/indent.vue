<template>
	<div>
		<div class="line"></div>
		<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1">订单中心</el-menu-item>
		  <el-menu-item index="2" @click="changeInfo(1)">充值信息</el-menu-item>		  
		  <el-menu-item index="3" @click="changeInfo(0)">支付信息</el-menu-item>
		</el-menu>
		<el-table
    :data="payData"
    stripe
    style="width: 100%" v-if="this.judge === 1">
	    <el-table-column
	      prop="outTradeNo"
	      label="订单号"  
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="gmtPayment"
	      label="交易时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="receiptAmount"
	      label="人民币">
	    </el-table-column>
	    <el-table-column
	      prop="user"
	      label="付费用户">
	    </el-table-column>
	    <el-table-column
	      prop="subject"
	      label="充值信息">
	    </el-table-column>
	  </el-table>

	  <el-table
    :data="useData"
    stripe
    style="width: 100%" v-else>
	    <el-table-column
	      prop="outTradeNo"
	      label="订单号"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="gmtPayment"
	      label="交易时间"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="money"
	      label="猫币">
	    </el-table-column>
	    <el-table-column
	      prop="user"
	      label="付费用户">
	    </el-table-column>
	    <el-table-column
	      prop="subject"
	      label="支付详情">
	    </el-table-column>
	  </el-table>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      	judge: 1,
        activeIndex: '1',
        activeIndex2: '1',
        payData: [],		//充值信息
        useData: [],			//消费信息
        numpage: 1
      };
    },
    created(){
    	var _this = this
    	$.ajax({
        url: "http://www.3roo.cn/RechargeInfoListAPIView/",
        async: false,
        data: {
      		numPage: _this.numpage
        },
        dataType: "json",
        type: "GET",
        success: function(data) {
            _this.payData = data.items	
        },
        error: function() {
            alert("加载失败");
        }
      })
      $.ajax({
        url: "http://www.3roo.cn/PayInfoListAPIView/",
        async: false,
        data: {
      		numPage: _this.numpage
        },
        dataType: "json",
        type: "GET",
        success: function(data) {
            _this.useData = data.items
        },
        error: function() {
            alert("加载失败");
        }
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeInfo(info) {
      	this.judge = info
      }
    }
  }
</script>