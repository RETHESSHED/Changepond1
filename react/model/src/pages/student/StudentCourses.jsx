import { useEffect, useState } from "react";
import api from "../../api";

function StudentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Courses</h3>

      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{course.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentCourses;
