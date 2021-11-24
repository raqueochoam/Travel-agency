import http from "../http-common";

class DestinationDataService{
  getAll(page = 0) {
    return http.get(`destinations?page=${page}`);
  }

  get(id) {
    return http.get(`/destination?id=${id}`);
  }

  getReservations(id) {
    return http.get(`/reservations?name=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`destinations?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review-new", data);
  }

  createReservation(data) {
    return http.post("/reservation-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getStates(id) {
    return http.get(`/states`);
  }
    
    }
    
    export default new DestinationDataService();