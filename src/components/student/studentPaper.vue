<template>
    <div class="paper">
        <div class="paper-top">
            <h2>试卷标题</h2>
            <el-button round>提交</el-button>
        </div>
        <el-form :model="form" ref="form">
            <div v-for="(item,index) in tableData" :key="index">
                <ul class="list" v-if="item.type=1">
                    <li>
                        <h5 class="list-p">{{item.title}}（{{item.score}}分）</h5>
                        <div class="list-content">
                            <el-form-item>
                                <el-radio-group v-model="form['title'+index]">
                                    <p v-model="form['title'+index]"></p>
                                    <el-radio label="v.key" :key="v.key" v-for="v in item.options">{{v.key}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </li>
                </ul>
                <ul class="list list2" v-else-if="item.type=2">
                    <li>
                        <h5 class="list-p">{{item.title}}（{{item.score}}分）</h5>
                        <div class="list-content">
                            <el-form-item>
                                <el-checkbox-group v-model="form['title'+index]">
                                    <el-checkbox v-for="v in item.options" label="v['key']" :key="v['key']"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </li>
                </ul>
                <ul class="list list3" v-else-if="item.type=3">
                    <li>
                        <h5 class="list-p">{{item.title}}（{{item.score}}分）</h5>
                        <div class="list-content">
                            <el-input type="textarea" v-model="form['title'+index]"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
        </el-form>
    </div>
</template>
<script>
    import ElCheckbox from "../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";
    import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio.vue";
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
    export default {
        components: {
            ElFormItem,
            ElRadio,
            ElCheckbox},
        name:'studentPaper',
        data(){
            return{
                tableData5: [],
                id:'',
                form:{
                    title0:'',
                    title1:'',
                    title2:'',
                    title3:'',
                    title4:'',
                    title5:'',
                }
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
                    tableData.push({id:ele.id,title,options,answer:ele.answer,score:ele.score});
                })
                return tableData;
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.$http.post('/home/studentTest.php',{id:this.id}).then(res=>{
                this.tableData5 = res.body.sort((a, b) => a.type - b.type);

                for(let i=0;i< this.tableData5.length;i++){
                    this.form['title' + i] = '';
                }
                this.tableData5.forEach((ele, index) => {
                    if (ele.type == 1 || ele.type == 3) {
                    } else if (ele.type == 2) {
                        this.form['title' + index] = [];
                    }
                })
            })
        }
    }
</script>
<style>
    .paper{
        width: 90%;
        height: auto;
        padding:0 10%;
        margin: 0 auto;
    }
    .paper-top{
        width: 100%;
        height: 50px;
        display: flex;
        margin: 20px 0;
    }
    .paper-top>h2{
        font-size: 20px;
        line-height: 50px;
        color: #5a5e66;
        margin-right: 150px;
    }
    .list{
        width: 90%;
        height: 60px;
        border:1px solid #dddddd;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        margin-bottom: 20px;
    }
    .list3{
        height: auto;
    }
    .list-p{
        font-size: 16px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #dddddd;
    }
    .list-content{
        width: 100%;
        height: auto;
        padding: 10px 0;
    }
</style>