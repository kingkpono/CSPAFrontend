<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Manage Summary
              </div>
              <div class="card-body">
                <el-row>


                </el-row>
                <el-card class="box-card" style="width:80%;margin:auto" >
                  <el-table :data="tableData" style="width:100%;margin:auto"  v-loading="loading"  ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>

                      <el-table-column type="index" label="S/N" > </el-table-column>
                      <el-table-column prop="name" label="Client" width="200"> </el-table-column>
                      <el-table-column prop="mobile" label="Line" width="170"> </el-table-column>
                       <el-table-column prop="active" label="Active" width="100">
                          <template slot-scope="scope">
                            <el-tag>
                              {{scope.row.active }}
                            </el-tag>
                          </template>
                       </el-table-column>
                        <el-table-column prop="inactive" label="Inactive" width="100">
                          <template slot-scope="scope">
                            <el-tag class="danger">
                              {{scope.row.inactive }}
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
  name: 'Manage Flexcom Summary',
 data() {

      return {

        due_cass:false,
        serialNumber:'',
        loading:false,
        tableData: [],
        multipleSelection: [],
        selectedId: [],

      };
    },

    mounted:function() {
      this.loading = true
      this.axios.get(`flexcom/lines/summary`)
      .then(response => {
        this.tableData = response.data
      })
      .catch(e => {
        alert(e);
      }).finally(() => this.loading = false)
    },
    methods: {

      handleClick(scope) {
         this.$store.commit('editCassScope', scope)
         this.$router.push({ path: '/admin/company/cass/edit' })
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


    }
  }
</script>
