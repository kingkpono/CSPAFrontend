<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Devices
              </div>
              <el-dialog title="Enter Serial Number Of Device" :visible.sync="centerDialogVisible" width="30%" center>
                <el-input placeholder="Serial Number" size="mini"  v-model="serialNumber"></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
                </span>
              </el-dialog>
              <div class="card-body">
                <el-row>
                  <router-link to="/admin/company/devices/add">
                    <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
                  <el-button style="margin-bottom:20px" @click="centerDialogVisible = true" class="el-button--mini pull-left" type="info" block ><i class="icon-search" block></i> Check device info</el-button>
                </el-row>
                <el-card class="box-card" style="width:70%;margin:auto" >
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
                      <el-table-column prop="name" label="Name" > </el-table-column>
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
  name: 'Manage-Devices',
 data() {

      return {
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
          this.axios.get(`devices`)
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
                this.$alertify.error("Unable to fetch Devices")
              }
          }).finally(() => this.loading = false)
    },
    methods: {
       handleClick(scope) {
         this.$store.commit('editDeviceScope', scope)
         this.$router.push({ path: '/admin/company/devices/edit' })
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
              this.axios.delete('devices/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/company/devices/manage' })
              })
              .catch(e => {
                  var vm = this
                  if(e.response.data.message){
                    for(var key in e.response.data.message){
                      vm.$alertify.error(e.response.data.message[key]);
                    }
                  }else{
                    this.$alertify.error("Unable to Delete Device")
                  }
              }).finally(() => this.loading = false)
      },

    }
  }
</script>
