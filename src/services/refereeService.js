const API = import.meta.env.VITE_API + "/admin";

const getAllReferees = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/getAllReferees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else if (res.status === 500) {
      throw new Error();
    }
    console.log(data);
    return data;
  } catch (error) {
    alert("Something went wrong with fetching data!");

    console.error(error);
  }
};

const createReferee = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/createReferee`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else if (res.status === 400) {
      const err = Object.values(resData)[0];

      alert("Bad Request: " + err);
    } else if (res.status === 500) {
      throw new Error();
    }
  } catch (error) {
    alert("Something went wrong with Creating Referee!");

    console.error(error);
  }
};

const deleteReferee = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/deleteReferee/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      method: "DELETE",
    });

    if (res.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else if (res.status === 500) {
      throw new Error();
    }
  } catch (error) {
    alert("Something went wrong with Deleting Court!");

    console.error(error);
  }
};

export default {
  getAllReferees,
  createReferee,
  deleteReferee,
};
