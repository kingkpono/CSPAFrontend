<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Flexcom
              </div>
              <div class="card-body">
                <el-row>
                   <div class="card-body">


                   </div>

                </el-row>
                <el-card class="box-card" style="width:100%;margin:auto" >
                  <el-table :data="tableData" style="width:100%;margin:auto"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column fixed="right" label="Operations" width="120">
                      <template slot-scope="scope">
                        <el-popover placement="top" width="160">
                          <p>Are you sure to delete this?</p>
                          <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" >cancel</el-button>
                            <el-button type="primary" size="mini" @click="handleDelete(scope.row)" >confirm</el-button>
                          </div>
                          <el-button slot="reference" class="el-button--mini"  type="danger" block><i class="icon-trash"></i></el-button>
                        </el-popover>
                      </template>
                    </el-table-column>
                      <el-table-column type="index" label="S/N" > </el-table-column>
                      <el-table-column prop="name" label="Client" width="170"> </el-table-column>
                      <el-table-column prop="email" label="Email" width="170"> </el-table-column>
                      <el-table-column prop="mobile" label="Mobile" width="170"> </el-table-column>
                       <el-table-column prop="bdm_person.name" label="BDM person" width="170"> </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage-Flexcom',
 data() {

      return {

        due_cass:false,
        serialNumber:'',
        loading:false,
        tableData: [],
        multipleSelection: [],
        selectedId: [],
        ruleForm:{
          date:'',
          due_month:'',
          due_year:''
        }
      };
    },

    mounted:function() {
      this.loading = true
      this.axios.get(`flexcom/clients`)
      .then(response => {
        this.tableData = response.data
      })
      .catch(e => {
         var vm = this
          if(e.response.data.message){
            for(var key in e.response.data.message){
              vm.$alertify.error(e.response.data.message[key]);
            }
          }else{
            this.$alertify.error("Unable to fetch flexcom Client")
          }
      }).finally(() => this.loading = false)
    },
    methods: {

      handleClick(scope) {
         this.$store.commit('editCassScope', scope)
         this.$router.push({ path: '/admin/company/cass/edit' })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSelectionChange(val) {
         this.multipleSelection = val;
      },
      clearSelection(){
        this.$refs.multipleTable.clearSelection();
      },
      filterTag(value, row) {
        return row.status === value;
      },
      handleDelete(row){
          let allData = []
          this.tableData.filter(value => {
            if(row.id !== value.id){
              allData.push(value);
            }
          })
          this.tableData = allData;
              this.axios.delete('flexcom/clients/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/flexcom/clients' })
              })
              .catch(e => {
                  var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Delete Client")
                }
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
