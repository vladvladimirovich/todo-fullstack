const URL = process.env.PUBLIC_URL || "http://localhost:5000";

console.log("URL:", URL);
console.log("Public URL", process.env.PUBLIC_URL);

// VERIFY USER
function saveAuthState() {
  return async function (dispatch: any) {
    dispatch({ type: "auth/loading", payload: true });
    const response = await fetch(URL + "/api/v1/users/verify", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      console.log("SET TRUE");
      dispatch({ type: "auth/setTrue" });
    } else {
      console.log("SET FALSE");
      dispatch({ type: "auth/setFalse" });
    }
    dispatch({ type: "auth/loading", payload: false });
  };
}

// LOGIN
function loginUser(username: string, password: string) {
  return async function (dispatch: any) {
    const response = await fetch(URL + "/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status === 200) {
      dispatch({ type: "auth/setTrue" });
    }
  };
}

// REGISTRATION
function registerUser(username: string, password: string) {
  return async function (dispatch: any) {
    const response = await fetch(URL + "/api/v1/users/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.status === 200) {
      dispatch({ type: "auth/setTrue" });
    }
  };
}

export { saveAuthState, loginUser, registerUser };
