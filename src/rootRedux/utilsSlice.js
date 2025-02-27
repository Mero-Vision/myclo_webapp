import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   date: {},
   singleDate: new Date(),
   purchaseGrandtotal: "",
   purchaseVATtotal: "",
   search_keyword: "",
   template: "template1",
   columns: {},
   siteSettingsData: null,
   selectedCategories: [],
   selectedBrands: [],
   priceRange: [1, 100000], // Add priceRange to initialState
};

const utilsSlice = createSlice({
   name: "utils",
   initialState,
   reducers: {
      setCalendarDate: (state, action) => {
         state.date = action.payload;
      },
      setSingleDate: (state, action) => {
         state.singleDate = action.payload;
      },
      setPurchaseGrandtotal: (state, action) => {
         state.purchaseGrandtotal = action.payload;
      },
      setPurchaseVATtotal: (state, action) => {
         state.purchaseVATtotal = action.payload;
      },
      setLatestAccount: (state, action) => {
         state.latestAccount = action.payload;
      },
      setColumns: (state, action) => {
         state.columns = {
            ...state?.columns,
            [action.payload.type]: action.payload,
         };
      },
      clearColumns: (state, action) => {
         state.columns = action.payload;
      },
      setSearch: (state, action) => {
         state.search_keyword = action.payload;
      },
      setTemplate: (state, action) => {
         state.template = action.payload;
      },
      setDynamicData: (state, action) => {
         return { ...state, [action?.payload?.type]: action.payload };
      },
      setDynamicArrayData: (state, action) => {
         return { ...state, [action?.payload?.type]: action.payload };
      },
      setSelectedCategories: (state, action) => {
         state.selectedCategories = action.payload;
      },
      setSelectedBrands: (state, action) => {
         state.selectedBrands = action.payload;
      },
      setPriceRange: (state, action) => {
         state.priceRange = action.payload; // Add setPriceRange action
      },
   },
});

export const {
   setCalendarDate,
   setLatestAccount,
   setColumns,
   clearColumns,
   setSearch,
   setTemplate,
   setSingleDate,
   setPurchaseGrandtotal,
   setPurchaseVATtotal,
   setDynamicData,
   setDynamicArrayData,
   setSelectedCategories,
   setSelectedBrands,
   setPriceRange, // Export setPriceRange action
} = utilsSlice?.actions;
export default utilsSlice?.reducer;
