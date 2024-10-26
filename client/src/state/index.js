// Redux slice that manages the state of an application's authentication and user information
import { createSlice } from "@reduxjs/toolkit";

// it defines an initial state object that has properties for the current mode (light or dark), the currently logged-in user, the user's token, the currently logged-in authority, the authority's token, and an array of docs.
const initialState = {
  mode: "light",
  user: null,
  token: null,
  authority: null,
  authorityToken: null,
  docs: [],
};

export const authSlice = createSlice({
  name: "auth", // the name of the slice
  initialState, // the initial state object defined earlier.

  // an object that defines the actions that can be dispatched to change the state and the corresponding state updates for each action.
  reducers: {
    // changes the current mode between light and dark.
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // sets the user and token properties of the state to the values passed in the action payload.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // sets the authority and authorityToken properties of the state to the values passed in the action payload.
    setAuthorityLogin: (state, action) => {
      state.authority = action.payload.authority;
      state.authorityToken = action.payload.authorityToken;
    },

    // sets the user and token properties of the state to null.
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // sets the authority and authorityToken properties of the state to null.
    setAuthorityLogout: (state) => {
      state.authority = null;
      state.authorityToken = null;
    },
  
    // sets the friends property of the user object to the value passed in the action payload.
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    // sets the docs property of the state to the value passed in the action payload.
    setDocs: (state, action) => {
      state.docs = action.payload.docs;
    },

    // updates a specific doc in the docs array by finding the doc with the id passed in the action payload and replacing it with the doc object also passed in the action payload.
    setDoc: (state, action) => {
      const updatedDocs = state.docs.map((doc) => {
        if (doc._id === action.payload.doc._id) return action.payload.doc;
        return doc;
      });
      state.docs = updatedDocs;
    },
  },
});

export const {
  setMode,
  setLogin,
  setAuthorityLogin,
  setLogout,
  setAuthorityLogout,
  setFriends,
  setDocs,
  setDoc,
} = authSlice.actions;
export default authSlice.reducer;

// This slice can be used to manage and update the state of the authentication and user information in your application. You can use the actions and state in your React components to handle user authentication and display the necessary information.