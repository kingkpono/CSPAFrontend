<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Create Company
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:60%;margin:auto" >
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Name" prop="name">
                      <el-input placeholder="Name" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                      <el-input placeholder="Email" v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="BDM person" prop="bdm_person_id" >
                      <el-select v-model="ruleForm.bdm_person_id" clearable placeholder="Select" v-loading="loading" >
                        <el-option v-for="item in bdmpersons" :key="item.id" :value="item.user.id" :label="item.user.name"></el-option>
                      </el-select>
                    </el-form-item> -->
                     <el-form-item label="Sector" prop="sector_id">
                      <el-select v-model="ruleForm.sector_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in sectors" :key="item.id" :value="item.id" :label="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Service Type" prop="service_type_id">
                      <el-select v-model="ruleForm.service_type_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in service_types" :key="item.id" :value="item.id" :label="item.service_type"></el-option>
                      </el-select>
                    </el-form-item>
                     <!-- <el-form-item label="Vendor-Status" prop="vendor_status">
                      <el-radio-group v-model="ruleForm.vendor_status" size="medium">
                        <el-radio border label="Pending" ></el-radio>
                        <el-radio border label="Completed"></el-radio>
                      </el-radio-group>
                     </el-form-item> -->
                    <el-form-item label="Contact Person" prop="contact_person">
                      <el-input placeholder="Contact Person" v-model="ruleForm.contact_person"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobile" prop="mobile">
                      <el-input placeholder="Mobile" v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                     <el-form-item label="Company-Type" prop="client_type" >
                      <el-radio-group v-model="ruleForm.client_type" size="medium" :change="changeStatus()">
                        <el-radio border label="Prospect"></el-radio>
                        <el-radio border label="Customer"></el-radio>
                      </el-radio-group>
                     </el-form-item>
                    <el-form-item label="Address" prop="address">
                      <el-input placeholder="Address" v-model="ruleForm.address"></el-input>
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
  name: 'Create-Client',
   data() {
      return {
        loading:false,
        requestError : [],
        service_types:[],
        bdmpersons: [],
        sectors: [],
        ruleForm: {
          name: '',
          email: '',
          service_type_id:'',
          client_type: '',
          sector_id: '',
          vendor_status: '',
          contact_person: '',
          mobile: '',
          bdm_person_id: '1',
          address: ''
        },
        rules: {

          name: [
            { required: true, message: 'Please input a name', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
          email:[
             { required: true, message: 'Please input email address', trigger: 'blur' },
             { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ],
           client_type: [
            { required: true, message: 'Please input a client type', trigger: 'change' },
          ],
         service_type_id: [
            { required: true, message: 'Please select a service type', trigger: 'change' },
          ],
          sector_id: [
            { required: true, message: 'Please select a sector', trigger: 'change' }
          ],
          vendor_status: [
            { required: true, message: 'Please select a status', trigger: 'change' },
          ],
          contact_person: [
            { required: true, message: 'Please input a Contact person', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: 'Please input the phone-number', trigger: 'blur' },
            { min: 11, message: 'Length should be a minimum of 11', trigger: 'blur' }
          ],
          bdm_person_id: [
            { required: true, message: 'Please select a BDM person', trigger: 'change' }
          ],
          address: [
            { required: true, message: 'Please input an address', trigger: 'blur' }
          ]
        }
      };
    },
    mounted:function() {
      this.initOnMounted()
      this.getservicetypes()
  },
    methods: {
      changeStatus(){
        if(this.ruleForm.client_type == 'Prospect'){
          this.ruleForm.vendor_status = 'Pending'
        }else{
          this.ruleForm.vendor_status = 'Completed'
        }
        console.log(this.ruleForm.client_type)
      },
      initOnMounted(){
        this.loading = true;
        Promise
          .all([
            this.axios.get(`bdmpersons`),
            this.axios.get(`sectors`)
          ])
          .then(response => {
            this.bdmpersons = response[0].data;
            this.sectors    = response[1].data;
            console.log({bdmpersons: this.bdmpersons, sectors: this.sectors})
          })
          .catch( error => {
            this.$alertify.error(error.response.message);
          })
          .finally( () => this.loading = false);
      },
      getbdmpersons(){
         this.loading = true
        this.axios.get(`bdmpersons`)
        .then(response => {
          console.log(response.data);
          this.bdmpersons = response.data
        })
        .catch(e => {
          var vm = this
            if(e.response.data.message){
              for(var key in e.response.data.message){
                vm.$alertify.error(e.response.data.message[key]);
              }
            }else{
              this.$alertify.error("Unable to Fetch BDM Managers")
            }
        }).finally(() => this.loading = false)
      },
      getsectors(){
         this.loading = true
        this.axios.get(`sectors`)
        .then(response => {
          console.log(response.data);
          this.bdmpersons = response.data
        })
        .catch(e => {
          var vm = this
            if(e.response.data.message){
              for(var key in e.response.data.message){
                vm.$alertify.error(e.response.data.message[key]);
              }
            }else{
              this.$alertify.error("Unable to Fetch Sectors")
            }
        }).finally(() => this.loading = false)
      },
      getservicetypes(){
         this.loading = true
        this.axios.get(`serviceTypes`)
        .then(response => {
          this.service_types = response.data
        })
        .catch(e => {
          var vm = this
            if(e.response.data.message){
              for(var key in e.response.data.message){
                vm.$alertify.error(e.response.data.message[key]);
              }
            }else{
              this.$alertify.error("Unable to Fetch Service Types")
            }
        }).finally(() => this.loading = false)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
              this.axios.post(`clients`, this.ruleForm)
               .then(response => {
                 this.$alertify.success("New Client Created Successfully")
                this.$router.push({ path: '/admin/company/company/manage' })
              })
              .catch(e => {
                 var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Create Client")
                }
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
