<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="id" class="form-group" prop="id">
                    {{id}}
                </el-form-item>
                <el-form-item label="班级名称"  class="form-group" prop="cname">
                    <el-input type="text" v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item label="目前阶段">
                    <el-select v-model="form.sname" placeholder="请选择目前阶段的名称" class="form-group">
                        <el-option
                                v-for="item in stage"
                                :key="item.id"
                                :label="item.sname"
                                :value="item.sname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属方向">
                    <el-select v-model="form.dname" placeholder="请选择所属方向" class="form-group">
                        <el-option
                                v-for="item in dir"
                                :key="item.did"
                                :label="item.dname"
                                :value="item.dname">
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
        name:'stageUpdate',
        data(){
            return{
                id:'',
                form:{
                    cname:'',
                    sname:'',
                    dname:''
                },
                dir:[],
                stage:[]
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'classes',id:this.id,form:this.form}).then(res=>{
                    if(res.body == 'ok'){
                        this.$router.push('managerClass');
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else{
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
            this.$http.post('/home/managerQuery.php',{table:'classes',id:this.id}).then(res=>{
                this.form = res.body;
            })
            this.$http.post('/home/queryName.php',{table:'stage',name:'sname'}).then(res=>{
                this.stage = res.body;
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