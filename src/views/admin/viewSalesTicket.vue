<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
            <div class="card" >
                <div class="card-header" >
                  <i class="icon-user"></i>View Sales Ticket
                  <el-button type="primary" v-show="client.status == 'Pending'" :loading="loading" @click="closeSalesTicket" style="margin-bottom: 10px;cursor:pointer;float:right">CLOSE TICKET</el-button>
                  <span data-v-3ca7d1a4="" v-show="client.status == 'Closed'" class="el-tag el-tag--danger" style="margin-bottom: 10px;cursor:pointer;float:right">TICKET CLOSED</span>
                </div>
                <div class="card-body">
                  <el-card class="box-card" style="width:40%;float:left" >
                      <div slot="header" class="card-header" style="background:#E6F0F3;padding:10px 12px">
                        <h4>CLIENT DETAILS</h4>
                      </div>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Client Name:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.client.name  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Service Type:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.service_type.service_type  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Email:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.client.email  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Phone:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.client.mobile  }}</span>
                      </el-col>
                    </el-row>

                  </el-card>


                  <el-card class="box-card" style="width:40%;float:right" >
                      <div slot="header" class="clearfix" style="background:#E6F0F3;padding:10px 12px">
                        <h4>SERVICE DETAILS</h4>
                      </div>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Service Type:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.service_type.service_type  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Duration:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.start_date  }} to {{ client.end_date  }} </span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Details:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.project_details  }}</span>
                      </el-col>
                    </el-row>
                        <el-row :gutter="10" style="width:100%" v-show="client.attachment != null">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Attachment</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content"  style="margin-left:60px;border:1px solid white">YES</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Officers:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" v-for="officer in projectOfficers"  :key="officer.id" style="margin-left:60px;border:1px solid white"> {{ officer }}</span>
                      </el-col>
                    </el-row>
                  </el-card>

                  <el-card class="box-card" style="width:40%;float:left" v-show="client.device != null">
                      <div slot="header" class="clearfix" style="background:#E6F0F3;padding:10px 12px">
                        <h4>DEVICE DETAILS</h4>
                      </div>
                    <el-row :gutter="10" style="width:100%" v-show="client.device != null">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Device:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.device  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%" v-show="client.device_description != null">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Device Description:</p>
                      </el-col>
                      <el-col :span="6" style="" >
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.device_description  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" :inline="true"  style="width:100%" v-show="client.device_warranty != null">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Warranty:</p>
                      </el-col>
                      <el-col :span="6" style="" :inline="true" >
                      <span class="el-tag grid-content"  :inline="true" style="margin-left:60px;border:1px solid white"> {{ client.device_warranty  }}</span>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" style="width:100%" v-show="client.serial_number != null">
                      <el-col :span="6" style="">
                        <p style="width:100%;" class="grid-content">Device S/N:</p>
                      </el-col>
                      <el-col :span="6" style="">
                      <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.serial_number  }}</span>
                      </el-col>
                    </el-row>
                  </el-card>


                  <el-card class="box-card" style="width:100%" >
                      <div slot="header" class="clearfix" style="background:#E6F0F3;padding:10px 12px">
                        <h4>TICKET REMARKS</h4>
                      </div>

                    <el-row :gutter="10" v-for="remark in remarks" :key="remark.remark">
                        <el-col :span="6" style="">
                          <p style="width:100%;" class="grid-content">{{ remark.user.name}}</p>
                        </el-col>
                        <el-col :span="6" style="">
                        <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white">{{ remark.remark}}</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" style="border:1px solid #ddd;padding:10px;margin-bottom:20px" >
                      <el-form size="mini" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm"  v-loading="loading">
                            <el-form-item label="REMARKS" prop="remark">
                              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                            </el-form-item>
                            <el-form-item size="mini">
                              <el-button type="success" @click="AddsalesTicketRemark('ruleForm')">Save</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
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
  name: 'View',
   data() {
      return {
        loading:false,
        isOpendedTicket:false,
        ticket_status:'OPENED',
        client:{
          client_name:'',
          client_email:'',
          client_type:'',
          vendor_status:'',
          bdm_person:'',
          sector:'',
          ticket_contact_email:'',
          ticket_contact_phone:'',
          service_type:'',
          status:'',
          start_date:'',
          end_date:'',
          attachment:'',
          project_details:'',
          project_officers:'',
          device:'',
          device_description:'',
          device_warranty:'',
          serial_number:'',
          officer1:''
        },
        remarks:[],
         ruleForm:{
           "sales_ticket_id": this.$store.state.salesTicketEditScope.id,
            "remark":"",
            "user_id":this.$localStorage.get().id
        },
        ruleForm2:{
          "status":"Closed"
        },
        requestError : [],
        projectOfficers:[],
         rules:{
          remark: [
            { required: true, message: 'Please input a remark', trigger: 'blur' },
            { min: 3, message: 'Length should be a minimum of 3', trigger: 'blur' }
          ],
        }

      };
    },
    created: function() {
       this.client = this.$store.state.salesTicketEditScope
       const officer = [this.$store.state.salesTicketEditScope.officer1,this.$store.state.salesTicketEditScope.officer2,this.$store.state.salesTicketEditScope.officer3]
       var vm = this
       vm.projectOfficers = officer.map(value => {
          return value.id
      });
      vm.projectOfficers = [...new Set(vm.projectOfficers)];
       this.fetchSalesTicketProjectOfficer()
       this.fetchsalesTicketRemarks()
    },
    methods: {
      onSubmit(){

      },
      closeSalesTicket(){
          this.loading = true
          this.axios.put(`salesTickets/`+ this.$store.state.salesTicketEditScope.id, this.ruleForm2)
            .then(response => {
              this.$alertify.success("Sales Ticket Closed Successfully")
            this.$router.push({ path: '/admin/company/ticket/sales/manage' })
          })
          .catch(e => {
              this.$alertify.error("Unable to Close Sales Ticket")
          }).finally(() => this.loading = false)
      },
      fillUpFields(){
         this.editData = this.$store.state.staffEditScope
         alert(this.$store.state.staffEditScope)
      },
      fetchSalesTicketProjectOfficer(){
         const projectOfficers = {"officers":this.projectOfficers.join()}
         this.axios.post(`users/officers`, projectOfficers)
          .then(response => {
            const vm = this
             this.projectOfficers = response.data.map(value => {
              return value.name
            })
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },

      fetchsalesTicketRemarks(){
         this.axios.get(`salesTicketRemarks/ticket/` + this.$store.state.salesTicketEditScope.id )
          .then(response => {
            const vm = this
             this.remarks = response.data
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      AddsalesTicketRemark(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true
               this.axios.post(`salesTicketRemarks`, this.ruleForm)
                .then(response => {
                  const vm = this
                  this.ruleForm.remark = ''
                  this.fetchsalesTicketRemarks()
                })
                .catch(e => {
                }).finally(() =>
                this.loading = false
                )
            } else {
              this.$alertify.error("Please complete the fields")
              return false;
            }
        });

      },


    }
  }
</script>
