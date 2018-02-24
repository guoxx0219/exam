<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="班级名称"  class="form-group" prop="cname">
                    <el-input type="text" v-model="form.cname"></el-input>
                </el-form-item>
                <el-form-item label="所属方向">
                    <el-select v-model="form.dname" placeholder="请选择所属方向" class="form-group">
                        <el-option
                                v-for="item in dir"
                                :key="item.id"
                                :label="item.dname"
                                :value="item.dname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目前阶段">
                    <el-select v-model="form.sname" placeholder="请选择目前的阶段名称" class="form-group">
                        <el-option
                                v-for="item in stage"
                                :key="item.id"
                                :label="item.sname"
                                :value="item.sname">
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
        name:'classAdd',
        data(){
            return {
                dir:[],
                stage:[],
                form:{
                    cname:'',
                    sname:'',
                    dname:'',
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerInsert.php',{table:'classes',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerClass');
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '添加失败！',
                            type: 'warning'
                        });
                    }
                })
            }
        },
        mounted(){
            //res为请求成功后返回的数据，rej为请求失败返回的数据--回调函数的两个参数
            this.$http.post('/home/tableQuery.php',{table:'direction'}).then(res=>{
                this.dir = res.body;
            });
            this.$http.post('/home/tableQuery.php',{table:'stage'}).then(res=>{
                this.stage = res.body;
            })
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>