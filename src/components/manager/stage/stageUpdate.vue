<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="所属方向">
                    <el-select v-model="form.did" placeholder="请选择所属方向" class="form-group">
                            <el-option
                                    v-for="item in options"
                                    :key="item.dname"
                                    :label="item.dname"
                                    :value="item.id">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阶段名称"  class="form-group" prop="sname">
                    <el-input type="text" v-model="form.sname"></el-input>
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
        name:'stageUpdate',
        data(){
            return{
                id:'',
                form:{
                    id:'',
                    sname:'',
                    did:''
                },
                options:[]
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'stage',id:this.id,form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerStage');
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
            this.$http.post('/home/managerQuery.php',{table:'stage',id:this.id}).then(res=>{
                this.form = res.body;
            })
            this.$http.post('/home/tableQuery.php',{table:'direction'}).then(res=>{
                this.options = res.body;
            })
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>