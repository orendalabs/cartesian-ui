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
    icon: 'icon-user',
  },
  {
    name: 'Roles',
    url: '/authorization/roles',
    icon: 'icon-people',
  },
  {
    name: 'Permissions',
    url: '/authorization/permissions',
    icon: 'icon-check',
  },
  {
    name: 'Locations',
    url: '/locations',
    icon: 'icon-map',
    children: [
      {
        name: 'Cities',
        url: '/locations/cities',
        icon: 'icon-home',
      },
      {
        name: 'Countries',
        url: '/locations/countries',
        icon: 'icon-flag',
      },
      {
        name: 'Locations',
        url: '/locations/list',
        icon: 'icon-location-pin',
      },
      {
        name: 'States',
        url: '/locations/states',
        icon: 'icon-layers',
      },
    ]
  },
];
