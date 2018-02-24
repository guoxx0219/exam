<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="id" class="form-group" prop="id">
                    {{id}}
                </el-form-item>
                <el-form-item label="教师名称"  class="form-group" prop="user">
                    <el-input type="text" v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="所属方向">
                    <el-select v-model="form.dname" placeholder="请选择所属方向名称" class="form-group">
                        <el-option
                                v-for="item in dir"
                                :key="item.id"
                                :label="item.dname"
                                :value="item.dname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属班级">
                    <el-select v-model="form.cname" placeholder="请选择所属班级名称" class="form-group">
                        <el-option
                                v-for="item in classes"
                                :key="item.id"
                                :label="item.cname"
                                :value="item.cname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div>
                    <el-button type="primary" @click="onSubmit" class="button button-block bg-main text-big input-big button-size">提交</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name:'teaUpdate',
        data(){
            return{
                id:'',
                form:{
                    user:'',
                    cname:'',
                    dname:''
                },
                dir:[],
                classes:[]
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'teacher',id:this.id,form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerTea');
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '修改失败！',
                            type: 'warning'
                        });
                    }
                })
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.$http.post('/home/teaQueryId.php',{id:this.id}).then(res=>{
                this.form = res.body;
            })
            this.$http.post('/home/queryName.php',{table:'classes',name:'cname'}).then(res=>{
                this.classes = res.body;
            })
            this.$http.post('/home/queryName.php',{table:'direction',name:'dname'}).then(res=>{
                this.dir = res.body;
            })
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>