import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API + "/admin/"
const navigate = useNavigate();

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetchUtils.fetchJson(url, options);
    return response;
  } catch (error) {
    if (error.status === 403) {
      navigate('/')
    }
    console.error(error);
  }
};

export default {
  getOne: async (resource, params) => {
    const url = `${api}get${resource}/${params.id}`;

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const options = {
      method: "GET",
      headers,
    };

    const { json } = await httpClient(url, options);

    return { data: json };
  },

  getMany: async (resource, params) => {
    const url = `${api}getAll${resource}s/${params.id}`;

    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const options = {
      method: "GET",
      headers,
    };

    const { json } = await httpClient(url, options);

    return { data: json };
  },

  create: async (resource, params) => {
    
  }
};