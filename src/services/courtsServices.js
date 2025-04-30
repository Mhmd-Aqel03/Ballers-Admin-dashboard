const API = import.meta.env.VITE_API + "/admin";

const getAllCourts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/getAllCourts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    if (error.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      alert("Something went wrong with fetching data!");
    }
    console.error(error);
  }
};

const createCourt = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    await fetch(`${API}/createCourt`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      alert("Something went wrong with Creating Court!");
    }
    console.error(error);
  }
};

const updateCourt = async (data, id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    await fetch(`${API}/updateCourt/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    if (error.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      alert("Something went wrong with updateing Court!");
    }
    console.error(error);
  }
};

const deleteCourt = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    await fetch(`${API}/deleteCourt/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      method: "DELETE",
    });
  } catch (error) {
    if (error.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      alert("Something went wrong with Deleting Court!");
    }
    console.error(error);
  }
};

export default {
  getAllCourts,
  createCourt,
  updateCourt,
  deleteCourt
};
