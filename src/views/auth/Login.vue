<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
               <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="40px" class="demo-ruleForm"  v-loading="loading">
                 	<el-header align="middle" style="height:70px">
                    <img src="/img/new_logo.png" alt="hello" style="height:60px;width:70px;"/>
                 	</el-header>
                    <el-form-item label="" prop="email">
                      <el-input v-model="ruleForm2.email" class="el-input--small">
                        <template slot="prepend"><i class="icon-user"></i></template>
                      </el-input>
                    </el-form-item>

                  <el-form-item label="" prop="pass">
                    <el-input type="password"  v-model="ruleForm2.password" auto-complete="off" class="el-input--small">
                      <template slot="prepend"><i class="icon-lock"></i></template>
                    </el-input>
                  </el-form-item>
                  <el-footer align="middle">
                  <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
                    <el-button @click="resetForm('ruleForm2')">Reset</el-button>
                  </el-footer>

                  </el-form-item>
                </el-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>If your mom hates your haircut, just know you have a fantastic haircut.</p>
                  <router-link to="Register"><b-button variant="primary" class="active mt-3">Register Now!</b-button></router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };

      return {
        loading:false,
        ruleForm2: {
          password: '',
          email: ''
        },
        rules2: {
          password: [
           // { validator: validatePass, trigger: 'blur' }
           { required: true, message: 'Please input Password', trigger: 'blur' },
           { min: 3, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          email: [
             { required: true, message: 'Please input email address', trigger: 'blur' },
             { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
           if (valid) {

              this.loading = true
              this.axios.post(`login`, this.ruleForm2)
                .then(response => {
                this.$localStorage.set(response.data)
                this.$alertify.success("login Successfull");
                this.$router.push({ path: '/dashboard' }) 
              })
              .catch(e => {
                this.$alertify.error("Invalid login Credentials")
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
