import { createApp } from 'vue'
import App from './App.vue'
import AdminDashboard from './AdminDashboard.vue'
import './style.css'
createApp(location.hash === '#admin' ? AdminDashboard : App).mount('#app')
