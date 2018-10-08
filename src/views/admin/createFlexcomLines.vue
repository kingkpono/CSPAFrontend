<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Create Flexcom Lines
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Client" prop="client_id">
                      <el-select v-model="ruleForm.client_id" clearable placeholder="Select">
                        <el-option v-for="item in AllClients" :key="item.id" :value="item.id" :label="item.name" element-loading-spinner="el-icon-loading" v-loading="loading"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Platform" prop="platform">
                      <el-select v-model="ruleForm.platform" clearable placeholder="Select">
                        <el-option v-for="item in platforms" :key="item.index" :value="item" :label="item" element-loading-spinner="el-icon-loading" v-loading="loading"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Activation Date" prop="activation_date">
                       <el-date-picker  value-format="yyyy-MM-dd" v-model="ruleForm.activation_date" type="month" placeholder="Pick a date"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Number" prop="mobile_number">
                      <el-input placeholder="Seperate numbers by comma" v-model="ruleForm.mobile_number"></el-input>
                    </el-form-item>
                     <el-form-item label="Remark" prop="Remark">
                      <el-input placeholder="Remark" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
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
  name: 'Create Flexcom Line',
   data() {
      return {
        loading:false,
        service_types:[],
        cass_types:[],
        AllClients:[],
        platforms:['Hybrid','BSCS','IN','CORPORATE','SMART 5000'],
        requestError : [],
        ruleForm: {
          mobile_number:'',
          remark:'',
          platform:'',
          client_id:'',
          activation_date:'',
        },

        rules: {
          activation_date: [
            { required: true, message: 'Please select a date', trigger: 'blur' }
          ],
          mobile_number: [
            { required: true, message: 'Please add a number', trigger: 'blur' }
          ],
          client_id: [
            { required: true, message: 'Please select a client', trigger: 'change' },
          ],
          remark: [
            { required: true, message: 'Please enter a remark', trigger: 'blur' },
          ],
          platform: [
            { required: true, message: 'Please select a platform', trigger: 'change' },
          ],
        }
      };
    },
     mounted:function(){

       this.getClients()

    },
    methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

              this.loading = true
              this.axios.post(`flexcom/lines`, this.ruleForm)
               .then(response => {
                 this.$alertify.success("Flexcom Line Created Successfully")
                this.$router.push({ path: '/admin/company/flexcom/lines/manage' })
              })
              .catch(e => {
                 var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                   this.$alertify.error("Unable to Create Flexcom Line")
                }
              }).finally(() => this.loading = false)
            } else {
              this.$alertify.error("Please complete the fields")
              return false;
            }
        });
      },

      getClients(){
          this.axios.get(`clients`)
          .then(response => {
            this.AllClients = response.data
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
          }).finally(() => this.loadAllValuesLoader = false)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
