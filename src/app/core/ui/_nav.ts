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
    name: 'Authorization',
    url: '/authorization',
    icon: 'icon-lock',
    children: [
      {
        name: 'Roles',
        url: '/authorization/roles',
        icon: 'icon-people',
        children: [
          {
            name: 'List',
            url: '/authorization/roles/list',
            icon: 'icon-list',
          },
          {
            name: 'Create',
            url: '/authorization/roles/create',
            icon: 'icon-plus',
          },
          {
            name: 'Manage',
            url: '/authorization/roles/manage',
            icon: 'icon-wrench',
          },
        ]
      },
      {
        name: 'Permissions',
        url: '/authorization/permissions',
        icon: 'icon-check',
        children: [
          {
            name: 'List',
            url: '/authorization/permissions/list',
            icon: 'icon-list',
          },
          {
            name: 'Assign',
            url: '/authorization/permissions/assign',
            icon: 'icon-link',
          },
        ]
      }
    ],
  },
  {
    divider: true,
  },
];
