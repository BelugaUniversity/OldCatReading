<template>
	<select v-model="chselected">
    <option disabled value="" v-if="data">{{data}}</option>
    <option disabled value="" v-else="data">默认</option>
    <option v-for="numberList in numberLists">{{numberList}}</option>
    <option>默认</option>
  </select>
</template>

<script>
	export default {
		name: 'chselected',
		data: function () {
			return {
				chselected: '',
				data: this.defaultData,
			}
		},
		props: ['numberLists', 'defaultData', 'bookId', 'index'],
		methods: {
			
		},
		watch: {
			chselected: function(val) {	
				this.data = val
				if(val === '默认'){
					val = 0
				}
				$.ajax({
	  			url: 'http://www.3roo.cn/ChangeRankAPIView/',
	  			async: false,
	  			data: {
	  				bookId: this.bookId,
	  				index: this.index,
	  				position: val
	  			},
	  			dataType: 'json',
	  			type: 'GET',
	        success: function(data) {
	        	//data = $.parseJSON(data);
	          console.log(data)
	        },
	        error: function() {     	
	          alert('设置失败')
	          window.location.href="/comment/"
	        }
	  		})
			}
			
		}
	}
</script>