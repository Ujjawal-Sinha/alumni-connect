import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchQuery: "",
  },
  reducers: {
    // Set search results
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchResults, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
