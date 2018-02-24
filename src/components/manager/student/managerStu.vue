<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 学生信息</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manager/stuAdd">
                    <span class="icon-plus-square-o"></span>
                    添加学生
                </a>
            </div>
            <el-table  ref="multipleTable" height="420"
                    :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="user" label="学生名称">
                </el-table-column>
                <el-table-column prop="cname" label="班级名称">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'stuUpdate',query:{id:scope.row.id}}" class="update">修改</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px" class="form-group">
                <el-button @click="toggleSel">反选</el-button>
                <el-button @click="cancelSel">取消选择</el-button>
                <el-button @click="del">删除</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'managerStu',
        data(){
            return{
                id:'',
                tableData:[],
                //存储选择的行信息
                multipleSelection: [],
                ids:[]
            }
        },
        methods:{
            del(){
                this.multipleSelection.forEach(ele=>{
                    for(let index in ele){
                        if (index == 'id'){
                            this.ids.push(ele.id);
                        }
                    }
                });
//                this.ids = this.multipleSelection.map(ele=>ele.id);

                this.$http.post('/home/deleteStu.php',{table:'student',ids:this.ids}).then(res=>{
                    if (res.body == 'ok'){
                        this.ids.forEach(element=>{
                            this.tableData = this.tableData.filter(ele=>ele.id != element);
                        })
                        this.$router.push('managerStu');
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '删除失败！',
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
            this.$http.post('/home/stuQuery.php').then(res=>{
                this.tableData = res.body;
            })
        }
    }
</script>
<style>
    .update{
        color: #409EFF;
        font-size: 12px;
    }
</style>