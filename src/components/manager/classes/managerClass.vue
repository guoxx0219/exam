<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 班级列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manager/classAdd">
                    <span class="icon-plus-square-o"></span>
                    添加班级
                </a>
            </div>
            <el-table height="420" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="cname" label="班级名">
                </el-table-column>
                <el-table-column prop="sname" label="目前进度">
                </el-table-column>
                <el-table-column prop="dname" label="方向名称">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'classUpdate',query:{id:scope.row.id}}" class="update">修改</router-link>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name:'managerClass',
        data(){
            return{
                tableData:[],
            }
        },
        methods:{
            del(id){
                this.$http.post('/home/managerDel.php',{table:'classes',id}).then(res=>{
                    this.tableData = this.tableData.filter(ele=>ele.id != id);
                })
            }
        },
        mounted(){
            this.$http.post('/home/tableQuery.php',{table:'classes'}).then(res=>{
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