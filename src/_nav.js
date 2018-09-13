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
        },
        {
          name: 'Registration Status',
          url: '/buttons/brand-buttons'
        },
        {
          name: 'Weekly Trail',
          url: '/buttons/brand-buttons'
        },

        {
          name: 'Assigned Companies',
          url: '/buttons/brand-buttons'
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
        {
          name: 'Check Device Info',
          url: '/buttons/brand-buttons'
        },
        {
          name: 'Service Cheklist',
          url: '/buttons/brand-buttons'
        },
        {
          name: 'Assign Companies',
          url: '/buttons/brand-buttons'
        },
        {
          name: 'Assigned Companies',
          url: '/buttons/brand-buttons'
        }
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

  ]
}
