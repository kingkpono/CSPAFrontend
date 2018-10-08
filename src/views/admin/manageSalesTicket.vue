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
                    <el-table-column fixed="right" label="Operations" width="120" >
                      <template slot-scope="scope">
                       <el-button @click="handleView(scope.row)" style="width:10%;padding:5px 9px;margin-right:-7px" class="el-button--mini center" type="success" block> <i style="margin-left:-5px" class="icon-eye"></i></el-button>
                        <el-button @click=" handleClick(scope.row)" style="width:10%;padding:5px 9px;margin-right:3px" class="el-button--mini" type="primary" block> <i style="margin-left:-5px" class="icon-pencil"></i></el-button>
                        <el-popover placement="top" width="160">
                          <p>Are you sure to delete this?</p>
                          <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" >cancel</el-button>
                            <el-button type="primary" size="mini" @click="handleDelete(scope.row)" >confirm</el-button>
                          </div>
                          <el-button slot="reference" class="el-button--mini" style="width:10%;padding:5px 9px" type="danger" block><i style="margin-left:-5px" class="icon-trash"></i></el-button>
                        </el-popover>
                      </template>
                    </el-table-column>
                      <el-table-column type="index" label="S/N" > </el-table-column>
                      <el-table-column prop="client.name" label="Client Name" > </el-table-column>
                       <el-table-column prop="service_type.service_type" label="Service Type" :filters="[{ text: 'TAMS', value: 'TAMS' }, { text: 'CCTV', value: 'CCTV' }, { text: 'Flexcom', value: 'Flexcom' }]" :filter-method="filterServiceType" filter-placement="bottom-end">
                          <template slot-scope="scope" v-bind:class="{'el-tag el-tag--success':scope.row.service_type.service_type == 'TAMS','el-tag el-tag--primary':scope.row.service_type.service_type == 'CCTV'}">
                            <el-tag>
                              {{scope.row.service_type.service_type }}
                            </el-tag>
                          </template>
                       </el-table-column>
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
          if(this.$localStorage.get().role == 'Staff'){
            this.axios.get(`salesTickets-by-user/`+ this.$localStorage.get().id)
            .then(response => {
              this.tableData = response.data
              this.tableData.filter(id =>{
                this.fetchSalesTicketClient(id.client_id)
                this.fetchSalesTicketServiceType(id.service_type_id)
                //this.fetchSalesTicketProjectOfficer(id.project_officers)
              })
            })
            .catch(e => {
               var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to fetch Sales Ticket")
                }
            }).finally(() => this.loading = false)
          }else{
             this.axios.get(`salesTickets`)
            .then(response => {
              this.tableData = response.data
              console.log(this.tableData)
              this.tableData.filter(id =>{
                this.fetchSalesTicketClient(id.client_id)
                this.fetchSalesTicketServiceType(id.service_type_id)
                //this.fetchSalesTicketProjectOfficer(id.project_officers)
              })
            })
            .catch(e => {
              var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to fetch Sales Ticket")
                }
            }).finally(() => this.loading = false)
          }

    },
    methods: {

      fetchSalesTicketClient(id){
         this.axios.get(`clients/`+ id)
          .then(response => {
            this.client_name = response.data[0].name
          })
          .catch(e => {
             var vm = this
              if(e.response.data.message){
                for(var key in e.response.data.message){
                  vm.$alertify.error(e.response.data.message[key]);
                }
              }else{
                this.$alertify.error("Unable to fetch Clients")
              }
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
             var vm = this
              if(e.response.data.message){
                for(var key in e.response.data.message){
                  vm.$alertify.error(e.response.data.message[key]);
                }
              }else{
                this.$alertify.error("Unable to Update Client")
              }
          }).finally(() =>
          this.loading = false
          )
      },
       fetchSalesTicketProjectOfficer(id){
         const projectOfficers = {'officers':id}
         this.axios.post(`users/officers`, projectOfficers)
          .then(response => {
            const vm = this
             response.data.map(value => {
              vm.project_officer = value.name
            })
          })
          .catch(e => {
             var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to fetch Project Officer")
                }
          }).finally(() =>
          this.loading = false
          )
      },
      handleClick(scope) {
        //console.log(scope)
         this.$store.commit('editSalesTicketScope', scope)
         this.$router.push({ path: '/admin/company/ticket/sales/edit' })
      },
      handleView(scope) {
         this.$store.commit('editSalesTicketScope', scope)
         this.$router.push({ path: '/admin/company/ticket/sales/view' })
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
      filterServiceType(value, row){
        return row.service_type.service_type === value;
      },
      handleDelete(row){
          let allData = []
          this.tableData.filter(value => {
            if(row.id !== value.id){
              allData.push(value);
            }
          })
          this.tableData = allData;
              this.axios.delete('salesTickets/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/ticket/sales/manage' })
              })
              .catch(e => {
                  var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Delete Sales Ticket")
                }
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
