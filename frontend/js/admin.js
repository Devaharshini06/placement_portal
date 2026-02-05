const AdminDashboard = {
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>Admin Dashboard</h3>
        <button class="btn btn-outline-danger btn-sm" onclick="logout()">
          Logout
        </button>
      </div>
      

      <h5 class="mt-4">System Stats</h5>
      <ul>
        <li>Total Students: {{ stats.total_students }}</li>
        <li>Total Companies: {{ stats.total_companies }}</li>
        <li>Total Jobs: {{ stats.total_jobs }}</li>
        <li>Total Applications: {{ stats.total_applications }}</li>
      </ul>

      <h5 class="mt-4">Pending Companies</h5>
      <ul class="list-group">
        <li v-for="c in companies" class="list-group-item">
          {{ c.name }} ({{ c.status }})
          <button class="btn btn-sm btn-success float-end ms-2"
                  @click="approveCompany(c.id)">
            Approve
          </button>
          <button class="btn btn-sm btn-danger float-end"
                  @click="rejectCompany(c.id)">
            Reject
          </button>
        </li>
      </ul>

      <h5 class="mt-4">Pending Job Postings</h5>
      <ul class="list-group">
        <li v-for="j in jobs" class="list-group-item">
          {{ j.title }} ({{ j.status }})
          <button class="btn btn-sm btn-success float-end ms-2"
                  @click="approveJob(j.id)">
            Approve
          </button>
          <button class="btn btn-sm btn-danger float-end"
                  @click="rejectJob(j.id)">
            Reject
          </button>
        </li>
      </ul>

    </div>
  `,
  data() {
    return {
      stats: {},
      companies: [],
      jobs: []
    }
  },
  async mounted() {
    const statsRes = await axios.get("/admin/dashboard")
    this.stats = statsRes.data

    const companiesRes = await axios.get("/admin/companies")
    this.companies = companiesRes.data.filter(
      c => c.status === "Pending"
    )

    const jobsRes = await axios.get("/admin/jobs")
    this.jobs = jobsRes.data.filter(
      j => j.status === "Pending"
    )
  },
  methods: {
    async approveCompany(id) {
      await axios.put(`/admin/company/${id}/approve`)
      alert("Company approved")
      location.reload()
    },
    async rejectCompany(id) {
      await axios.put(`/admin/company/${id}/reject`)
      alert("Company rejected")
      location.reload()
    },
    async approveJob(id) {
      await axios.put(`/admin/job/${id}/approve`)
      alert("Job approved")
      location.reload()
    },
    
    async rejectJob(id) {
      await axios.put(`/admin/job/${id}/reject`)
      alert("Job rejected")
      location.reload()
    }

  }
}
