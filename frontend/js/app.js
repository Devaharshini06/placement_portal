const App = {
  template: `
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  `
}

const app = Vue.createApp(App)

// Axios config (keep this exactly as-is)
axios.defaults.baseURL = "http://127.0.0.1:5000"

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

app.use(router)

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  window.location.href = "#/"
}

app.mount("#app")
