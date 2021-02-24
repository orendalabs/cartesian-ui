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
    url: '/location',
    icon: 'icon-location-pin',
  },
];
