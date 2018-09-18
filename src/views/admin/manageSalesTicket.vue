<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Sales Ticket
              </div>

              <div class="card-body">
                <el-row>
                  <router-link to="/admin/company/ticket/sales/add">
                    <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
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
                      <el-table-column prop="client_id" label="Client Name" >
                        <template slot-scope="scope">
                            <el-tag>
                              {{ client_name}}
                            </el-tag>
                          </template>
                      </el-table-column>
                       <el-table-column prop="service_type_id" label="Service Type" >
                        <template slot-scope="scope">
                            <el-tag>
                              {{ service_type}}
                            </el-tag>
                          </template>
                      </el-table-column>
                      <el-table-column prop="project_officers" label="Officers  " >
                        <template slot-scope="scope">
                            <el-tag>
                              {{ project_officer}}
                            </el-tag>
                          </template>
                      </el-table-column>
                      <el-table-column prop="start_date" label="Start Date" > </el-table-column>
                      <el-table-column prop="end_date" label="End Date" > </el-table-column>
                       <el-table-column prop="status" label="Status" > </el-table-column>
                         <el-table-column prop="project_details" label="Details" > </el-table-column>
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
  name: 'Manage Sales Ticket',
 data() {

      return {
        project_officer:'',
        service_type:'',
        client_name:'',
        serialNumber:'',
        centerDialogVisible:false,
        loading:false,
        tableData: [],
        multipleSelection: [],
        selectedId: []
      };
    },

    mounted:function() {
          this.loading = true
          this.axios.get(`salesTickets`)
          .then(response => {
            this.tableData = response.data
            this.tableData.filter(id =>{
              this.fetchSalesTicketClient(id.client_id)
              this.fetchSalesTicketServiceType(id.service_type_id)
              this.fetchSalesTicketProjectOfficer(id.project_officers)
            })
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
    },
    methods: {
      fetchSalesTicketClient(id){
         this.axios.get(`clients/`+ id)
          .then(response => {
            this.client_name = response.data[0].name
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      fetchSalesTicketServiceType(id){
         this.axios.get(`serviceTypes/`+ id)
          .then(response => {
            this.service_type = response.data.service_type

          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
       fetchSalesTicketProjectOfficer(id){
         this.axios.get(`users/`+ id)
          .then(response => {
            this.project_officer = response.data.name
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      handleClick(scope) {
        console.log(scope)
         this.$store.commit('editSalesTicketScope', scope)
         this.$router.push({ path: '/admin/company/ticket/sales/edit' })
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
              this.axios.delete('serviceTypes/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/devices/service-types/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Delete Record")
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
