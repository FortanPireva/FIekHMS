import axios from "axios";
const baseURL = "https://localhost:5001/";
const instance = axios.create({
  baseURL: baseURL,
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
const http = {
  baseURL,
  getPatients: async ({ size = 5, start = 1, search = undefined }) => {
    try {
      let response = await instance.get(
        `/patients?num=${size}&search=${search}`
      );

      console.log(response + "response");
      return response.data.map((patient) => {
        return {
          ...patient,
          name: patient.firstName + " " + patient.lastName,
        };
      });
    } catch (error) {
      return { error: error };
    }
  },
  getPatient: async (id) => {
    try {
      let response = await instance.get(`/patients/${id}`);
      //   response = await response.json();
      //   console.log(response);
      //   return response.data();
      console.log(response + "response");
      return response.data;
    } catch (error) {
      return { error: error };
    }
  },
  getServices: async () => {
    try {
      let response = await instance.get(`/services`);
      //   response = await response.json();
      //   console.log(response);
      //   return response.data();
      console.log(response + "response");
      return response.data;
    } catch (error) {
      return { error };
    }
  },

  postPatient: async (data) => {
    try {
      let response = await instance.post("/patients", data);
      response = await response.data;
      console.log(response);

      if (response.error) {
        console.log("Error" + response.error);
        console.log("here");
        return {
          error: true,
          info: response.error,
        };
      }
      return {
        error: undefined,
        info: "Pacienti u shtua me sukses",
      };
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },
  editPatient: async (data) => {
    try {
      let response = await instance.put(`/patients/${data.id}`, data);
      response = await response.data;
      console.log(response);

      if (response.error) {
        console.log("Error" + response.error);
        console.log("here");
        return {
          error: true,
          info: response.error,
        };
      }
      return {
        error: undefined,
        info: "Pacienti u perditesua me sukses",
      };
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },
  deletePatient: async (_id) => {
    try {
      const response = await instance.delete(`/patients/${_id}`);
      const deletedBody = await response.data;
      if (deletedBody.error) {
        return {
          error: true,
          info: deletedBody.error,
        };
      }
      return deletedBody;
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },
  getReports: async ({ number = 5, start = 1 } = {}) => {
    try {
      let response = await instance.get(`/reports?number=${number}`);
      //   response = await response.json();
      //   console.log(response);
      //   return response.data();
      console.log(response + "response");
      return response.data;
    } catch (error) {
      return { error };
    }
  },
  getReport: async (id) => {
    try {
      let response = await instance.get(`/reports/${id}`);
      //   response = await response.json();
      //   console.log(response);
      //   return response.data();
      console.log(response + "response");
      return response.data;
    } catch (error) {
      return { error };
    }
  },
  postReport: async (data) => {
    try {
      let response = await instance.post("/reports", data);
      response = await response.data;
      console.log(response);

      if (response.error) {
        console.log("Error" + response.error);
        console.log("here");
        return {
          error: true,
          info: response.error,
        };
      }
      return {
        error: undefined,
        info: "Pacienti u shtua me sukses",
        id: response.report._id,
      };
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },
  updateReport: async (data) => {
    try {
      let response = await instance.put(`/reports/${data._id}`, data);
      response = await response.data;
      console.log(response);

      if (response.error) {
        console.log("Error" + response.error);
        console.log("here");
        return {
          error: true,
          info: response.error,
        };
      }
      return {
        error: undefined,
        info: "Raporti mjekesor u perditesua me sukses",
        id: response._id,
      };
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },

  deleteReport: async (_id) => {
    try {
      const response = await instance.delete(`/reports/${_id}`);
      const deletedBody = await response.data;
      if (deletedBody.error) {
        return {
          error: true,
          info: deletedBody.error,
        };
      }
      return deletedBody;
    } catch (error) {
      return {
        error: true,
        info: error.message,
      };
    }
  },
};
export default http;
