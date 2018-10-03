export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      variant:'primary',
      badge: {
        variant: 'primary',
      }
    },
    {
      title: true,
      name: 'Organization',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },

    {
      name: 'Manage Staff',
      url: '/admin/staff/manage',
      icon: 'icon-user',
    },
    {
      name: 'Ticket Managers',
      url: '/admin/staff/ticket-managers',
      icon: 'icon-user',
    },
    {
      name: 'Manage Sector',
      url: '/admin/sector/manage',
      icon: 'icon-layers'
    },
    {
      name: 'Manage Company',
      url: '/admin/company/manage',
      icon: 'icon-organization',
      children: [

        {
          name: 'Clients',
          url: '/admin/company/clients/manage'
        },
        {
          name: 'Prospects',
          url: '/admin/company/prospects/manage'
        },
        {
          name: 'Company Assignment',
          url: '/admin/company/company-assignment/manage'
        }
      ]
    },
    {
      name: 'Device and Services',
      url: '/admin/company/clients/manage',
      icon: 'icon-cursor',
      children: [

        {
          name: 'Devices',
          url: '/admin/company/devices/manage'
        },
        {
          name: 'Service Types',
          url: '/admin/company/devices/service-types/manage'
        },


      ]
    },
    {
      name: 'Manage Ticket',
      url: '/admin/company/ticket/sales/manage',
      icon: 'icon-cursor',
      children: [

        {
          name: 'Sales Ticket',
          url: '/admin/company/ticket/sales/manage'
        },
        {
          name: 'Support Ticket',
          url: '/admin/company/ticket/support/manage'
        },

      ]
    },
    {
      name: 'Manage Cass',
      url: '/admin/company/cass/manage',
      icon: 'icon-user'
    },
    {
      name: 'Manage Flexcom',
      url: '/admin/company/flexcom/manage',
      icon: 'icon-cursor',
      children: [

        {
          name: 'Flexcom Clients',
          url: '/admin/company/flexcom/clients'
        },
        {
          name: 'Flexcom Lines',
          url: '/admin/company/flexcom/lines/manage',
        },
        {
          name: 'Flexcom Summary',
          url: '/admin/company/flexcom/summary',
        }
      ]
    },

  ]
}
