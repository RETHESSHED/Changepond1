import axios from "axios";

const BASE_URL = "http://localhost:8888";

export const loginUser = (username, password) =>
  axios.get(`${BASE_URL}/users?username=${username}&password=${password}`);

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/users`, data);

/* ================= STUDENTS ================= */

export const getStudents = () =>
  axios.get(`${BASE_URL}/students`);

export const addStudent = (data) =>
  axios.post(`${BASE_URL}/students`, data);

export const updateStudent = (id, data) =>
  axios.put(`${BASE_URL}/students/${id}`, data);

export const deleteStudent = (id) =>
  axios.delete(`${BASE_URL}/students/${id}`);

/* ================= TRAINERS ================= */

export const getTrainers = () =>
  axios.get(`${BASE_URL}/trainers`);

export const addTrainer = (data) =>
  axios.post(`${BASE_URL}/trainers`, data);

export const updateTrainer = (id, data) =>
  axios.put(`${BASE_URL}/trainers/${id}`, data);

export const deleteTrainer = (id) =>
  axios.delete(`${BASE_URL}/trainers/${id}`);

/* ================= COURSES ================= */

export const getCourses = () =>
  axios.get(`${BASE_URL}/courses`);

export const addCourse = (data) =>
  axios.post(`${BASE_URL}/courses`, data);

export const updateCourse = (id, data) =>
  axios.put(`${BASE_URL}/courses/${id}`, data);

export const deleteCourse = (id) =>
  axios.delete(`${BASE_URL}/courses/${id}`);

/* ================= BATCHES ================= */

export const getBatches = () =>
  axios.get(`${BASE_URL}/batches`);

export const addBatch = (data) =>
  axios.post(`${BASE_URL}/batches`, data);

export const updateBatch = (id, data) =>
  axios.put(`${BASE_URL}/batches/${id}`, data);

export const deleteBatch = (id) =>
  axios.delete(`${BASE_URL}/batches/${id}`);

/* ================= Achievements ================= */

export const getAchievements = () =>
  axios.get(`${BASE_URL}/achievements`);

export const addAchievement = (data) =>
  axios.post(`${BASE_URL}/achievements`, data);

export const updateAchievement = (id, data) =>
  axios.put(`${BASE_URL}/achievements/${id}`, data);

export const deleteAchievement = (id) =>
  axios.delete(`${BASE_URL}/achievements/${id}`); 