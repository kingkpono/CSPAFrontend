<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Company Assignment
              </div>
              <div class="card-body">


                   <el-card class="box-card" style="width:90%;margin:auto" >
                     <el-form :inline="true" class="demo-form-inline" v-show="multipleSelection.length" style="border:1px solid #ddd;padding:10px;margin-bottom:20px;height:60px">
                      <el-form-item label="BDM manager:">
                        <el-select v-model="bdm_person_to_assign" placeholder="BDM manager">
                           <el-option v-for="item in bdm_persons"  :key="item.id" :value="item.id" :label="item.name" element-loading-spinner="el-icon-loading" v-loading="fetchQueryValueLoader"></el-option>
                        </el-select>
                        <el-form-item label="">
                         <el-button style="margin-left:20px" class="el-button--mini" type="success" block @click="AssignCompany">Assign</el-button>
                       </el-form-item>
                      </el-form-item>

                    </el-form>
                     <el-form :inline="true" class="demo-form-inline" v-show="!multipleSelection.length" style="border:1px solid #ddd;padding:10px;margin-bottom:20px;height:60px">
                      <el-form-item label="Client type:">
                        <el-select v-model="client_type" placeholder="Client type">
                          <el-option label="All" value="all"></el-option>
                          <el-option label="Customer" value="customer"></el-option>
                          <el-option label="Prospect" value="prospect"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Sectors">
                        <el-select v-model="value" placeholder="Select" >
                         <el-option v-for="item in sector_value"  :key="item.id" :value="item.id" :label="item.name" element-loading-spinner="el-icon-loading" v-loading="fetchQueryValueLoader"></el-option>
                        </el-select>
                      </el-form-item>
                       <el-form-item label="">
                         <el-button style="margin-bottom:20px" class="el-button--mini" type="success" block @click="fetchQuery">Query</el-button>
                       </el-form-item>
                    </el-form>
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
  name: 'Manage-Clients',
 data() {

      return {
        bdm_person_data:{},
        bdm_person_to_assign:'',
        assigncomp:false,
        fetchQueryValueLoader: true,
        bdm_persons:'',
        value:'',
        scope: '',
        query_value: [],
        client_type: '',
        sector_value: [],
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
      this.getSectors()
      this.getbdmPersons()
    },
    methods: {
      fetchQuery(){
        console.log(this.value + this.client_type)
       if(this.client_type == 'all' ||this.client_type == '' && this.value !== ''){
            this.getClientBySector(this.value)
        }else if(this.client_type !== 'all' && this.value){
            this.getClientBySectorAndClientType(this.value,this.client_type)
        }else if(this.client_type !== 'all'){
           this.getClientsByType(this.client_type)
        }else if(this.client_type == 'all'){
          this.getClients()
        }
      },
      getClientBySectorAndClientType(sector_id,client_type){
        this.loading = true
         this.axios.get('clients/by-type-and-sector/'+client_type+'/'+ sector_id)
          .then(response => {
            this.tableData = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
      },
      getClientByBdmperson(id){
        this.loading = true
         this.axios.get(`clients/bdm/`+ id)
          .then(response => {
            this.tableData = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
      },
      getClientBySector(id){
        this.loading = true
         this.axios.get(`clients/sector/`+ id)
          .then(response => {
            this.tableData = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
      },
      getSectors(){
          this.axios.get(`sectors`)
          .then(response => {
            console.log(response.data)
            this.sector_value = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.fetchQueryValueLoader = false)
      },
      getbdmPersons(){
          this.axios.get(`bdmpersons`)
          .then(response => {
            this.bdm_persons = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.fetchQueryValueLoader = false)
      },
      getClientsByType(type){
          this.loading = true
          this.axios.get(`clients/type/`+type)
          .then(response => {
            this.tableData = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
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
         this.multipleSelection = val;
      },
       filterTag(value, row) {
        return row.status === value;
      },
      AssignCompany(){
        if(this.multipleSelection.length <= 0){
           this.$alertify.error("Please select a company")
        }else if(this.bdm_person_to_assign <= 0){
          this.$alertify.error("Please select a BDM Manager")
        }else{
          let client_id = ''
          this.bdm_person_data.bdm_person_id = this.bdm_person_to_assign
          this.multipleSelection.forEach(function(element) {
             return client_id = element.id
          });
          this.updateBdmManager(client_id,this.bdm_person_data)
        }
      },
      updateBdmManager(id,bdmperson){
        this.loading = true
        this.axios.put('clients/'+ id, bdmperson)
        .then(response => {
            this.$alertify.success("BDM Manager Updated Successfully")
           this.$router.push({ path: '/admin/company/company-assignment/manage' })
        })
        .catch(e => {

        }).finally(() => this.loading = false)
      },
      handleDelete(row){
        this.loading = true
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
