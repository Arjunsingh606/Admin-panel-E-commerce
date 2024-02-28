import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserForm {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

interface UserState {
  data: UserForm[];
  status: string;
  error: string | undefined;
}

interface User {
  email?: string;
  password?: string;
}

interface ResetPassPayload {
  userId: string;
  confirmPass: string;
}

const initialState: UserState = {
  data: [],
  status: "idle",
  error: "",
};

// fetching data for login functionality
export const getusers = createAsyncThunk<User[]>("user/getusers", async () => {
  const response = await fetch('http://localhost:3001/user');
  const users = await response.json();
  return users;
});

// post user data on api
export const userPostData = createAsyncThunk<UserForm, UserForm>("userdata", async (requestData) => {
  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    return await response.json();
  } catch (error:any) {
    console.log(error.message, "Error to post data");
  }
});

// update api (reset password)
export const resetPassword = createAsyncThunk<UserForm, ResetPassPayload>(
  'user/resetPassword',
  async ({ userId, confirmPass }) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmPass: confirmPass }),
      });
      return await response.json();
    } catch (error) {
      console.log(error, "Error while updating");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPostData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userPostData.fulfilled, (state, action: PayloadAction<UserForm>) => {
      state.status = "succeeded";
      console.log(action.payload, "action payload dejherui");
      
      state.data.push(action.payload); 
    });
    builder.addCase(userPostData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(getusers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getusers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(getusers.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<UserForm>) => {
      state.status = 'succeeded';
      state.data.push(action.payload); 
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

























