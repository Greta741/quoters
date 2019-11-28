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
      path: '/quotes/:board',
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

let acl = null;

function doShakyShaky() {
  alert ('shaky shaky will work')
  let shaking = false;

  function onreading() {
    const shakeTreashold = 3 * 9.8;
    const stillTreashold = 1;
    let magnitude = Math.hypot(acl.x, acl.y, acl.z);
    if (magnitude > shakeTreashold) {
      const currentPathName = window.location.pathname;
      if (currentPathName === "/" || currentPathName.includes("quotes")) {
        document.getElementById("addQuote").click();
      }

      if (currentPathName.includes("boards")) {
        document.getElementById("addBoard").click();
      }
      shaking = true;
    } else if (magnitude < stillTreashold && shaking) {
      shaking = false;
    }
  }

  acl.addEventListener("reading", onreading);
}

function startShakyShaky() {
  acl = new LinearAccelerationSensor({ frequency: 60 });
  acl.addEventListener("activate", doShakyShaky);
  acl.addEventListener("error", error => {
    alert('no shaky shaky for you')
  });
  acl.start();
}

window.addEventListener("load", startShakyShaky);
