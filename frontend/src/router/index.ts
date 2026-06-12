import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import InboundManage from '../pages/InboundManage.vue';
import OutboundManage from '../pages/OutboundManage.vue';
import BinLocationManage from '../pages/BinLocationManage.vue';
import OwnerManage from '../pages/OwnerManage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: Dashboard },
    { path: '/inbound', component: InboundManage },
    { path: '/outbound', component: OutboundManage },
    { path: '/bin-locations', component: BinLocationManage },
    { path: '/owners', component: OwnerManage }
  ]
});
