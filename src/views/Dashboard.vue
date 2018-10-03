<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col sm="6" lg="3" v-show="staffData.length !== null">
        <div class="brand-card" v-show="staffData.length !== null" >
          <div class="brand-card-header bg-facebook">
            <h5 class="text-uppercase large" style="color:white">Staff</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.staffCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.staffCount}}</div>
              <div class="text-uppercase text-muted small">Staff</div>
            </div>

          </div>
        </div>
      </b-col>
    <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
            <h5 class="text-uppercase large" style="color:white">Clients</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
                <div class="text-value" v-show="staffData.length !== null">{{ staffData.clientsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.clientsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col>
      <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Open Sales Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.openSalesTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.openSalesTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col>
      <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Open Flexcom Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.openFlexcomTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.flexcomOpenTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col>
      <!-- <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Closed Flexcom Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.flexcomClosedTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.flexcomClosedTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col> -->
       <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Open CCTV Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.openCctvTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.cctvOpenTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col>
      <!-- <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Closed CCTV Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.cctvClosedTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.cctvClosedTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col> -->
       <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Open TAMS Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.openTamsTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.tamsOpenTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col>
       <!-- <b-col sm="6" lg="3">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
             <h5 class="text-uppercase large" style="color:white">Closed TAMS Ticket</h5>
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
            </div>
          </div>
          <div class="brand-card-body">
            <div>
              <div class="text-value" v-show="staffData.length !== null">{{ staffData.tamsClosedTicketsCount}}</div>
              <div class="text-value" v-show="adminData.length !== null">{{ adminData.tamsClosedTicketsCount}}</div>
              <div class="text-uppercase text-muted small">tickets</div>
            </div>

          </div>
        </div>
      </b-col> -->


    </b-row>

     <!-- <b-row>
      <b-col md="6">
        <el-card shadow="never">
          <div class="card-header">Hello</div>
           <div class="card-body">
            <template>
              <el-table :data="tableData3" height="250" style="width: 100%">
                <el-table-column type="index" label="S/N" width="180"> </el-table-column>
                <el-table-column prop="service" label="Service" width="180"> </el-table-column>
                <el-table-column prop="count" label="Count" width="180"> </el-table-column>
              </el-table>
            </template>
           </div>
        </el-card>
      </b-col>
       <b-col md="6">
         <el-card shadow="never">
          <div class="card-header">Hello</div>
           <div class="card-body">
             Hello
           </div>
        </el-card>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
import CalloutChartExample from './dashboard/CalloutChartExample'
import { Callout } from '@coreui/vue'

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
  data: function () {
    return {
      adminData:[],
      staffData:[],
      selected: 'Month',
       tableData3: [{
          service: '2016-05-03',
          count: 'Tom',
        }, {
          service: '2016-05-07',
          count: 'Tom'
        }],



    }
  },
  mounted:function(){
    this.loading = true
          const userId = this.$localStorage.get().id
          const role = this.$localStorage.get().role
            if(role == 'Staff'){
            this.axios.get(`staff-dashboard-reports/`+ userId)
            .then(response => {
              this.staffData = response.data
                console.log(this.staffData)
            })
            .catch(e => {
              alert(e);
            }).finally(() => this.loading = false)
          }else{
            this.axios.get(`dashboard-reports`)
            .then(response => {
              this.adminData = response.data
               console.log(this.adminData)

            })
            .catch(e => {
              alert(e);
            }).finally(() => this.loading = false)
          }

  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
