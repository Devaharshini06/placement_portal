const routes = [
  { path: "/", component: Login },
  { path: "/admin", component: AdminDashboard },
  { path: "/company", component: CompanyDashboard },
  { path: "/student", component: StudentDashboard }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("role")

  if (to.path === "/admin" && role !== "admin") next("/")
  else if (to.path === "/company" && role !== "company") next("/")
  else if (to.path === "/student" && role !== "student") next("/")
  else next()
})
