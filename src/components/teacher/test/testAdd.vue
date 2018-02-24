<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="所属阶段">
                    <el-select v-model="form.sid" placeholder="请选择所属阶段名称" class="form-group">
                        <el-option
                                v-for="item in stage"
                                :key="item.id"
                                :label="item.sname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题类型">
                    <el-select v-model="form.type" placeholder="请选择试题类型的名称" class="form-group">
                        <el-option
                                v-for="item in types"
                                :key="item.id"
                                :label="item.tname"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="试题内容"  class="form-group" prop="title">
                    <el-input type="textarea" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="试题答案"  class="form-group" prop="answer">
                    <el-input type="textarea" v-model="form.answer"></el-input>
                </el-form-item>
                <el-form-item label="答案解析"  class="form-group" prop="exp">
                    <el-input type="textarea" v-model="form.exp"></el-input>
                </el-form-item>
                <el-form-item label="试题得分"  class="form-group" prop="score">
                    <el-input type="text" v-model="form.score"></el-input>
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
        name:'testAdd',
        data(){
            return {
                types:[],
                stage:[],
                form:{
                    title:'',
                    type:'',
                    sid:'',
                    answer:'',
                    exp:'',
                    score:'',
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/addUserInsert.php',{table:'test',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerTest');
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
            this.$http.post('/home/tableQuery.php',{table:'types'}).then(res=>{
                this.types = res.body;
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