<template>
    <div class="main">
        <div class="bg"></div>
        <div class="container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:150px;"></div>
                    <div class="media media-y margin-big-bottom">
                    </div>
                    <!--使用element(网站)的form表单-->
                    <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
                        <div class="text-center padding-big-top"><h1>后台管理中心</h1></div>
                        <div class="panel-body">
                            <el-form-item label="用户名" class="form-group" prop="name">
                                <el-input v-model="form.name"></el-input>
                                <span class="icon icon-user margin-small img"></span>
                            </el-form-item>
                            <el-form-item label="密码"  class="form-group" prop="pass">
                                <el-input type="password" v-model="form.pass"></el-input>
                                <span class="icon icon-key margin-small img"></span>
                            </el-form-item>
                            <el-form-item label="角色"  class="form-group" prop="type">
                                <el-radio-group v-model="form.type">
                                    <el-radio label="manager">管理员</el-radio>
                                    <el-radio label="teacher">教师</el-radio>
                                    <el-radio label="student">学生</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="验证码" class="form-group" prop="identify">
                                <el-input type="text" v-model="form.identify" class="text"></el-input>
                                <img :src="src" alt="点击刷新图片" @click="src='home/code.php?id='+Math.random()">
                            </el-form-item>
                            <div>
                                <el-button type="primary" @click="onSubmit('form')" class="button button-block bg-main text-big input-big">登录</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                src:'home/code.php',
                form: {
                    name: '',
                    pass: '',
                    type: '',
                    identify:''
                },
                rules:{
                    name:[
                        {required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                    pass:[
                        {required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    type: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    identify:[
                        { required: true, message:'请输入验证码', trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            //解决跨域问题，在config中index.js设置
            onSubmit(formName) {
                // 验证表单内容是否符合规则
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //发送数据，设置头信息，以json方式发送（main.js），需要安装vue-resource
                        // (提供了使用XMLHttpRequest或JSONP 进行Web请求和处理响应的服务)
                        this.$http.post('/home/checklogin.php',this.form).then(res=>{
                            // 后台发回来的信息存储在res.body中
                            if(res.body == 1){
                                this.$message({
                                    message: '恭喜你，登录成功！',
                                    type: 'success'
                                });
                                if (this.form.type == 'manager'){
                                    this.$router.push('manager');
                                }else if (this.form.type == 'teacher'){
                                    this.$router.push('teacher');
                                }else if (this.form.type == 'student'){
                                    this.$router.push({name:'studentExam'});
                                }
                            }else if(res.body == 2){
                                this.$message({
                                    message: '密码不正确，请重新输入',
                                    type: 'warning'
                                });
                                this.src = '/home/code.php?id='+Math.random();
                            }else if(res.body == 3){
                                this.$message({
                                    message: '用户不存在',
                                    type: 'warning'
                                });
                                this.src = '/home/code.php?id='+Math.random();
                            }else if(res.body == 4){
                                this.$message({
                                    message: '验证码输入错误！',
                                    type: 'warning',
                                });
                                this.src = '/home/code.php?id='+Math.random();
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>
    @import "../../assets/css/admin.css";
    @import "../../assets/css/pintuer.css";
    .main{
        width: 100%;
        height: 100%;
    }
    .container,.line{
        height: 100%;
    }
    .img{
        position: absolute;
        top: 0;
        right: 0;
    }
    .margin-small{
        margin: 0!important;
        margin-right: 10px!important;
    }
    .icon-user{
        content: "\f007";
    }
    .icon-key{
        content: "\f084";
    }
    [class*='icon-']:before{
        display: inline-block;
    }
    .text{
        margin-right: 20px;
        width: 45%;
    }
</style>
