<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Clients
              </div>
              <div class="card-body">
                  <el-row>
                  <router-link to="/admin/company/clients/add">
                     <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
                  </el-row>

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
                          <el-table-column prop="sector_id" label="Sector" width="170"> </el-table-column>
                          <el-table-column prop="vendor_status" label="Vendor-status" width="140"> </el-table-column>
                          <el-table-column prop="contact_person" label="Contact-person" width="140"> </el-table-column>
                          <el-table-column prop="bdm_person_id" label="BDM-person" width="140"> </el-table-column>
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
  name: 'Manage-Clients',
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
      getBdmpersonNameById(scope){
       
          this.loading = true
          this.axios.get(`bdmpersons/` + scope.bdm_person_id)
          .then(response => {
           return this.bdm_person = response.data.name
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
          return this.bdm_person
      },
       getSectorNameById(scope){
          this.loading = true
          console.log(scope);
          this.axios.get(`sectors/` + scope.sector_id)
          .then(response => {
           return this.sector = response.data.name
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
          return this.sector
      },
      getClients(){
          this.loading = true
          this.axios.get(`clients`)
          .then(response => {
            this.tableData = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
      },
       handleClick(scope) {
         this.$store.commit('editClientScope', scope)
         this.$router.push({ path: '/admin/company/clients/edit' })
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
                this.$router.push({ path: '/admin/company/clients/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Delete Record")
              }).finally(() => this.loading = false)
      }
    }
  }
</script>
