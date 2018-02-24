<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
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
        name:'dirAdd',
        data(){
            return {
                form:{
                    tname:''
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerInsert.php',{table:'types',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerTypes');
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else if(res.body == 'error'){
                        this.$message({
                            message: '添加失败！',
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