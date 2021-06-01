import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Authorization',
  },
  {
    divider: true,
  },
  {
    name: 'User',
    url: '/users',
    icon: 'fa fa-user',
  },
  {
    name: 'Tenants',
    url: '/tenants',
    icon: 'fa fa-users',
  },
  {
    name: 'Roles',
    url: '/authorization/roles',
    icon: 'fa fa-id-card',
  },
  {
    name: 'Permissions',
    url: '/authorization/permissions',
    icon: 'fa fa-check',
  },
  {
    name: 'Locations',
    url: '/locations',
    icon: 'fa fa-map',
    children: [
      {
        name: 'Cities',
        url: '/locations/cities',
        icon: 'fa fa-home',
      },
      {
        name: 'Countries',
        url: '/locations/countries',
        icon: 'fa fa-flag',
      },
      {
        name: 'Locations',
        url: '/locations/locations',
        icon: 'fa fa-map-marker',
      },
      {
        name: 'States',
        url: '/locations/states',
        icon: 'fa fa-landmark',
      },
    ]
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
