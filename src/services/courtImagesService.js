const API = import.meta.env.VITE_API + "/admin";
const IMGUR_CLIENT_ID = import.meta.env.VITE_CLEINT_ID;

const getAllCourtImages = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/getAllCourtImages`, {
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

const uploadToImgur = async (file) => {
  const formData = new FormData();
  console.log(file)
  formData.append("image", file);

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    console.log("Raw response:", response);

    const data = await response.json();
    return data.data.link;
  } catch (error) {
    alert("Something went wrong with Uploading image!");
    console.log("err here")
    console.error(error);
  }
};

const createCourtImage = async (data) => {
  const token = localStorage.getItem("token");
  console.log(data);
  if (!token) {
    window.location.href = "/";
  }
  const imgPhotoUrl = await uploadToImgur(data.photo);
  
  const courtImageData = {
    photoUrl: imgPhotoUrl,
  };

  try {
    const res = await fetch(`${API}/createCourtImage/${data.courtId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(courtImageData),
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
    alert("Something went wrong with Creating Court Image!");

    console.error(error);
  }
};

const deleteCourtImage = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  try {
    const res = await fetch(`${API}/deleteCourtImage/${id}`, {
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
    alert("Something went wrong with Deleting Court Image!");

    console.error(error);
  }
};

export default {
  getAllCourtImages,
  createCourtImage,
  deleteCourtImage,
};
