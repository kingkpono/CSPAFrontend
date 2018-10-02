<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Create Cass
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Client" prop="client_id">
                      <el-select v-model="ruleForm.client_id" clearable placeholder="Select">
                        <el-option v-for="item in AllClients" :key="item.id" :value="item.id" :label="item.name" element-loading-spinner="el-icon-loading" v-loading="loading"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="Service Type" prop="service_type_id">
                      <el-select v-model="ruleForm.service_type_id" clearable placeholder="Select">
                          <el-option v-for="item in service_types" :key="item.id" :value="item.id" :label="item.service_type" element-loading-spinner="el-icon-loading" v-loading="loading"></el-option>
                        </el-select>
                      </el-form-item>
                       <el-form-item label="Cass Type" prop="cass_type_id">
                      <el-select v-model="ruleForm.cass_type_id" clearable placeholder="Select">
                          <el-option v-for="item in cass_types" :key="item.id" :value="item.id" :label="item.cass_type" element-loading-spinner="el-icon-loading" v-loading="loading"></el-option>
                        </el-select>
                      </el-form-item>
                    <el-form-item label="Date" prop="date">
                       <el-date-picker  v-model="ruleForm.date" type="month" placeholder="Pick a date"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Location" prop="location">
                      <el-input placeholder="Location" v-model="ruleForm.location"></el-input>
                    </el-form-item>
                    <el-form-item label="Remark" prop="remark">
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
  name: 'Create-Cass',
   data() {
      return {
        loading:false,
        service_types:[],
        cass_types:[],
        AllClients:[],
        requestError : [],
        ruleForm: {
          date:'',
          location:'',
          client_id:'',
          due_month: '',
          due_year: '',
          remark: '',
          service_type_id:'',
          cass_type_id:'',
          user_id:this.$localStorage.get().id
        },
        monthNames : ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        rules: {
          date: [
            { required: true, message: 'Please select a date', trigger: 'blur' }
          ],
          remark: [
            { required: false, message: 'Please input a remark', trigger: 'blur' }
          ],
          location: [
            { required: true, message: 'Please add a location', trigger: 'blur' }
          ],
          client_id: [
            { required: true, message: 'Please select a client', trigger: 'blur' },
          ],
          cass_type_id: [
            { required: true, message: 'Please select a cass type', trigger: 'blur' },
          ],
           service_type_id: [
            { required: true, message: 'Please select a service type', trigger: 'blur' },
          ],
        }
      };
    },
     mounted:function(){

       this.getClients()
       this.serviceTypes()
       this.cassTypes()

    },
    methods: {

      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm.due_year = this.ruleForm.date.getFullYear().toString()
              this.ruleForm.due_month = this.monthNames[this.ruleForm.date.getMonth()]
              this.loading = true
              this.axios.post(`cass`, this.ruleForm)
               .then(response => {
                 this.$alertify.success("Cass Created Successfully")
                this.$router.push({ path: '/admin/company/cass/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Create Cass")
              }).finally(() => this.loading = false)
            } else {
              this.$alertify.error("Please complete the fields")
              return false;
            }
        });
      },
      serviceTypes(){
        this.axios.get(`serviceTypes`)
        .then(response =>  {
          this.service_types = response.data
        })
        .catch(e => {
          alert(e);
        }).finally(() => this.loading = false)
      },
      cassTypes(){
        this.axios.get(`cass-types`)
        .then(response =>  {
          this.cass_types = response.data
        })
        .catch(e => {
          alert(e);
        }).finally(() => this.loading = false)
      },
      getClients(){
          this.axios.get(`clients`)
          .then(response => {
            this.AllClients = response.data
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loadAllValuesLoader = false)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
