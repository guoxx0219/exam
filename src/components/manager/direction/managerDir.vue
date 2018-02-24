<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 方向列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manager/dirAdd">
                    <span class="icon-plus-square-o"></span>
                    添加方向
                </a>
            </div>
            <el-table height="420" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="dname" label="方向名">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'dirUpdate',query:{id:scope.row.id}}" class="update">修改</router-link>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name:'managerDir',
        data(){
            return{
                tableData:[],
            }
        },
        methods:{
          del(id){
              this.$http.post('/home/managerDel.php',{table:'direction',id}).then(res=>{
                  if (res.body == 'ok'){
                      this.tableData = this.tableData.filter(ele=>ele.id != id);
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
          }
        },
        mounted(){
            this.$http.post('/home/tableQuery.php',{table:'direction'},this.formatDate).then(res=>{
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