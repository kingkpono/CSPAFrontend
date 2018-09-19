<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >

              <div class="card-header" >
                 <i class="icon-user"></i>Edit support Ticket
              </div>
              <div class="card-body">
                <el-card class="box-card" style="width:80%;margin:auto" >
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
                          <el-form-item label="Project Details" prop="project_details" >
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
                              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                            </el-upload>
                          </el-form-item>
                      <el-form-item align="center">   
                        <el-button v-show="!assign_project_officer" type="info" size="small" @click="next">Next step</el-button>
                      </el-form-item>
                     <div style="margin-top:50px;width:30px" @click="assign_project_officer = !assign_project_officer" v-show="assign_project_officer"><i class="icon-logout"></i></div>
                    <div style="margin:auto;width:80%" v-show="assign_project_officer">
                      <el-form-item  prop="project_officers">
                         <el-transfer style="margin-bottom:30px" :titles="['Project Managers', 'Target']" filterable :filter-method="filterMethod" filter-placeholder="Project Managers" v-model="ruleForm.project_officers" :data="allStaff"></el-transfer>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitsupportTicketForm('ruleForm')">Update Ticket</el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                     </el-form-item>
                    </div>
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
  name: 'Create support Ticket',

   data() {
      return {
        allStaff:[],
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

        image:'',
        active:0,
        devices:[],
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
          device_related:false,
          serial_number:'',
          device:[],
          client_id:[],
          device_warranty:'',
          project_details:'',
          start_date:'',
          end_date:'',
          project_officers:[],
          service_type_id:[],
          attachment:'',
          duration:[],
          projectStaff:[]
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
      this.loading = true
       this.getClients()
       this.serviceTypes()
       this.getProjectOfficers()
       this.getDevices()
        this.ruleForm.serial_number = this.$store.state.supportTicketEditScope.serial_number
        this.ruleForm.device = this.$store.state.supportTicketEditScope.device
        this.ruleForm.device_warranty = this.$store.state.supportTicketEditScope.device_warranty
        this.ruleForm.project_details = this.$store.state.supportTicketEditScope.project_details
        this.ruleForm.ticket_contact_phone = this.$store.state.supportTicketEditScope.ticket_contact_phone
        this.ruleForm.ticket_contact_email = this.$store.state.supportTicketEditScope.ticket_contact_email
        this.ruleForm.client_id = this.$store.state.supportTicketEditScope.client_id
        this.ruleForm.device = this.$store.state.supportTicketEditScope.device
        this.ruleForm.service_type_id = this.$store.state.supportTicketEditScope.service_type_id
        this.ruleForm.project_officers = this.$store.state.supportTicketEditScope.project_officers
        this.fileList.push({'name':'Attachment','url':this.$store.state.supportTicketEditScope.attachment})
        this.ruleForm.duration.push(this.$store.state.supportTicketEditScope.start_date+ ' '+ '9:30:30',this.$store.state.supportTicketEditScope.end_date+' '+'9:30:30')
        this.ruleForm.start_date = this.ruleForm.duration[0]
        this.ruleForm.end_date = this.ruleForm.duration[1]
    },
    methods: {
      handleFileChange(e) {
        var file = e
        var vm = this
        console.log(file)
        var metadata = {
          'contentType': file.type
         };

          var auth = this.$firebase.auth();
          var storage = this.$firebase.storage();
          var storageRef = storage.ref();
            console.log(file.url)
           storageRef.child('supportTicketImages/' + file.name).put(file.raw, metadata).then(function(snapshot) {
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
      getDevices(){
        this.axios.get(`devices`)
        .then(response => {
          this.devices = response.data
        })
        .catch(e => {
          alert(e);
        }).finally(() => this.loading = false)
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
            this.ruleForm.project_officers = this.ruleForm.project_officers.split("").join()
                this.ruleForm.duration.map((date,index) => {
                  vm.ruleForm.start_date = vm.ruleForm.duration[0]
                   vm.ruleForm.end_date = vm.ruleForm.duration[1]
                })
              this.loading = true
              this.axios.put(`supportTickets/`+ this.$store.state.supportTicketEditScope.id, this.ruleForm)
               .then(response => {
                 this.$alertify.success("support Ticket Updated Successfully")
                this.$router.push({ path: '/admin/company/ticket/support/manage' })
              })
              .catch(e => {
                 this.$alertify.error("Unable to Update support Ticket Type")
              }).finally(() => this.loading = false)
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
        const data = allStaff.map((staff, index) => {
          return {
            label: staff.name,
            key: staff.id,
            value: staff.id,
            initial: initials[index]
          };
        });

        return data;
      },
      handleChange(value, direction, movedKeys) {
        console.log(movedKeys + direction)
        return
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
