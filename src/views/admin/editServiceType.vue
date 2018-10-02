<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Edit Service Type
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Service Type" prop="service_type">
                      <el-input placeholder="Name" v-model="ruleForm.service_type"></el-input>
                    </el-form-item>
                     <el-form-item label="Description" prop="description">
                      <el-input placeholder="description" v-model="ruleForm.description"></el-input>
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
  name: 'Edit-Device',
   data() {
      return {
        loading:false,
        requestError : [],
        ruleForm: {
          service_type: '',
          description:''
        },
        rules: {

          name: [
            { required: true, message: 'Please input a name', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],

        }
      };
    },
    created: function() {
          this.ruleForm.service_type = this.$store.state.serviceTypeEditScope.service_type
          this.ruleForm.description = this.$store.state.serviceTypeEditScope.description
    },
    methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
              this.axios.put('serviceType/'+ this.$store.state.serviceTypeEditScope.id, this.ruleForm)
             .then(response => {
                 this.$alertify.success("Service Type Updated Successfully")
                this.$router.push({ path: '/admin/company/devices/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Update Service Type")
              }).finally(() => this.loading = false)

            } else {
              this.$alertify.error("Please complete the fields")
              console.log('error submit!!');
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
