import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/admin/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/admin/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/admin/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/admin/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/admin/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/admin/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/admin/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/admin/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/admin/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/admin/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/admin/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/admin/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/admin/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/admin/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/admin/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/admin/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/admin/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/admin/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/admin/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/admin/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/admin/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/admin/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/admin/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/admin/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/admin/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/admin/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/admin/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/admin/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/admin/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/admin/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/admin/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/admin/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/admin/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/admin/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/admin/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/admin/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
