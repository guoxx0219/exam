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
        name:'typesUpdate',
        data(){
            return{
                id:'',
                form:{
                    title:'',
                    type:'',
                    sid:'',
                    answer:'',
                    exp:'',
                    score:'',
                },
                types:[],
                stage:[],
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'test',id:this.id,form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        //页面跳转到managerDir
                        this.$router.push('managerTest');
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
            this.$http.post('/home/managerQuery.php',{table:'test',id:this.id}).then(res=>{
                this.form = res.body;
            })
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