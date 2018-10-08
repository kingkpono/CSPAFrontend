<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Ticket Managers
              </div>
              <div class="card-body">

                <el-card class="box-card" style="width:80%;margin:auto" >
                  <el-table :data="tableData" style="width:100%;margin:auto"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                     <el-table-column fixed="right" label="Operations" width="120" >
                      <template slot-scope="scope">
                        <el-popover placement="top" width="160">
                          <p>Remove from the list of ticket managers?</p>
                          <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" >cancel</el-button>
                            <el-button type="primary" size="mini" @click="handleDelete(scope.row)" >confirm</el-button>
                          </div>
                          <el-button slot="reference" class="el-button--mini" style="width:10%;padding:5px 9px" type="danger" block><i style="margin-left:-5px" class="icon-trash"></i></el-button>
                        </el-popover>
                      </template>
                    </el-table-column>
                      <el-table-column type="index" label="S/N" > </el-table-column>
                      <el-table-column prop="user.name" label="Name" width="200"> </el-table-column>
                      <el-table-column prop="user.email" label="Email" width="170"> </el-table-column>
                       <el-table-column prop="user.role" label="Role" width="100">
                          <template slot-scope="scope">
                            <el-tag class="danger">
                              {{scope.row.user.role }}
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
  name: 'Manage Ticket Managers',
 data() {

      return {

        loading:false,
        tableData: [],
        multipleSelection: [],
        selectedId: [],

      };
    },

    mounted:function() {
      this.loading = true
      this.axios.get(`bdmpersons`)
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
            this.$alertify.error("Unable to fetch BDM Manager")
          }
      }).finally(() => this.loading = false)
    },
    methods: {

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
          this.axios.delete('bdmpersons/'+ row.id)
          .then(response => {
            this.$alertify.success("Record Deleted Successfully")
            this.$router.push({ path: '/admin/staff/ticket-managers' })
          })
          .catch(e => {
              var vm = this
              if(e.response.data.message){
                for(var key in e.response.data.message){
                  vm.$alertify.error(e.response.data.message[key]);
                }
              }else{
                this.$alertify.error("Unable to Delete Record")
              }
          }).finally(() => this.loading = false)
      }


    }
  }
</script>
