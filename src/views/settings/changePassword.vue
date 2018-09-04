<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-lock"></i>Change Password
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:40%;margin:auto" >
                    <el-form :model="ruleForm " status-icon :rules="rules2" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                      <el-form-item label="Old Password" prop="pass">
                        <el-input type="password" placeholder="Old Password" v-model="ruleForm.pass" auto-complete="off" class="el-input--small">
                          <template slot="prepend"><i class="icon-lock"></i></template>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="New Password" prop="pass2">
                        <el-input type="password" placeholder="New Password" v-model="ruleForm.pass2" auto-complete="off" class="el-input--small">
                          <template slot="prepend"><i class="icon-lock"></i></template>
                        </el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button class="el-button--small" block type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                        <el-button class="el-button--small" block @click="resetForm('ruleForm')">Reset</el-button>
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
  name: 'Change Password',
 data() {

      return {
        ruleForm: {
          pass: '',
          pass2: '',
        },
        rules2: {
          pass: [
           { required: true, message: 'Please input your old Password', trigger: 'blur' },
           { min: 3, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
           pass2: [
           { required: true, message: 'Please input the new Password', trigger: 'blur' },
           { min: 3, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({ path: '/settings/change-password' })
            alert('Password Changed Successfully');
          } else {
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
