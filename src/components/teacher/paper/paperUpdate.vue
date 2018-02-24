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
        <el-table  ref="multipleTable" height="240"
                   :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
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
        <div style="margin-top: 20px" class="form-group">
            <el-button @click="toggleSel">反选</el-button>
            <el-button @click="cancelSel">取消选择</el-button>
            <el-button @click="addTest">添加</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name:'paperUpdate',
        data(){
            return{
                id:'',
                form:{
                    pid:'',
                    cid:''
                },
                classes:[],
                multipleSelection: [],
                tableData5: [],
                arr:[]
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
                });
                this.select();
                return tableData;
            },
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/managerUpdate.php',{table:'paper',form:this.form,id:this.id}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerPaper');
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '修改失败！',
                            type: 'warning'
                        });
                    }
                })
            },
            addTest(){
                this.$http.post('/home/delCon.php',{id:this.id}).then(res=>{
                    if(res.body != 'ok'){
                        return;
                    }
                })
                var flag = 1;
                let ids = this.multipleSelection.map(ele=>ele.id);
                if (this.arr.length == 0){
                    return;
                }
                this.arr.forEach(ele=>{
                    ids.forEach(value=>{
                        if (ele.pid == this.id && ele.tid == value){
                            this.$refs.multipleTable.clearSelection();
                            this.$message({
                                message: '已有试题，请重新选择！',
                                type: 'warning'
                            });
                            return flag = 2;
                        }
                    })
                    if(flag == 1){
                        return flag = 3;
                    }
                });
                if (flag == 3) {
                    this.$http.post('/home/uploadSome.php', {table: 'paper_extra', ids, id: this.id}).then(res => {
                        if (res.body == 'ok') {
                            this.$router.push('managerPaper');
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                message: '添加失败！',
                                type: 'warning'
                            });
                        }
                    })
                }
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
            },
            sel(rows){
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            select(){
                this.$http.post('/home/tableQuery.php', {table: 'paper_extra'}).then(res => {
                    this.arr = res.body;
                    if (!this.arr.length){
                        return;
                    }
                    if (!this.tableData.length){
                        return;
                    }
                    var sel = [];
                    this.arr.forEach(ele=>{
                        this.tableData.forEach((value,index)=>{
                            if(ele.pid == this.id){
                                if(value.id == ele.tid){
                                    sel.push(this.tableData[index]);
                                }
                            }
                        })
                    });
                    if (sel.length){
                        this.sel(sel);
                    }
                })
            }
        },
        mounted(){
        this.id = this.$route.query.id;
        this.$http.post('/home/managerQuery.php', {id: this.id, table: 'paper'}).then(res => {
            this.form = res.body;
        })
        this.$http.post('/home/tableQuery.php', {table: 'classes'}).then(res => {
            this.classes = res.body;
        })
        this.$http.post('/home/testQuery.php').then(res => {
            this.tableData5 = res.body;
        });
    }
    }
</script>
<style>
    .button-size{
        width: 15%;
    }
</style>
