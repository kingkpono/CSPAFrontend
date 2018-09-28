<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
             <transition name="fade">
            <el-dialog title="Notice" :visible.sync="openDialog" width="30%" :before-close="handleClose" center>
              <h5>Is This Support Ticket For A New Client?</h5>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">Yes It is</el-button>
                <el-button type="primary" @click="openDialog = false">No</el-button>
              </span>
           </el-dialog>
             </transition>
              <div class="card-header" >
                 <i class="icon-user"></i>Create Support Ticket
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:100%;margin:auto" >
                  <el-steps :active="active" finish-status="success">
                    <el-step title="Step 1"></el-step>
                    <el-step title="Step 2"></el-step>
                  </el-steps>
                  <el-form :model="ruleForm" v-show="!isNewClient" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-row type="flex" class="row-bg" v-show="!assign_project_officer">
                      <el-col :span="12">
                        <div style="grid-content">
                          <el-form-item label="Client" prop="client_id">
                            <el-select v-model="ruleForm.client_id" clearable placeholder="Select">
                              <el-option v-for="item in AllClients" :key="item.id" :value="item.id" :label="item.name" element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="Service Type" prop="service_type_id">
                            <el-select v-model="ruleForm.service_type_id" clearable placeholder="Select">
                              <el-option v-for="item in service_types" :key="item.id" :value="item.id" :label="item.service_type" element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="Issue Type"  v-show="ruleForm.service_type_id == 2">
                            <el-select v-model="ruleForm.issue_type" clearable placeholder="Select">
                              <el-option  value="Sim Damaged"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Damaged Sim</el-option>
                              <el-option  value="Sim Swap"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Sim Swap</el-option>
                              <el-option  value="Puk Request"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Puk Request</el-option>
                              <el-option  value="Network Compalint"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Network Compalint</el-option>
                              <el-option  value="Unable to make Call"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Unable to make Call</el-option>
                              <el-option  value="Unable to receive Call"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Unable to receive Call</el-option>
                              <el-option  value="Others"  element-loading-spinner="el-icon-loading" v-loading="loadAllValuesLoader">Others</el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="Mobile" v-show="ruleForm.service_type_id == 2">
                            <el-input placeholder="Seperate more than one number with a comma" v-model="ruleForm.mobile_numbers"></el-input>
                          </el-form-item>
                          <el-form-item label="Project Details" prop="project_details">
                            <el-input type="textarea" autosize placeholder="Please input the project details" v-model="ruleForm.project_details"></el-input>
                          </el-form-item>
                          <el-form-item label="Duration" prop="duration">
                             <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="ruleForm.duration" type="datetimerange" :picker-options="pickerOptions2" range-separator="-" start-placeholder="Start date" end-placeholder="End date" align="right"> </el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>

                    </el-row>
                     <el-form-item label="" prop="attachment"  v-show="!assign_project_officer">
                            <el-upload
                              style="width:60%"
                              action=""
                              :auto-upload="false"
                              class="upload-demo"
                              list-type="picture"
                              drag
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :on-change="handleFileChange"
                              :file-list="fileList"
                              multiple>
                              <i class="el-icon-upload"></i>
                              <div class="el-upload__text">Drop file here or <em>click to Select</em></div>
                            </el-upload>
                            <el-button  @click="handleFileUpload" type="primary" size="small" style="width:30%;margin:0px 0px 0px 0px">Upload file</el-button>
                          </el-form-item>
                      <el-form-item align="center">
                        <el-button v-show="!assign_project_officer" type="info" size="small" @click="next">Next step</el-button>
                      </el-form-item>
                     <div style="margin-top:50px;width:30px" @click="assign_project_officer = !assign_project_officer" v-show="assign_project_officer"><i class="icon-logout"></i></div>
                    <div style="margin:auto;width:80%" v-show="assign_project_officer">
                      <el-form-item  prop="project_officers">
                         <el-transfer   style="margin-bottom:30px"  :titles="['Project Managers', 'Target']" filterable :filter-method="filterMethod" filter-placeholder="Project Managers" v-model="ruleForm.project_officers" :data="allStaff"></el-transfer>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitsupportTicketForm('ruleForm')">Create Ticket</el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                     </el-form-item>
                    </div>
                  </el-form>
                  <el-form :model="ruleForm2" v-show="isNewClient" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm el-input--small"  v-loading="loading">
                    <el-form-item label="Name" prop="name">
                      <el-input placeholder="Name" v-model="ruleForm2.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                      <el-input placeholder="Email" v-model="ruleForm2.email"></el-input>
                    </el-form-item>
                    <el-form-item label="BDM person" prop="bdm_person_id" >
                      <el-select v-model="ruleForm2.bdm_person_id" clearable placeholder="Select" v-loading="loading" >
                        <el-option v-for="item in bdmpersons" :key="item.id" :value="item.id" :label="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="Sector" prop="sector_id">
                      <el-select v-model="ruleForm2.sector_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in sectors" :key="item.id" :value="item.id" :label="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="Service Type" >
                      <el-select v-model="ruleForm2.service_type_id" clearable placeholder="Select" v-loading="loading">
                        <el-option v-for="item in service_types" :key="item.id" :value="item.id" :label="item.service_type"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="Vendor-Status" prop="vendor_status">
                      <el-radio-group v-model="ruleForm2.vendor_status" size="medium">
                        <el-radio border label="Pending"></el-radio>
                        <el-radio border label="Completed"></el-radio>
                      </el-radio-group>
                     </el-form-item>
                    <el-form-item label="Contact Person" prop="contact_person">
                      <el-input placeholder="Contact Person" v-model="ruleForm2.contact_person"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobile" prop="mobile">
                      <el-input placeholder="Mobile" v-model="ruleForm2.mobile"></el-input>
                    </el-form-item>
                     <el-form-item label="Client-Type" prop="client_type">
                      <el-radio-group v-model="ruleForm2.client_type" size="medium">
                        <el-radio border label="Prospect"></el-radio>
                        <el-radio border label="Customer"></el-radio>
                      </el-radio-group>
                     </el-form-item>
                    <el-form-item label="Address" prop="address">
                      <el-input placeholder="Address" v-model="ruleForm2.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitClientForm('ruleForm2')">Proceed to create Ticket</el-button>
                      <el-button @click="resetForm('ruleForm2')">Reset</el-button>
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
  name: 'Create',

   data() {
      return {
        allStaff:[],
        value5: '',
        value2: [],
        fileList: [],
        filterMethod(query, item) {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        },
          pickerOptions2: {
          shortcuts: [{
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        file:'',
        image:'',
        active:0,
        assign_project_officer:false,
        service_types:[],
        AllClients:[],
        loadAllValuesLoader: true,
        bdmpersons: [],
        sectors: [],
        openDialog: false,
        loading:false,
        isNewClient:false,
        requestError : [],
        ruleForm: {
          serial_number:'',
          device:'',
          client_id:[],
          device_warranty:'',
          device_description:'',
          project_details:'',
          start_date:'',
          end_date:'',
          project_officers:[],
          service_type_id:[],
          mobile_numbers:'',
          attachment:'',
          duration:'',
          projectStaff:[],
          device_related:false
        },
        ruleForm2: {
          name: '',
          email: '',
          client_type: '',
          sector_id: '',
          service_type_id:'',
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
          mobile: [
            { required: true, message: 'Please input the phone-number', trigger: 'blur' },
            { min: 11, message: 'Length should be a minimum of 11', trigger: 'blur' }
          ],
          bdm_person_id: [
            { required: true, message: 'Please input the BDM person', trigger: 'change' }
          ],
          address: [
            { required: true, message: 'Please input an address', trigger: 'blur' }
          ],
          project_details: [
            { required: true, message: 'Please input the details of the project', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
          client_id: [
            { required: true, message: 'Please select a client', trigger: 'blur' }
          ],
          service_type_id: [
            { required: true, message: 'Please select a service type', trigger: 'blur' }
          ],
           duration: [
            { required: true, message: 'Please select the date duration', trigger: 'change' }
          ],

          project_officers: [
            { required: true, message: 'Please select a project Manager at least', trigger: 'blur' }
          ],


        }
      };
    },
    mounted:function(){
       this.openDialog = true
       this.getClients()
       this.serviceTypes()
       this.getProjectOfficers()
       if(this.$localStorage.get().data.role == 'Staff'){
         this.ruleForm.project_officers = this.$localStorage.get().data.id.toString()
       }

    },
    methods: {
      handleFileChange(e) {
       this.file = e
        console.log(this.file)
      },
      handleFileUpload(){
        if(!this.file){
          this.$alertify.error("Attachment cannot be empty")
          return
        }
        var metadata = {
          'contentType': this.file.type
         };
          var vm = this
          var auth = this.$firebase.auth();
          var storage = this.$firebase.storage();
          var storageRef = storage.ref();
            console.log(this.file.url)
           storageRef.child('supportTicketImages/' + this.file.name).put(this.file.raw, metadata).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(url) {
              vm.ruleForm.attachment = url
              vm.$alertify.success("file uploaded successfully")
            });
          }).catch(function(error) {
            console.error('Upload failed:', error);
         });
      },
    removeImage: function (e) {
      this.fileList = '';
    },
      next(){
         this.assign_project_officer = true
         if (this.active++ > 2) this.active = 0;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      getProjectOfficers(){
        const vm = this;
        this.axios.get(`users`)
          .then(response => {
            this.allStaff = vm.generateData2(response.data)
          })
          .catch(e => {
            alert(e);
          }).finally(() => this.loading = false)
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
      initOnNewClient(){
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

      submitClientForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
              this.axios.post(`clients`, this.ruleForm2)
               .then(response => {
                 this.ruleForm.client_id = this.ruleForm2.client_id
                 this.$alertify.success("New Client Created Successfully")
                 this.isNewClient = false
                  location.reload()
              })
              .catch(e => {
                 this.$alertify.error("Unable to Create Client")
              }).finally(() => this.loading = false)
            } else {
              this.$alertify.error("Please complete the fields")

              return false;
            }
        });
      },
      submitsupportTicketForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const vm = this
              this.ruleForm.project_officers = this.$localStorage.get().data.id.toString()
                this.ruleForm.duration.map((date,index) => {
                  vm.ruleForm.start_date = vm.ruleForm.duration[0]
                   vm.ruleForm.end_date = vm.ruleForm.duration[1]
                })

              if(this.ruleForm.service_type_id == 2){
                this.loading = true
                this.axios.post(`flexcom/tickets`, this.ruleForm)
               .then(response => {
                 this.$alertify.success("New support Ticket Created Successfully")
                this.$router.push({ path: '/admin/company/ticket/support/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Create support Ticket Type")
              }).finally(() => this.loading = false)
              }else{
                 this.loading = true
                  this.axios.post(`supportTickets`, this.ruleForm)
                .then(response => {
                  this.$alertify.success("New support Ticket Created Successfully")
                  this.$router.push({ path: '/admin/company/ticket/support/manage' })
                })
                .catch(e => {
                  this.$alertify.error("Unable to Create support Ticket Type")
                }).finally(() => this.loading = false)
              }

            } else {
              this.$alertify.error("Please complete the fields")
              this.active--
                this.assign_project_officer = false
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
            alert(e);
          }).finally(() => this.loadAllValuesLoader = false)
      },
      handleClose(){
        this.isNewClient = true
        this.openDialog = false
        this.initOnNewClient()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      generateData2(allStaff) {
       const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
        const userRole = this.$localStorage.get().data.role.toLowerCase() == 'staff';

        const data = allStaff.map((staff, index) => {
          const formedStaff = {
            label: staff.name,
            key: staff.id,
            value: staff.id,
            initial: initials[index],
          };

          return userRole
            ? Object.assign({}, formedStaff, {disabled: 2})
            : formedStaff;
        });
        console.log({data})

        return data;
      },
      handleChange(value, direction, movedKeys) {
         var vm = this
         if(direction == 'right'){
          movedKeys.map((id,index) => {
            vm.ruleForm.projectStaff.push(id)
          })
         }
         else if(direction == 'left'){
            movedKeys.map((id,index2) => {
              const index = vm.projectStaff.indexOf(id)
              vm.ruleForm.projectStaff.splice(index, 1)
           })
         }
         // console.log('value', value)
          //console.log('direction', direction)
           //console.log('movedKeys', movedKeys)
      }
    }
  }
</script>
