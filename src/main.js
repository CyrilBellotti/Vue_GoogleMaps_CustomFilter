// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.component('GmapCluster', GmapCluster)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'GOOGLE-MAPS-KEYS', // Add google-maps-key
    libraries: 'places'
  },
});
Vue.use(vmodal,
  { componentName: "foo-modal" }
  );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
