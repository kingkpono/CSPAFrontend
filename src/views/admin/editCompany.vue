<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>Edit Company
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
                        <el-option v-for="item in bdmpersons" :key="item.user.id" :value="item.user.id" :label="item.user.name"></el-option>
                      </el-select>
                    </el-form-item> -->
                     <el-form-item label="Sector" prop="sector_id">
                      <el-select v-model="ruleForm.sector_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in sectors" :key="item.id" :value="item.id" :label="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="Service Type" prop="service_type">
                      <el-select v-model="ruleForm.service_type_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in service_types" :key="item.id" :value="item.id" :label="item.service_type"></el-option>
                      </el-select>
                    </el-form-item>
                     <!-- <el-form-item label="Vendor-Status" prop="vendor_status">
                      <el-radio-group v-model="ruleForm.vendor_status" size="medium">
                        <el-radio border label="Pending"></el-radio>
                        <el-radio border label="Completed"></el-radio>
                      </el-radio-group>
                     </el-form-item> -->
                    <el-form-item label="Contact Person" prop="contact_person">
                      <el-input placeholder="Contact Person" v-model="ruleForm.contact_person"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobile" prop="mobile">
                      <el-input placeholder="Mobile" v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                     <el-form-item label="Client-Type" prop="client_type">
                      <el-radio-group v-model="ruleForm.client_type" size="medium">
                        <el-radio border label="Prospect"></el-radio>
                        <el-radio border label="Customer"></el-radio>
                      </el-radio-group>
                     </el-form-item>
                    <el-form-item label="Address" prop="address">
                      <el-input placeholder="Address" v-model="ruleForm.address"></el-input>
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
  name: 'Edit-Client',
   data() {
      return {
        loading:false,
        requestError : [],
        service_types:[],
        bdmpersons: [],
        bdmperson: '',
        sector: '',
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
          bdm_person_id: '',
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
          sector_id: [
            { required: true, message: 'Please select a sector', trigger: 'change' }
          ],
          vendor_status: [
            { required: true, message: 'Please select a status', trigger: 'change' },
          ],
          contact_person: [
            { required: true, message: 'Please input a Contact person', trigger: 'blur' }
          ],
          service_type_id: [
            { required: true, message: 'Please select a service type', trigger: 'change' },
          ],
          mobile: [
            { required: true, message: 'Please input the phone-number', trigger: 'blur' },
            { min: 11, message: 'Length should be a minimum of 11', trigger: 'blur' }
          ],
          bdm_person_id: [
            { required: true, message: 'Please input the BDM person', trigger: 'change' }
          ],
          address: [
            { required: true, message: 'Please input an address', trigger: 'blur' }
          ]
        }
      };
    },
    created: function() {
          this.ruleForm.email = this.$store.state.companyEditScope.email
          this.ruleForm.name = this.$store.state.companyEditScope.name
           this.ruleForm.sector_id = this.$store.state.companyEditScope.sector_id
          this.ruleForm.vendor_status = this.$store.state.companyEditScope.vendor_status
           this.ruleForm.contact_person = this.$store.state.companyEditScope.contact_person
          this.ruleForm.name = this.$store.state.companyEditScope.name
           this.ruleForm.mobile = this.$store.state.companyEditScope.mobile
          this.ruleForm.bdm_person_id = this.$store.state.companyEditScope.bdm_person_id
           this.ruleForm.address = this.$store.state.companyEditScope.address
           this.ruleForm.client_type = this.$store.state.companyEditScope.client_type
           this.ruleForm.service_type_id = this.$store.state.companyEditScope.service_type_id
           this.bdmperson = this.$store.state.companyEditScope.bdmperson.name
           this.sector = this.$store.state.companyEditScope.sector.name
           this.initOnCreated()
           this.getservicetypes()
    },
    methods: {
      changeStatus(){
        if(this.ruleForm.client_type == 'Prospect'){
          this.ruleForm.vendor_status = 'Pending'
        }else{
          this.ruleForm.vendor_status = 'Completed'
        }
      },
      initOnCreated(){
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
      fillUpFields(){
         this.editData = this.$store.state.staffEditScope
         alert(this.$store.state.staffEditScope)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
              this.axios.put('clients/'+ this.$store.state.companyEditScope.id, this.ruleForm)
             .then(response => {
                 this.$alertify.success("Company Updated Successfully")
                this.$router.push({ path: '/admin/company/company/manage'})
              })
              .catch(e => {
                 var vm = this
                if(e.response.data.message){
                  for(var key in e.response.data.message){
                    vm.$alertify.error(e.response.data.message[key]);
                  }
                }else{
                  this.$alertify.error("Unable to Update Client")
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
