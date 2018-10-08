<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Cass
              </div>
              <div class="card-body">
                <el-row>
                   <div class="card-body">
                      <div slot="header" class="card-header pull-left demo-form-inline" style="background:#E6F0F3;width:30%;margin:-30px 0px 20px -10px">
                        <h6>Check Due Cass for the month of</h6>
                          <el-form>
                              <el-form-item prop="date">
                                <el-date-picker  v-model="ruleForm.date" @change="viewDueCass()" type="month" placeholder="Pick a date"> </el-date-picker>
                              </el-form-item>
                          </el-form>
                      </div>
                  <router-link to="/admin/company/cass/add">
                    <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
                   </div>

                </el-row>
                <el-card class="box-card" style="width:100%;margin:auto" >
                  <el-table :data="tableData" style="width:100%;margin:auto"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column fixed="right" label="Operations" width="120">
                      <template slot-scope="scope">
                        <el-button @click=" handleClick(scope.row)" class="el-button--mini" type="primary" block> <i class="icon-pencil"></i></el-button>
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
                      <el-table-column prop="client.name" label="Client" width="170"> </el-table-column>
                      <el-table-column prop="service_type.service_type" label="Service Type" width="170"> </el-table-column>
                      <el-table-column prop="user.name" label="User" width="170"> </el-table-column>
                      <el-table-column prop="cass_type.cass_type" label="CASS Policy" width="170" > </el-table-column>
                      <el-table-column prop="due_month" label="Due Month" width="170" > </el-table-column>
                      <el-table-column prop="due_year" label="Due Year" width="170" > </el-table-column>
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
  name: 'Manage-Cass',
 data() {

      return {
        monthNames : ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
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
          this.axios.get(`cass`)
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
                this.$alertify.error("Unable to Fetch Cass")
              }
          }).finally(() => this.loading = false)
    },
    methods: {
      viewDueCass(){
         this.ruleForm.due_year = this.ruleForm.date.getFullYear().toString()
         this.ruleForm.due_month = this.monthNames[this.ruleForm.date.getMonth()]
         this.tableData = []
        this.loading = true
          this.axios.post(`cass/due`, this.ruleForm)
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
                this.$alertify.error("Unable to Fetch Due Cass")
              }
          }).finally(() => this.loading = false)
      },
      handleClick(scope) {
         this.$store.commit('editFlexcomLineScope', scope)
         this.$router.push({ path: '/admin/company/flexcom/line/edit' })
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
              this.axios.delete('cass/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/cass/manage' })
              })
              .catch(e => {
                  var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Delete Cass")
                }
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
