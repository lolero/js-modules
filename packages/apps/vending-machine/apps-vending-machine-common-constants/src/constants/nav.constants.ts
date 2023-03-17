import { RoutesMetadata } from '@js-modules/web-react-nav';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';
import { faStore } from '@fortawesome/free-solid-svg-icons/faStore';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons/faWarehouse';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {
  MyModules,
  PublicModules,
  SubModulesMyProducts,
} from './modules.constants';

export const publicModulesRoutesMetadata: RoutesMetadata = {
  [PublicModules.home]: {
    path: `/${PublicModules.home}`,
    icon: faHouse,
    label: upperFirst(PublicModules.home),
  },
};

export const myModulesRoutesMetadata: RoutesMetadata = {
  [MyModules.store]: {
    path: `/${MyModules.store}`,
    icon: faStore,
    label: upperFirst(MyModules.store),
    isProtected: true,
    roles: ['realm-role-buyer'],
  },
  [MyModules.myProducts]: {
    path: `/${MyModules.myProducts}`,
    icon: faWarehouse,
    label: upperFirst(lowerCase(MyModules.myProducts)),
    isProtected: true,
    roles: ['realm-role-seller'],
    subRoutes: {
      [SubModulesMyProducts.createNew]: {
        path: `/${MyModules.myProducts}/${SubModulesMyProducts.createNew}`,
        icon: faPlus,
        label: upperFirst(lowerCase(SubModulesMyProducts.createNew)),
        isProtected: true,
        roles: ['realm-role-seller'],
        isHidden: true,
      },
      [SubModulesMyProducts.edit]: {
        path: `/${MyModules.myProducts}/${SubModulesMyProducts.edit}`,
        icon: faPenToSquare,
        label: upperFirst(lowerCase(SubModulesMyProducts.edit)),
        isProtected: true,
        roles: ['realm-role-seller'],
        isHidden: true,
      },
    },
  },
  [MyModules.shoppingCart]: {
    path: `/${MyModules.shoppingCart}`,
    icon: faCartShopping,
    label: upperFirst(lowerCase(MyModules.shoppingCart)),
    isProtected: true,
    roles: ['realm-role-buyer'],
  },
  [PublicModules.home]: publicModulesRoutesMetadata[PublicModules.home],
};
