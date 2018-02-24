<template>
    <section id="exam">
        <ul class="box">
            <li class="list_li" v-for="item in table">
                <router-link :to="{name:'studentPaper',query:{id:item.id}}">
                    <img src="../../assets/images/11.jpg" alt="" class="image2">
                    <p class="text2">
                        <span>{{item.pname}}</span>
                        <span>{{cname}}</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </section>
</template>
<script>
    export default {
        name:'studentExam',
        data(){
            return{
                table:[],
                cname:''
            }
        },
        mounted(){
            this.$http.post('/home/examQuery.php').then(res=>{
                this.table = res.body[0];
                this.cname = res.body[1];
            })
        }
    }
</script>
<style>
    #exam{
        width: 100%;
        height: auto;
        margin-top: 10px;
    }
    .box{
        width: 100%;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
    }
    .list_li{
        width: 280px;
        height: 280px;
        border-radius: 8px;
        box-shadow: 0px 5px 5px rgba(0,0,0,0.1);
        margin-right: 26px;
        margin-bottom: 26px;
        border: 1px solid #dedede;
    }
    .list_li>a{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index:1;
    }
    .list_li .image2{
        width: 100%;
        flex-grow: 1;
        filter: grayscale(100%);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .text2{
        height: 50px;
        display: flex;
        justify-content: space-between;
        padding:0 10px;
        margin-bottom: 0!important;
    }
    .text2>span{
        line-height: 50px;
        font-size: 16px;
        color: #5a5e60;
    }
</style>
