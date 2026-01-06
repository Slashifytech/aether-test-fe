import apiurl from "../utils";

export const addNewrgp = async (payload) => {
  try {
    const response = await apiurl.post("/add-new-rgp", payload);

    return response.data;
  } catch (error) {
    console.log("Error in Adding rgp:", error);
    throw error;
  }
};

export const updatergp = async (payload, id) => {
  try {
    const response = await apiurl.patch(`/edit-rgp/${id}`, payload);

    return response.data;
  } catch (error) {
    console.log("Error in Adding rgp:", error);
    throw error;
  }
};

export const getrgpbyId = async (id, status) => {
  try {
    const response = await apiurl.get(`/rgpById`, {
      params: {
        id: id,
        status: status,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in Adding rgp:", error);
    throw error;
  }
};

export const getAllrgpList = async (
  page,
  perPage,
  searchTerm,
  userId,
  status
) => {
  try {
    const response = await apiurl.get(`/rgp-lists`, {
      params: {
        id: userId,
        status: status,
        search: searchTerm,
        page: page,
        perPage: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in Adding rgp:", error);
    throw error;
  }
};

export const updatergpStatus = async (rgpId, type, reason) => {
  try {
    const response = await apiurl.patch(
      "/update-rgp-status",
      {
        id: rgpId,
        type: type,
      },
      {
        params: {
          reason: reason,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting policy data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const rgpResubmit = async (id) => {
  try {
    const response = await apiurl.patch(`/rgp-resubmit`, null, {
      params: {
        rgpId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in resubmitting rgp:", error);
    throw error;
  }
};

export const rgpCancelByAdmin = async (id) => {
  try {
    const response = await apiurl.patch(`/disable-rgp`, null, {
      params: {
        rgpId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in cancellation rgp:", error);
    throw error;
  }
};
export const rgpExpenseNewExpense = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiurl.post(
      "/upload-rgp-expense",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in upload rgp expenses:", error);
    throw error;
  }
};
