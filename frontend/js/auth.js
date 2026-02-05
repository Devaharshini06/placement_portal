const Login = {
  template: `
    <div class="container mt-5">
      <h3>Login</h3>
      <input v-model="email" class="form-control mb-2" placeholder="Email">
      <input v-model="password" type="password" class="form-control mb-2" placeholder="Password">
      <button class="btn btn-primary" @click="login">Login</button>
    </div>
  `,
  data() {
    return { email: "", password: "" }
  },
  methods: {
    async login() {
      const res = await axios.post("/auth/login", {
        email: this.email,
        password: this.password
      })

      localStorage.setItem("token", res.data.access_token)
      localStorage.setItem("role", res.data.role)

      this.$router.push(`/${res.data.role}`)
    }
  }
}
