import Vue from 'vue'
import Vuex from 'vuex'
import Promise from 'promise-polyfill'
import main from './main'
import praise from './praise'

if (!window.Promise) {
  window.Promise = Promise
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    praise
  }
})
