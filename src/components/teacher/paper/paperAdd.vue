<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <el-form-item label="试卷名称"  class="form-group" prop="pname">
                    <el-input type="text" v-model="form.pname"></el-input>
                </el-form-item>
                <el-form-item label="所属班级">
                    <el-select v-model="form.cid" placeholder="请选择所属班级名称" class="form-group">
                        <el-option
                                v-for="item in classes"
                                :key="item.id"
                                :label="item.cname"
                                :value="item.id">
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
        name:'stageAdd',
        data(){
            return{
                id:'',
                form:{
                    pname:'',
                    cid:''
                },
                classes:[],
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/addUserInsert.php',{table:'paper',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerPaper');
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '添加失败！',
                            type: 'warning'
                        });
                    }
                })
            },
            addTest(){
                let ids = this.multipleSelection.map(ele=>ele.id);
                this.$http.post('/home/uploadSome.php',{ids,id:this.id}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerPaper');
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '添加失败！',
                            type: 'warning'
                        });
                    }
                })
            },
            toggleSel(){
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            cancelSel(){
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        mounted(){
            this.$http.post('/home/tableQuery.php',{table:'classes'}).then(res=>{
                this.classes = res.body;
            })
        }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>