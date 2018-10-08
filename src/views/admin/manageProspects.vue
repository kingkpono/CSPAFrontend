<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Prospects
              </div>
              <div class="card-body">
                   <el-card class="box-card" style="width:90%;margin:auto" >
                      <el-table :data="tableData" style="width: 100%"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
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
                          <el-table-column prop="name" label="Name" width="170"> </el-table-column>
                          <el-table-column prop="email" label="Email" width="170"> </el-table-column>
                          <el-table-column prop="client_type" label="Client- type" width="140"> </el-table-column>
                          <el-table-column prop="sector.name" label="Sector" width="170"> </el-table-column>
                          <el-table-column prop="vendor_status" label="Vendor-status" width="140"> </el-table-column>
                          <el-table-column prop="contact_person" label="Contact-person" width="140"> </el-table-column>
                          <el-table-column prop="bdmperson.name" label="BDM-person" width="140"> </el-table-column>
                          <el-table-column prop="address" label="Address" width="170"> </el-table-column>
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
  name: 'ManageProspects',
 data() {

      return {
        scope: '',
        loading:false,
        bdm_person: '',
        sector: '',
        tableData: [],
        multipleSelection: [],
      };
    },
     computed: {

    },
    mounted:function() {
      this.getClients()
    },
    methods: {

      getClients(){
          this.loading = true
          this.axios.get(`clients/type/prospect`)
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
                this.$alertify.error("Unable to fetch Client")
              }
          }).finally(() => this.loading = false)
      },
       handleClick(scope) {
         this.$store.commit('editProspectsScope', scope)
         this.$router.push({ path: '/admin/company/prospects/edit' })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleSelectionChange(val) {
         console.log(this.multipleSelection);
         this.multipleSelection = val;
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
              this.axios.delete('clients/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/prospects/manage' })
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
      }
    }
  }
</script>
