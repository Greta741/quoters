import './styles.css';
import './views/main-view.js';
import "./components/menu-wrapper-view.js";
import { Router } from '@vaadin/router';

window.addEventListener('load', () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));

  router.setRoutes([
    {
      path: '/',
      component: 'main-view'
    },
    {
      path: '/quotes',
      component: 'main-view',
      action: () => import(/* webpackChunkName: "quotes" */ './views/main-view')
    },
    {
      path: '/quotes/:boards',
      component: 'main-view',
      action: () => import(/* webpackChunkName: "quotes" */ './views/main-view')
    },
    {
      path: '/boards',
      component: 'boards-view',
      action: () => import(/* webpackChunkName: "quotes" */ './views/boards-view')
    },
    {
      path: '/add-quote',
      component: 'add-quote-view',
      action: () => import(/* webpackChunkName: "add" */ './views/add-quote-view')
    },
    {
      path: '/add-board',
      component: 'add-board-view',
      action: () => import(/* webpackChunkName: "add" */ './views/add-board-view')
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/not-found-view')
    }
  ]);
}
