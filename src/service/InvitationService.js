import instance from "./axios"

const API = {
  getMyInvitations: () => instance.get("/invitations/my"),
  sendInvitation: (studentId, courseId) => instance.post("/invitations", { studentId, courseId }),
  acceptInvitation: (invitationId) => instance.post(`/invitations/${invitationId}/accept`),
  rejectInvitation: (invitationId) => instance.post(`/invitations/${invitationId}/reject`),
}

export default API; 