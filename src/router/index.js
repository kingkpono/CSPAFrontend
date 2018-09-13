import Vue from 'vue'
import Router from 'vue-router'
import { createClient } from 'http';

const changePassword = () => import('@/views/settings/changePassword')
const manageStaff = () => import('@/views/admin/manageStaff')
const createStaff = () => import('@/views/admin/createStaff')
const editStaff = () => import('@/views/admin/editStaff')
const manageSector = () => import('@/views/admin/manageSector')
const createSector = () => import('@/views/admin/createSector')
const editSector = () => import('@/views/admin/editSector')
const manageClients = () => import('@/views/admin/manageClients')
const createClients = () => import('@/views/admin/createClient')
const editClient = () => import('@/views/admin/editClient')
const manageProspects = () => import('@/views/admin/manageProspects')
const editProspects = () => import('@/views/admin/editProspects')
const manageCompanyAssignment = () => import('@/views/admin/manageCompanyAssignment')
const manageDevices = () => import('@/views/admin/manageDevices')
const createDevice = () => import('@/views/admin/createDevices')
const editDevice = () => import('@/views/admin/editDevices')
const manageServiceTypes = () => import('@/views/admin/manageServiceTypes')
const editServiceType = () => import('@/views/admin/editServiceType')
const createServiceType = () => import('@/views/admin/createServiceType')
const manageSalesTicket = () => import('@/views/admin/manageSalesTicket')
const createSalesTicket = () => import('@/views/admin/createSalesTicket')











const Login = () => import('@/views/auth/Login')
const Register = () => import('@/views/auth/Register')
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')


// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)



export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        },
        {
          path: '/settings',
          redirect: '/settings/changePassword',
          name: 'settings',
          component: {
            render (c) { return c('router-view') }
          },
          children: [

            {
              path: 'change-password',
              name: 'Change Password',
              component: changePassword
            },
            {
              path: 'logOut',
              name: 'LogOut',
              component: Dashboard
            }
          ]
        },
        {
          path: 'admin',
          redirect: '/admin/staff/manage',
          name: 'admin',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'staff',
              redirect: '/admin/staff/manage',
              name: 'staff',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'manage',
                  name: 'Manage Staff',
                  component: manageStaff,
                },
                {
                  path: 'add',
                  name: 'Create Staff',
                  component: createStaff
                },
                {
                  path: 'edit',
                  name: 'Edit Staff',
                  component: editStaff
                }
              ]
            }
          ]
        },
        {
          path: 'admin',
          redirect: '/admin/sector/manage',
          name: 'admin',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'sector',
              redirect: '/admin/sector/manage',
              name: 'sector',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'manage',
                  name: 'Manage Sector',
                  component: manageSector,
                },
                {
                  path: 'add',
                  name: 'Create Sector',
                  component: createSector
                },
                {
                  path: 'edit',
                  name: 'Edit Sector',
                  component: editSector
                },

              ]
            }
          ]
        },
        {
          path: 'admin',
          redirect: '/admin/company/clients/manage',
          name: 'Admin',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'company',
              redirect: '/admin/company/clients/manage',
              name: 'Company',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'prospects',
                  redirect: '/admin/company/prospects/manage',
                  name: 'Prospects',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'manage',
                      name: 'Manage Prospects',
                      component: manageProspects,
                    },
                    {
                      path: 'edit',
                      name: 'Edit Prospects',
                      component: editProspects,
                    }
                  ]
                },
                {
                  path: 'clients',
                  redirect: '/admin/company/clients/manage',
                  name: 'Clients',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'manage',
                      name: 'Manage Clients',
                      component: manageClients,
                    },
                    {
                      path: 'add',
                      name: 'Create Clients',
                      component: createClients
                    },
                    {
                      path: 'edit',
                      name: 'Edit Clients',
                      component: editClient
                    },

                  ],

                },
                {
                  path: 'company-assignment',
                  redirect: '/admin/company/company-assignment/manage',
                  name: 'Company Assignment',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'manage',
                      name: 'Manage Company Assignment',
                      component: manageCompanyAssignment,
                    },

                  ],

                },
                {
                  path: 'devices',
                  redirect: '/admin/company/devices/manage',
                  name: 'Devices',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'manage',
                      name: 'Manage devices',
                      component: manageDevices,
                    },
                    {
                      path: 'add',
                      name: 'Create devices',
                      component: createDevice
                    },
                    {
                      path: 'edit',
                      name: 'Edit devices',
                      component: editDevice
                    },
                    {
                      path: 'service-types',
                      name: 'Manage Service Types',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          name: 'Manage Service Types',
                          component: manageServiceTypes,
                        },
                        {
                          path: 'add',
                          name: 'Create',
                          component: createServiceType,
                        },
                        {
                          path: 'edit',
                          name: 'Edit Service Type',
                          component: editServiceType,
                        },

                      ],
                    },

                  ],
                },
                {
                  path: 'ticket',
                  redirect: '/admin/company/ticket/sales/manage',
                  name: 'Devices',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [

                    {
                      path: 'sales',
                      name: 'Manage Sales Ticket',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          name: 'Manage Sales Ticket',
                          component: manageSalesTicket,
                        },
                        {
                          path: 'add',
                          name: 'Create',
                          component: createSalesTicket,
                        },
                        {
                          path: 'edit',
                          name: 'Edit Service Type',
                          component: editServiceType,
                        },

                      ],
                    },
                    {
                      path: 'support',
                      name: 'Manage Sales Ticket',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          name: 'Manage Support Ticket',
                          component: manageSalesTicket,
                        },
                        {
                          path: 'add',
                          name: 'Create',
                          component: createSalesTicket,
                        },
                        {
                          path: 'edit',
                          name: 'Edit Support Type',
                          component: editServiceType,
                        },

                      ],
                    },

                  ],
                }
              ],


            }
          ],

        },
        {
          path: '/pages',
          redirect: '/pages/404',
          name: 'Pages',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '404',
              name: 'Page404',
              component: Page404
            },
            {
              path: '500',
              name: 'Page500',
              component: Page500
            }


          ]
        },

      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
  ]
})


