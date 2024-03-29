import './styles.css';
import './views/main-view.js';
import "./components/menu-wrapper-view.js";
import { Router } from '@vaadin/router';

const axios = require("axios");
const url = "https://quote-board.site/api";

const applicationServerPublicKey = 'BMYVXGAiH8NIYzb4IGxErYreG3EZb_TbX6uIcKIBbHiflixkDWQS55Ycrv6nZgMy7X-zk2WeeAzCoZXcrDTFSBY';

let swRegistration = null;
let isSubscribed = false;

window.addEventListener('load', () => {
  initRouter();
  initServiceWorker();
});

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function initServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {

    navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {

          swRegistration = swReg;
          initializeUI();
          })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
  } else {
    console.warn('Push messaging is not supported');
  }
}

function initializeUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        isSubscribed = !(subscription === null);
        if (!isSubscribed) {
            subscribeUser();
        }
      });
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
      .then(function(subscription) {
        updateSubscriptionOnServer(subscription);
        isSubscribed = true;
      })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
      });
}

function updateSubscriptionOnServer(subscription) {
  axios.post(`${url}/notification/register`, subscription);
}

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
    // alert('no shaky shaky for you')
  });
  acl.start();
}

window.addEventListener("load", startShakyShaky);
