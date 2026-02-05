const CompanyDashboard = {
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>Company Dashboard</h3>
        <button class="btn btn-outline-danger btn-sm" onclick="logout()">
          Logout
        </button>
      </div>

      <h5 class="mt-4">Your Job Postings</h5>
      <ul class="list-group mb-4">
        <li v-for="job in jobs"
            class="list-group-item d-flex justify-content-between align-items-center">
          {{ job.title }} ({{ job.status }})
          <button class="btn btn-sm btn-primary"
                  @click="loadApplicants(job.id)">
            View Applicants
          </button>
        </li>
      </ul>

      <div v-if="applications.length">
        <h5>Applicants</h5>
        <ul class="list-group">
          <li v-for="app in applications"
              class="list-group-item">
            Student ID: {{ app.student_id }} —
            <strong>{{ app.status }}</strong>

            <div class="mt-2">
              <button class="btn btn-sm btn-warning me-1"
                      @click="updateStatus(app.application_id, 'Shortlisted')">
                Shortlist
              </button>
              <button class="btn btn-sm btn-info me-1"
                      @click="updateStatus(app.application_id, 'Interview')">
                Interview
              </button>
              <button class="btn btn-sm btn-success me-1"
                      @click="updateStatus(app.application_id, 'Selected')">
                Select
              </button>
              <button class="btn btn-sm btn-danger"
                      @click="updateStatus(app.application_id, 'Rejected')">
                Reject
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      jobs: [],
      applications: []
    }
  },
  async mounted() {
    const res = await axios.get("/company/jobs")
    this.jobs = res.data
  },
  methods: {
    async loadApplicants(jobId) {
      const res = await axios.get(`/company/jobs/${jobId}/applications`)
      this.applications = res.data
    },
    async updateStatus(applicationId, status) {
      try {
        await axios.put(`/company/applications/${applicationId}/status`, {
          status: status
        })
        alert("Status updated")
        location.reload()
      } catch (err) {
        alert(err.response.data.message)
      }
    }
  }
}
