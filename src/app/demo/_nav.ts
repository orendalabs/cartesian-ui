import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/demo/dashboard',
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
    url: '/demo/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/demo/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/demo/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/demo/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/demo/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/demo/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/demo/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/demo/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/demo/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/demo/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/demo/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/demo/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/demo/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/demo/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/demo/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/demo/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/demo/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/demo/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/demo/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/demo/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/demo/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/demo/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/demo/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/demo/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/demo/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/demo/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/demo/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/demo/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/demo/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/demo/widgets',
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
    url: '/demo/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/demo/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/demo/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/demo/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/demo/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/demo/dashboard',
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
