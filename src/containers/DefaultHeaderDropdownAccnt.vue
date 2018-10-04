<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      Hello, {{ username }}
      <img
        src="img/new_logo.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">

      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        <i class="fa fa-shield"/>
        <router-link to="/settings/change-password"  style="text-decoration:none"> Change Password</router-link>
      </b-dropdown-item>

      <b-dropdown-item @click="logOut">
        <i class="fa fa-lock" />
         Log Out
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      itemsCount: 42,
    }
  },

   created: function(){
     this.username = this.$localStorage.get().name
    },
    methods: {
      logOut(){
        localStorage.clear()
         this.$router.push({ path: '/auth/login' })
      }
    }
}
</script>
