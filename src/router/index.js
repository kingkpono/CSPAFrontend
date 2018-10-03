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
const editSalesTicket = () => import('@/views/admin/editSalesTicket')
const viewSalesTicket = () => import('@/views/admin/viewSalesTicket')
const manageSupportTicket = () => import('@/views/admin/manageSupportTicket')
const createSupportTicket = () => import('@/views/admin/createSupportTicket')
const editSupportTicket = () => import('@/views/admin/editSupportTicket')
const viewSupportTicket = () => import('@/views/admin/viewSupportTicket')
const createSalesTicketStaff = () => import('@/views/admin/createSalesTicketStaff')
const manageSalesTicketStaff = () => import('@/views/admin/manageSalesTicketStaff')
const createCass = () => import('@/views/admin/createCass')
const manageCass = () => import('@/views/admin/manageCass')
const editCass = () => import('@/views/admin/editCass')
const manageFlexcom = () => import('@/views/admin/manageFlexcom')
const manageFlexcomLines = () => import('@/views/admin/manageFlexcomLines')
const createFlexcomLines = () => import('@/views/admin/createFlexcomLines')
const editFlexcomLine = () => import('@/views/admin/editFlexcomLine')
const flexcomSummary = () => import('@/views/admin/flexcomSummary')
const ticketManagers = () => import('@/views/admin/ticketManagers')


















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
          component: Dashboard,
          meta:{
            role: ['Staff','Admin']
          }
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
                  meta:{
                    role: ['Admin']
                  },
                  component: manageStaff,
                },
                {
                  path: 'add',
                  name: 'Create Staff',
                  meta:{
                    role: ['Admin']
                  },
                  component: createStaff
                },
                {
                  path: 'edit',
                  name: 'Edit Staff',
                  meta:{
                    role: ['Admin']
                  },
                  component: editStaff
                },
                {
                  path: 'ticket-managers',
                  name: 'Ticket Managers',
                  meta:{
                    role: ['Admin']
                  },
                  component: ticketManagers
                }
              ]
            }
          ]
        },
        {
          path: 'admin',
          redirect: '/admin/sector/manage',
          meta:{
            role: ['Admin']
          },
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
                  meta:{
                    role: ['Staff','Admin']
                  },
                  component: manageSector,
                },
                {
                  path: 'add',
                  name: 'Create Sector',
                  meta:{
                    role: ['Staff','Admin']
                  },
                  component: createSector
                },
                {
                  path: 'edit',
                  name: 'Edit Sector',
                  meta:{
                    role: ['Staff','Admin']
                  },
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
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: manageProspects,
                    },
                    {
                      path: 'edit',
                      name: 'Edit Prospects',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: editProspects,
                    }
                  ]
                },
                {
                  path: 'cass',
                  redirect: '/admin/company/cass/manage',
                  name: 'cass',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'manage',
                      name: 'Manage',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: manageCass,
                    },
                    {
                      path: 'add',
                      name: 'Create',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: createCass
                    },
                    {
                      path: 'edit',
                      name: 'Edit',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: editCass
                    },

                  ]
                },
                {
                  path: 'flexcom',
                  redirect: '/admin/company/flexcom/clients',
                  name: 'flexcom',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: 'summary',
                      name: 'Flexcom Summary',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: flexcomSummary,
                    },
                    {
                      path: 'clients',
                      name: 'Flexcom Clients',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: manageFlexcom,
                    },
                    {
                      path: 'lines',
                      name: 'Lines',
                      redirect: '/admin/company/flexcom/manage',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          name: 'Manage',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          component: manageFlexcomLines,
                        },
                        {
                          path: 'add',
                          name: 'Add',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          component: createFlexcomLines,
                        },
                        {
                          path: 'edit',
                          name: 'Edit',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          component: editFlexcomLine,
                        }
                      ]
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
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: manageClients,
                    },
                    {
                      path: 'add',
                      name: 'Create Clients',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: createClients
                    },
                    {
                      path: 'edit',
                      name: 'Edit Clients',
                      meta:{
                        role: ['Staff','Admin']
                      },
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
                      meta:{
                        role: ['Admin']
                      },
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
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: manageDevices,
                    },
                    {
                      path: 'add',
                      name: 'Create devices',
                      meta:{
                        role: ['Staff','Admin']
                      },
                      component: createDevice
                    },
                    {
                      path: 'edit',
                      name: 'Edit devices',
                      meta:{
                        role: ['Staff','Admin']
                      },
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
                          meta:{
                            role: ['Staff','Admin']
                          },
                          component: manageServiceTypes,
                        },
                        {
                          path: 'add',
                          name: 'Create',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          component: createServiceType,
                        },
                        {
                          path: 'edit',
                          meta:{
                            role: ['Staff','Admin']
                          },
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
                  name: 'Ticket',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [

                    {
                      path: 'sales',
                      redirect: '/admin/company/ticket/sales/manage',
                      name: 'Sales Ticket',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Manage',
                          component: manageSalesTicket,
                        },
                        {
                          path: 'add',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Create',
                          component: createSalesTicket,
                          },
                          {
                          path: 'edit',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Edit',
                          component: editSalesTicket,
                        },
                        {
                          path: 'view',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'View',
                          component: viewSalesTicket,
                        },
                      ],
                    },
                    {
                      path: 'support',
                      name: 'Manage Support Ticket',
                      component: {
                        render (c) { return c('router-view') }
                      },
                      children: [
                        {
                          path: 'manage',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Manage Support Ticket',
                          component: manageSupportTicket,
                        },
                        {
                          path: 'add',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Create Support Ticket',
                          component: createSupportTicket,
                        },
                        {
                          path: 'edit',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'Edit Support Ticket',
                          component: editSupportTicket,
                        },
                        {
                          path: 'view',
                          meta:{
                            role: ['Staff','Admin']
                          },
                          name: 'View Support Ticket',
                          component: viewSupportTicket,
                        }

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


