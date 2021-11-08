import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import {
  Setting,
  Management,
  PieChart,
  Notebook,
  Plus,
  Money,
  SwitchButton,
  Edit,
  Delete,
  StarFilled,
  Close
} from '@element-plus/icons'
import { Chart, registerables } from 'chart.js'
import './assets/styles/element-variables.scss'
import './assets/styles/styles.scss'
import App from './App.vue'
import router from './router'
import store from './store'

Chart.register(...registerables)

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .component('setting', Setting)
  .component('Money', Money)
  .component('SwitchButton', SwitchButton)
  .component('Notebook', Notebook)
  .component('PieChart', PieChart)
  .component('Management', Management)
  .component('Plus', Plus)
  .component('Edit', Edit)
  .component('Delete', Delete)
  .component('StarFilled', StarFilled)
  .component('Close', Close)
  .mount('#app')
