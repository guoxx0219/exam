<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="id" class="form-group" prop="id">
                    {{id}}
                </el-form-item>
                <el-form-item label="题型名称"  class="form-group" prop="tname">
                    <el-input type="text" v-model="form.tname"></el-input>
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
        name:'typesUpdate',
        data(){
            return{
                id:'',
                form:{
                    id:'',
                    tname:''
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'types',id:this.id,form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        //页面跳转到managerDir
                        this.$router.push('managerTypes');
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else if (res.body == 'error'){
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
            this.$http.post('/home/managerQuery.php',{table:'types',id:this.id}).then(res=>{
                this.form = res.body;
            })
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>