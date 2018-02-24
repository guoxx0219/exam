<template>
    <div>
        <el-form  ref="form" :model="form" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px;">
            <div class="panel-body">
                <div class="form-group">
                    <label for="file">逐条添加</label>
                </div>
                <el-form-item label="学生名称"  class="form-group" prop="user">
                    <el-input type="text" v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="所属班级">
                    <el-select v-model="form.cname" placeholder="请选择所属班级名称" class="form-group">
                        <el-option
                                v-for="item in classes"
                                :key="item.id"
                                :label="item.cname"
                                :value="item.cname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div>
                    <el-button type="primary" @click="onSubmit" class="button button-block bg-main text-big input-big button-size">提交</el-button>
                </div>
            </div>
        </el-form>
        <el-form  ref="formAll" :model="formAll" label-width="80px" class="panel loginbox" style="padding: 0 10px 0 20px; margin-top: 20px;" >
            <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
                <div class="panel-body">
                    <form class="form-inline">
                    <div class="form-group">
                        <label for="file" style="display: block;margin: 20px 0">批量添加</label>
                        <input type="file" class="form-control" style="display: block" id="file" :accept="SheetJSFT" @change="_change" />
                    </div>
                </form>
                    <div>
                        <el-button type="primary" @click="onSubmitAll" class="button button-block bg-main text-big input-big button-size">提交</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
    const _XLSX = require('xlsx');
    const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX;
    const make_cols = refstr => Array(X.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:X.utils.encode_col(i), key:i}));
    /* see Browser download file example in docs */
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    const _SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");
    export default {
        name:'stageAdd',
        data(){
            return{
                data: ["SheetJS".split(""), "1234567".split("")],
                SheetJSFT: _SheetJSFT,
                form:{
                    user:'',
                    cname:''
                },
                classes:[],
                formAll:{
                    user:'',
                    cname:''
                }
            }
        },
        methods:{
            onSubmit(){
                this.$http.post('/home/addPassInsert.php',{table:'student',form:this.form}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerStu');
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
            onSubmitAll(){
                this.$http.post('/home/uploadAll.php',{data:this.data.slice(1)}).then(res=>{
                    if (res.body == 'ok'){
                        this.$router.push('managerStu');
                        this.formAll = res.body;
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
            _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
            _drop(evt) {
                evt.stopPropagation(); evt.preventDefault();
                const files = evt.dataTransfer.files;
                if(files && files[0]) this._file(files[0]);
            },
            _change(evt) {
                const files = evt.target.files;
                if(files && files[0]) this._file(files[0]);
            },
            _export(evt) {
                /* convert state to workbook */
                const ws = X.utils.aoa_to_sheet(this.data);
                const wb = X.utils.book_new();
                X.utils.book_append_sheet(wb, ws, "SheetJS");
                /* generate X file */
                const wbout = X.write(wb, {type:"binary", bookType:"xlsx"});
                /* send to client */
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "sheetjs.xlsx");
            },
            _file(file) {
                /* Boilerplate to set up FileReader */
                const reader = new FileReader();
                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = X.read(bstr, {type:'binary'});
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = X.utils.sheet_to_json(ws, {header:1});
                    /* Update state */
                    this.data = data;
                    this.cols = make_cols(ws['!ref']);
                };
                reader.readAsBinaryString(file);
            }
        },
        mounted(){
            this.$http.post('/home/queryName.php',{name:'cname',table:'classes'}).then(res=>{
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