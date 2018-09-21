<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Support Ticket
              </div>
              <div class="card-body">
                <el-row>
                  <router-link to="/admin/company/ticket/support/add">
                    <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
                </el-row>
                <el-card class="box-card" style="width:100%;margin:auto" >
                  <el-table :data="tableData" style="width:100%;margin:auto"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column fixed="right" label="Operations" width="120" >
                      <template slot-scope="scope">
                       <el-button @click="handleView(scope.row)" style="width:10%;padding:5px 9px;margin-right:-7px" class="el-button--mini center" type="success" block> <i style="margin-left:-5px" class="icon-eye"></i></el-button>
                        <el-button @click=" handleClick(scope.row)" style="width:10%;padding:5px 9px;margin-right:3px" class="el-button--mini" type="primary" block> <i style="margin-left:-5px" class="icon-pencil"></i></el-button>
                     
                      </template>
                    </el-table-column>
                      <el-table-column type="index" label="S/N" > </el-table-column>
                      <el-table-column prop="client.name" label="Client Name" > </el-table-column>
                       <el-table-column prop="service_type.service_type" label="Service Type" > </el-table-column>
                      <el-table-column prop="start_date" label="Start Date" > </el-table-column>
                      <el-table-column prop="end_date" label="End Date" > </el-table-column>
                      <el-table-column prop="status" label="Status" :filters="[{ text: 'Closed', value: 'Closed' }, { text: 'Open', value: 'Pending' }]" :filter-method="filterTag" filter-placement="bottom-end">
                          <template slot-scope="scope" v-bind:class="{'el-tag el-tag--danger':scope.row.status == 'Closed'}">
                            <el-tag>
                              {{scope.row.status }}
                            </el-tag>
                          </template>
                       </el-table-column>
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
  name: 'Manage',
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
          const userId = this.$localStorage.get().data.id
          const role = this.$localStorage.get().data.role
            if(role == 'Staff'){
            this.axios.get(`supportTickets-by-user/`+ userId)
            .then(response => {
              this.tableData = response.data
              console.log(this.tableData)

            })
            .catch(e => {
              alert(e);
            }).finally(() => this.loading = false)
          }else{
            this.axios.get(`supportTickets`)
            .then(response => {
              this.tableData = response.data
              console.log(this.tableData)
              this.tableData.filter(id =>{
                this.fetchsupportTicketClient(id.client_id)
                this.fetchsupportTicketServiceType(id.service_type_id)
              })
            })
            .catch(e => {
              alert(e);
            }).finally(() => this.loading = false)
          }

    },
    methods: {

      fetchsupportTicketClient(id){
         this.axios.get(`clients/`+ id)
          .then(response => {
            this.client_name = response.data[0].name
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      fetchsupportTicketServiceType(id){
         this.axios.get(`serviceTypes/`+ id)
          .then(response => {
            this.service_type = response.data.service_type

          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
       fetchsupportTicketProjectOfficer(id){
         const projectOfficers = {'officers':id}
         this.axios.post(`users/officers`, projectOfficers)
          .then(response => {
            const vm = this
             response.data.map(value => {
              vm.project_officer = value.name
            })
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      handleClick(scope) {
        //console.log(scope)
         this.$store.commit('editSupportTicketScope', scope)
         this.$router.push({ path: '/admin/company/ticket/support/edit' })
      },
      handleView(scope) {
         this.$store.commit('editSupportTicketScope', scope)
         this.$router.push({ path: '/admin/company/ticket/support/view' })
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
              this.axios.delete('supportTickets/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/ticket/support/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Delete Record")
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
