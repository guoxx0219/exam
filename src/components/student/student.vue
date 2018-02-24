<template>
    <div id="box">
        <header>
            <div class="content">
                <img src="../../assets/images/y.jpg" alt="" class="image">
                <div class="right">
                    <ul class="nav">
                        <li>
                            <router-link :to="{name:'studentExam'}">试卷</router-link>
                        </li>
                        <li>
                            <router-link to="">历史记录</router-link>
                        </li>
                    </ul>
                    <ul class="info">
                        <li>
                            <el-button round>{{user}}</el-button>
                        </li>
                        <li>
                            <el-button round>退出</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="header"></div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name:'student',
        data(){
            return{
                user:''
            }
        },
        mounted(){
            this.$http.post('/home/findUser.php').then(res=>{
                this.user = res.body;
            })
        }
    }
</script>
<style>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    a{
        text-decoration: none;
        color: #5a5e66;
    }
    #box{
        width: 100%;
        height: 10%;
    }
    header{
        width: 100%;
        height:80px;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow: 0px 5px 5px rgba(0,0,0,0.1);
        z-index: 999;
    }
    #header{
        width: 100px;
        height: 80px;
    }
    .content{
        width: 100%;
        height: 100%;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .image{
        width: 50px;
        height: 50px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .right{
        width: auto;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .nav,.info{
        display: flex;
        padding:0 30px;
    }
    .nav>li,info>li{
        display: inline-block;
        margin-right:15px;
    }
    .nav>li>a{
        font-size: 16px;
    }
    .info>li>button{
        margin-right: 10px;
    }
</style>