const API = import.meta.env.VITE_API + "/admin";

const getAllSessions = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/getAllSessions`, {
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

const createSession = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/createSession`, {
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
      const err = resData.values(resData)[0];

      alert("Bad Request: " + err);
    } else if (res.status === 500) {
      throw new Error();
    }
  } catch (error) {
    alert("Something went wrong with Creating Session!");

    console.error(error);
  }
};

const updateSession = async (data, id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/updateSession/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    const resData = res.json();

    if (res.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else if (res.status === 400) {
      const err = resData.values(resData)[0];

      alert("Bad Request: " + err);
    } else if (res.status === 500) {
      throw new Error();
    }
  } catch (error) {
    alert("Something went wrong with updateing Session!");

    console.error(error);
  }
};

const deleteSession = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/deleteSession/${id}`, {
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
    alert("Something went wrong with Deleting Session!");

    console.error(error);
  }
};

export default {
  getAllSessions,
  deleteSession,
  updateSession,
  createSession,
};
