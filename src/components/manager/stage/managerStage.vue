<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 阶段内容</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/manager/stageAdd">
                    <span class="icon-plus-square-o"></span>
                    添加阶段
                </a>
            </div>
            <el-table height="420" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="sname" label="阶段名称">
                </el-table-column>
                <el-table-column prop="dname" label="所属方向">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'stageUpdate',query:{id:scope.row.id}}" class="update">修改</router-link>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default{
        name:'managerStage',
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
          del(id){
              this.$http.post('/home/managerDel.php',{table:'stage',id}).then(res=>{
                  this.tableData = this.tableData.filter(ele=>ele.id != id);
                  if (res.body == 'ok'){
                      this.$router.push('managerStage');
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
            this.$http.post('/home/stageQuery.php').then(res=>{
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