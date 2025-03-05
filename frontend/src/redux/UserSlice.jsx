import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";


export const UserSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
    },

    reducers:{

         SetAuthUser:(state,action)=>{
             state.user = action.payload
         }

    }
})

export const {SetAuthUser} = UserSlice.actions

const persistConfig ={
    key:"auth", storage: storageSession
}
const persistedReducer = persistReducer(persistConfig,UserSlice.reducer)
export default persistedReducer
