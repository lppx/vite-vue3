/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST" v-auth="[RoleEnum.TEST, RoleEnum.SUPER]"
 */
 import type { App, Directive, DirectiveBinding } from 'vue';

 import { usePermission } from '@/hooks/web/usePermission';
 const { hasPermission } = usePermission();

 function isAuth(el: Element, binding: any) {
   const value = binding.value;
   if (!value) return;
   if (!hasPermission(value)) {
     el.parentNode?.removeChild(el);
   }
 }
 const mounted = (el: Element, binding: DirectiveBinding<any>) => {
   isAuth(el, binding);
 };

 const updated = (el: Element, binding: DirectiveBinding<any>) => {
   isAuth(el, binding);
 };

 const authDirective: Directive = {
   mounted,
   updated,
 };

 export function setupPermissionDirective(app: App) {
   app.directive('auth', authDirective);
 }

 export default authDirective;
