<template>
    <div class="star">
        <span class="star-item" v-for="(item,index) in items" :key="index" :class="item"></span>
    </div>
</template>
<script>
    // 星星的长度
    const LENGTH = 5
    //星星的状态
    const CLS_ON = "on"
    const CLS_HALF = "half"
    const CLS_OFF = "off"

    export default{
        props:{
            scoreChild:{
                type:Number
            }
        },
        // computed:{
        //     items(){
        //         let reselt = []

        //         //4.7
        //         let scoreChild = Math.floor(this.scoreChild * 2) / 2

        //         //半星
        //         let hasDecimal = scoreChild % 1 !== 0

        //         //全星
        //         let integer = Math.floor(scoreChild)

        //         //遍历全星
        //         for(let i = 0; i < integer; i++){
        //             reselt.push(CLS_ON)
        //         }

        //         //处理半星
        //         if(hasDecimal){
        //             reselt.push(CLS_HALF)
        //         }

        //         //补齐
        //         while(reselt.length < LENGTH){
        //             reselt.push(CLS_OFF)
        //         }

        //         return reselt 
        //     }
        // }
        // ,
        computed:{
            items(){
                //新建数组
                let reselt = []

                //4.7
                let scoreChild = Math.floor(this.scoreChild * 2) / 2

                //半星
                let banxing = scoreChild % 1 !== 0

                //全星
                let quanxing = Math.floor(scoreChild)

                //遍历全星
                for(let i = 0; i < quanxing; i++){
                    reselt.push(CLS_ON)
                }

                //判断是否存在半星
                if(banxing){
                    reselt.push(CLS_HALF)
                }

                //补齐
                while(reselt.length < LENGTH){
                    reselt.push(CLS_ON)
                }

                return reselt
            }
        }
    }
</script>
<style>
.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-repeat: no-repeat;
		background-size: 10px 10px;
	}
	.star .star-item:last-child{
		margin-right: 0;
	}
	
	/* 三种图片类型*/
	.star .on{
		background-image: url(img/star24_on@2x.png);
	}
	.star .half{
		background-image: url(img/star24_half@2x.png);
	}
	.star .off{
		background-image: url(img/star24_off@2x.png);
	}
</style>