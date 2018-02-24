<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="方向名称"  class="form-group" prop="dname">
                    <el-input type="text" v-model="form.dname"></el-input>
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
        name:'dirAdd',
        data(){
            return {
                form:{
                    dname:''
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerInsert.php',{table:'direction',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerDir');
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else if(res.body == 'error'){
                        this.$message({
                            message: '删除失败！',
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>