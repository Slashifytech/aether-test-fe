import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllrgpList, getrgpbyId } from "./RGPapi";

export const fetchrgpDataById = createAsyncThunk(
  "teams/fetchrgpDataById",
  async ({id, status }, { rejectWithValue }) => {
    try {
      const data = await getrgpbyId(id, status);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const fetchrgpLists = createAsyncThunk(
    "teams/fetchrgpLists",
    async ({page, perPage, searchTerm, userId, status }, { rejectWithValue }) => {
      try {
        const data = await getAllrgpList(page, perPage, searchTerm, userId, status);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  );
const rgpSlice = createSlice({
  name: "rgp",
  initialState: {
    rgpByIdorStatus: [],
    rgpLists: null,
  },

  reducers:{
        setEmptyrgp(state){
          state.rgpByIdorStatus = []
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchrgpDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchrgpDataById.fulfilled, (state, action) => {
        state.rgpByIdorStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchrgpDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.rgpByIdorStatus = [];
      })
      .addCase(fetchrgpLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchrgpLists.fulfilled, (state, action) => {
        state.rgpLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchrgpLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.rgpLists = null;
      });
  },
});
export const {setEmptyrgp} = rgpSlice.actions
export default rgpSlice.reducer;
