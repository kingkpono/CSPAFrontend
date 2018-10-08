<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Sector
              </div>
              <div class="card-body">
                  <el-row>
                  <router-link to="/admin/sector/add">
                     <el-button style="margin-bottom:20px" class="el-button--mini pull-right" type="success" block ><i class="icon-plus" block></i> Create</el-button>
                  </router-link>
                  </el-row>

                   <el-card class="box-card" style="width:90%;margin:auto" >
                      <el-table :data="tableData" style="width: 100%"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                       <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column fixed="right" label="Operations" width="120">
                          <template slot-scope="scope">
                            <el-button @click=" handleClick(scope.row)" class="el-button--mini" type="primary" block> <i class="icon-pencil"></i></el-button>
                          </template>
                        </el-table-column>
                          <el-table-column type="index" label="S/N" > </el-table-column>
                          <el-table-column prop="name" label="Name" > </el-table-column>
                          <el-table-column prop="description" label="Description" > </el-table-column>
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
  name: 'Manage-Sector',
 data() {

      return {
        loading:false,
        tableData: [],
        multipleSelection: [],
        selectedId: []
      };
    },
     computed: {
        count: function(){
          return console.log(this.$store.state.count)
        }
    },
    mounted:function() {
          this.loading = true
          this.axios.get(`sectors`)
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
                this.$alertify.error("Unable to fetch Sectors")
              }
          }).finally(() => this.loading = false)
    },
    methods: {
       handleClick(scope) {
         this.$store.commit('editSectorScope', scope)
         this.$router.push({ path: '/admin/sector/edit' })
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
              this.axios.delete('sectors/'+ row.id)
              .then(response => {
                 this.$alertify.success("Record Deleted Successfully")
                this.$router.push({ path: '/admin/sector/manage' })
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
      },

    }
  }
</script>
