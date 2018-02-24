<template>
    <div>
        <div class="panel admin-panel">
            <div class="panel-head"><strong class="icon-reorder"> 试题列表</strong></div>
            <div class="padding border-bottom">
                <a class="button border-yellow" href="#/teacher/testAdd">
                    <span class="icon-plus-square-o"></span>
                    添加试题
                </a>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%" height="400">
                <el-table-column type="expand">
                    <!--props.row存放每一行对应的数据-->
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="解析">
                                <span>{{ props.row.exp }}</span>
                            </el-form-item>
                            <div v-if="props.row.options">
                                <el-form-item label="选项">
                                </el-form-item>
                                <el-form-item v-for="item in props.row.options">
                                    <span>{{item.key}}</span>:<span>{{item.value}}</span>
                                </el-form-item>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="ID"
                        prop="id">
                </el-table-column>
                <el-table-column
                        label="题干"
                        prop="title">
                </el-table-column>
                <el-table-column
                        label="类型"
                        prop="tname">
                </el-table-column>
                <el-table-column
                        label="答案"
                        prop="answer">
                </el-table-column>
                <el-table-column
                        label="分数"
                        prop="score">
                </el-table-column>
                <el-table-column
                        label="出题者"
                        prop="author">
                </el-table-column>
                <el-table-column
                        label="阶段"
                        prop="sname">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name:'managerTest',
        data(){
            return{
                //存放数据库中获取的数据
                tableData5: [],
            }
        },
        computed:{
            tableData(){
                let tableData= [];
                // 将数据库的原始数据     title: '这是一道选择题_A:1|B:2'
//    变为：              title: '这是一道选择题',
//                        options: [{key:A,value:1},{key:B,value:2}],
                this.tableData5.forEach(ele=>{
                    let arr = ele.title.split('_');
                    let title = arr[0];
                    let options = [];
                    //arr[1]存在，表示试卷类型是选择题，否则是简答题
                    if (arr[1]){
                        //A:1|B:2
                        let newarr = arr[1].split('|');
                        //[A:1] [B:2]
                        newarr.forEach(v=>{
                            let arr3 = v.split(':');
                            options.push({key:arr3[0],value:arr3[1]});
                        })
                    }else {
                        options = '';
                    }
                    tableData.push({id:ele.id,title,options,answer:ele.answer,exp:ele.exp,tname:ele.tname,author:ele.author,score:ele.score,sname:ele.sname});
                })
                return tableData;
            }
        },
        methods:{
          del(id){
              this.$http.post('/home/managerDel.php',{table:'test',id}).then(res=>{
                  if (res.body == 'ok'){
                      this.tableData5 = this.tableData.filter(ele=>ele.id != id);
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
            this.$http.post('/home/testQuery.php').then(res=>{
                this.tableData5 = res.body;
            })
        }
    }
</script>
<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>