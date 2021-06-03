import { RoleEnum } from '@/enums/roleEnum';
import { isArray } from '@/utils/is';
import { intersection } from 'lodash';
import { toRaw } from 'vue';
import userModule from '@/store/modules/user';

export function usePermission() {
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    const roles = toRaw(userModule.roles);
    if (!value) {
      return def;
    }
    if (!isArray(value)) {
      return roles.includes(value as RoleEnum);
    }
    return (intersection(value, roles) as RoleEnum[]).length > 0;
  }
  return { hasPermission };
}
