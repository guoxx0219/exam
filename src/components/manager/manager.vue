<template>
    <div>
        <div class="header bg-main">
            <div class="logo margin-big-left fadein-top">
                <h1><img src="../../assets/images/y.jpg" class="radius-circle rotate-hover" height="50" alt="" />后台管理中心</h1>
            </div>
            <div class="head-l"><a class="button button-little bg-green" href="" target="_blank"><span class="icon-home"></span> 登录</a> &nbsp;&nbsp;<a href="##" class="button button-little bg-blue"><span class="icon-wrench"></span> 清除缓存</a> &nbsp;&nbsp;<a class="button button-little bg-red" href="#"><span class="icon-power-off"></span> 退出登录</a> </div>
        </div>
        <div class="leftnav">
            <div class="leftnav-title"><strong><span class="icon-list"></span>菜单列表</strong></div>
            <h2><span class="icon-user"></span>基本设置</h2>
            <ul style="display:block">
                <li><router-link :to="{name:'managerDir'}"><span class="icon-caret-right"></span>方向管理</router-link></li>
                <li><router-link :to="{name:'managerStage'}"><span class="icon-caret-right"></span>阶段管理</router-link></li>
                <li><router-link :to="{name:'managerClass'}"><span class="icon-caret-right"></span>班级管理</router-link></li>
                <li><router-link :to="{name:'managerTea'}"><span class="icon-caret-right"></span>教师管理</router-link></li>
                <li><router-link :to="{name:'managerStu'}"><span class="icon-caret-right"></span>学生管理</router-link></li>
            </ul>
        </div>
        <ul class="bread">
            <li><a href="" target="right" class="icon-home"> 首页</a></li>
            <li><a href="" id="a_leader_txt">网站信息</a></li>
        </ul>
        <div class="admin">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import "../../assets/js/1.js"
    export default {
        name:'manager',
        data(){
            return{
            }
        }
    }
</script>
<style>
    @import "../../assets/css/admin.css";
    @import "../../assets/css/pintuer.css";
</style>