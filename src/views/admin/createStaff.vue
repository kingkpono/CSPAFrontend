<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Create Staff
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
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
        requestError : [],
        ruleForm: {
          department: '',
          name: '',
          email: '',
          role: '',
          password: '',
          phone: ''
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
