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
                    <el-form-item label="Month" prop="service_type_id">
                       <el-date-picker v-model="value4" type="month" placeholder="Pick a month"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Name" prop="name">
                      <el-input placeholder="Name" v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item prop="email" label="Email">
                      <el-input placeholder="Email" v-model="ruleForm.email"></el-input>
                    </el-form-item>

                    <el-form-item label="Role" prop="role">
                      <el-radio-group v-model="ruleForm.role" size="medium">
                        <el-radio border label="Staff"></el-radio>
                        <el-radio border label="Admin"></el-radio>
                      </el-radio-group>
                     </el-form-item>
                    <el-form-item label="Department" prop="department">
                      <el-input placeholder="Department" v-model="ruleForm.department"></el-input>
                    </el-form-item>
                    <el-form-item label="phone" prop="phone">
                      <el-input placeholder="Phone-number" v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" placeholder="Password" v-model="ruleForm.password" auto-complete="off" class="el-input--small">
                        </el-input>
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
  name: 'Create-Staff',
   data() {
      return {
        loading:false,
        service_types:[],
        AllClients:[],
        requestError : [],
        ruleForm: {
          client_id:'',
          department: '',
          name: '',
          email: '',
          role: '',
          password: '',
          phone: '',
          service_type_id:''
        },
        rules: {
          email:[
             { required: true, message: 'Please input email address', trigger: 'blur' },
             { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ],
          name: [
            { required: true, message: 'Please input a name', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
         password: [
           { required: true, message: 'Please input a Password', trigger: 'blur' },
           { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
          resource: [
            { required: true, message: 'Please select a role', trigger: 'change' }
          ],
          department: [
            { required: true, message: 'Please input the department', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: 'Please input the phone-number', trigger: 'blur' },
            { min: 11, message: 'Length should be a minimum of 11', trigger: 'blur' }
          ]
        }
      };
    },
     mounted:function(){

       this.getClients()
       this.serviceTypes()

    },
    methods: {
      submitForm(formName) {
           console.log(1);
        this.$refs[formName].validate((valid) => {
           console.log(2);
          if (valid) {
             console.log(3);
              this.loading = true
              this.axios.post(`users`, this.ruleForm)
               .then(response => {
                 this.$alertify.success("Staff Created Successfully")
                this.$router.push({ path: '/admin/staff/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Create Staff")
              }).finally(() => this.loading = false)
            } else {
              this.$alertify.error("Please complete the fields")
              console.log('error submit!!');
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
