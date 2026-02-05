const StudentDashboard = {
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>Student Dashboard</h3>
        <button class="btn btn-outline-danger btn-sm" onclick="logout()">
          Logout
        </button>
      </div>

      <h5 class="mt-4">Available Jobs</h5>
      <ul class="list-group mb-4">
        <li v-for="job in jobs" class="list-group-item d-flex justify-content-between">
          {{ job.title }}
          <button class="btn btn-sm btn-success"
                  @click="apply(job.job_id)">
            Apply
          </button>
        </li>
      </ul>

      <h5>Your Applications</h5>
      <ul class="list-group">
        <li v-for="app in applications" class="list-group-item">
          Job ID: {{ app.job_id }} —
          <strong>{{ app.status }}</strong>
        </li>
      </ul>

      <h5 class="mt-4">Export Data</h5>
      <button class="btn btn-outline-primary"
              @click="exportCSV">
        Export Applications as CSV
      </button>

    </div>
  `,
  data() {
    return {
      jobs: [],
      applications: []
    }
  },
  async mounted() {
    const jobsRes = await axios.get("/student/jobs")
    this.jobs = jobsRes.data

    const appsRes = await axios.get("/student/applications")
    this.applications = appsRes.data
  },
  methods: {
    async apply(jobId) {
      try {
        await axios.post(`/student/jobs/${jobId}/apply`)
        alert("Applied successfully")
        location.reload()
      } catch (err) {
        alert(err.response.data.message)
      }
    },

    async exportCSV() {
      try {
        await axios.post("/student/export")
        alert("Export started. You will be notified once it's ready.")
      } catch (err) {
        alert("Export failed")
      }
    }

  }
}
