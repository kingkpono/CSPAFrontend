<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Edit Sector
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Name" prop="name">
                      <el-input placeholder="Name" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Description" prop="description">
                      <el-input placeholder="Description" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">Update</el-button>
                      <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                  </el-form>
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
  name: 'Edit-Sector',
   data() {
      return {
        loading:false,
        requestError : [],
        ruleForm: {
          description: '',
          name: '',
        },
        rules: {

          name: [
            { required: true, message: 'Please input a name', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
          description: [
            { required: false, message: 'Please input the description', trigger: 'blur' }
          ]
        }
      };
    },
    created: function() {
          this.ruleForm.description = this.$store.state.sectorEditScope.description
          this.ruleForm.name = this.$store.state.sectorEditScope.name
    },
    methods: {
      fillUpFields(){
         this.editData = this.$store.state.staffEditScope
         alert(this.$store.state.staffEditScope)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
              this.axios.put('sectors/'+ this.$store.state.sectorEditScope.id, this.ruleForm)
             .then(response => {
                 this.$alertify.success("Sector Updated Successfully")
                this.$router.push({ path: '/admin/sector/manage' })
              })
              .catch(e => {
                 var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Update Sector")
                }
              }).finally(() => this.loading = false)

            } else {
              this.$alertify.error("Please complete the fields")
              return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
