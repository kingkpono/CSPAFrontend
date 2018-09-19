<template>
  <div class="app flex-row">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="12">
          <div class="card" >
              <div class="card-header" >
                 <i class="icon-user"></i>View Sales Ticket
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
                     <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.ticket_contact_email  }}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10" style="width:100%">
                    <el-col :span="6" style="">
                      <p style="width:100%;" class="grid-content">Phone:</p>
                    </el-col>
                    <el-col :span="6" style="">
                     <span class="el-tag grid-content" style="margin-left:60px;border:1px solid white"> {{ client.ticket_contact_phone  }}</span>
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
                 <el-card class="box-card" style="width:40%;float:right" v-show="client.device != null">
                    <div slot="header" class="clearfix" style="background:#E6F0F3;padding:10px 12px">
                      <h4>REMARK</h4>
                    </div>
                  <el-row :gutter="10" style="width:100%" v-show="client.serial_number != null">
                      <el-form size="mini" label-width="120px" >
                         <el-form-item label="NAME">
                            <el-input v-model="ruleForm.name"></el-input>
                          </el-form-item>
                         <el-form-item label="REMARKS">
                            <el-input type="textarea" v-model="ruleForm.name"></el-input>
                          </el-form-item>
                          <el-form-item size="mini">
                            <el-button type="success" @click="onSubmit">Save</el-button>
                          </el-form-item>
                      </el-form>
                  </el-row>
                </el-card>
                 <el-card class="box-card" style="width:100%" v-show="client.device != null">
                    <div slot="header" class="clearfix" style="background:#E6F0F3;padding:10px 12px">
                      <h4>TICKET REMARKS</h4>
                    </div>
                    <el-row :gutter="10" style="width:100%" >
                      <el-form size="mini" label-width="120px" >
                         <el-form-item label="NAME">
                            <el-input v-model="ruleForm.name"></el-input>
                          </el-form-item>
                         <el-form-item label="REMARKS">
                            <el-input type="textarea" v-model="ruleForm.name"></el-input>
                          </el-form-item>
                          <el-form-item size="mini">
                            <el-button type="success" @click="onSubmit">Save</el-button>
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
  name: 'View Sales Ticket',
   data() {
      return {
        loading:false,
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
          serial_number:''
        },
        ruleForm:{
          remarks :'',
          name:''
        },
        requestError : [],
        projectOfficers:[],


      };
    },
    created: function() {
       this.client = this.$store.state.salesTicketEditScope
       this.fetchSalesTicketProjectOfficer(this.client.project_officers)

    },
    methods: {
      onSubmit(){

      },
      fillUpFields(){
         this.editData = this.$store.state.staffEditScope
         alert(this.$store.state.staffEditScope)
      },
      fetchSalesTicketProjectOfficer(id){
         const projectOfficers = {'officers':id}
         this.axios.post(`users/officers`, projectOfficers)
          .then(response => {
            const vm = this
             this.projectOfficers = response.data.map(value => {
              return value.name
            })
            console.log(vm.projectOfficers)
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      fetchSalesTicketRemarks(id){
         this.axios.fetch(`users/` + id)
          .then(response => {
            const vm = this
             this.remarks = response.data
          })
          .catch(e => {
          }).finally(() =>
          this.loading = false
          )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
