<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 试卷列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/teacher/paperAdd">
                    <span class="icon-plus-square-o"></span>
                    添加试卷
                </a>
            </div>
            <el-table height="420" :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="pname" label="试卷名称">
                </el-table-column>
                <el-table-column prop="cname" label="班级名称">
                </el-table-column>
                <el-table-column prop="author" label="出题人">
                </el-table-column>
                <el-table-column prop="test" label="试题id">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'paperUpdate',query:{id:scope.row.id}}" class="update">编辑</router-link>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name:'managerPaper',
        data(){
            return{
                //存放数据库中获取的数据
                tableData5: [],
                arr : []
            }
        },
        methods:{
            del(id){
                  this.$http.post('/home/managerDel.php',{table:'paper',id}).then(res=>{
                      if (res.body == 'ok'){
                          this.tableData5 = this.tableData5.filter(ele=>ele.id != id);
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
                  });
          },
            test(){
                let newarr = [];
                this.arr.forEach(ele=>{
                    if(newarr.indexOf(ele.pid) == -1){
                        newarr.push(ele.pid);
                    }
                });
                newarr.forEach((value,index)=>{
                    let str = '';
                    this.arr.forEach(ele=>{
                        if (value == ele.pid){
                            str += ele.tid+',';
                        }
                    })
                    newarr[index] = {};
                    newarr[index].tid = str.slice(0,-1);
                    newarr[index].pid = value;
                });
                return newarr;
            },
        },
        computed:{
            //给tableData5添加属性test
            tableData(){
                if (!this.test().length){
                    return this.tableData5;;
                }
                let test = this.test();

                this.tableData5.forEach(ele=>{
                    test.forEach(value=>{
                        if (ele.id == value.pid){
                           ele.test = value.tid;
                        }
                    })
                })
                return this.tableData5;
            }
        },
        mounted(){
            this.$http.post('/home/paperQuery.php').then(res=>{
                this.tableData5 = res.body;
            });
            this.$http.post('/home/tableQuery.php',{table:'paper_extra'}).then(res=>{
                this.arr = res.body;
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