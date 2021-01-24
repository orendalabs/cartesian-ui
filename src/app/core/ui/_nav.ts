import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Authorization',
  },
  {
    name: 'User',
    url: '/users',
    icon: 'icon-user',
    children: [
      {
        name: 'List',
        url: '/users',
        icon: 'icon-list',
      },
      {
        name: 'Add',
        url: '/users/create',
        icon: 'icon-plus',
      },
    ],
  },
  {
    divider: true,
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'icon-settings',
    children: [
      {
        name: 'List',
        url: '/settings',
        icon: 'icon-list',
      },
      {
        name: 'Add',
        url: '/settings/create',
        icon: 'icon-plus',
      },
    ],
  },
];
