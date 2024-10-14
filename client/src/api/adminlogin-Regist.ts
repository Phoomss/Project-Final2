const API_BASE_URL = "http://localhost:3001";

// export const registerAdmin = async (admin: any): Promise<any> => {
//   const url = `${API_BASE_URL}/admin/register`;
//   console.log("Request URL:", url);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(admin),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Server returned ${response.status} ${response.statusText} for ${url}`
//       );
//     }

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const responseData = await response.text();
//       return responseData;
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error: any) {
//     console.error("Error:", (error as Error).message);
//     throw error;
//   }
// };
export const loginAdmin = async (
  email: string,
  password: string
): Promise<any> => {
  const url = `${API_BASE_URL}/admin/login`;
  console.log("Request URL:", url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const statusText = response.statusText || "Unknown Error";
      throw new Error(
        `Server returned ${response.status} ${statusText} for ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseData = await response.text();
      return responseData;
    }

    const responseData = await response.json();
    if (responseData.token && responseData.id) {
      localStorage.setItem("adminToken", responseData.token);
      localStorage.setItem("adminId", responseData.id);
      window.location.href = `/admin/${responseData.id}`;
    } else {
      console.error("Response does not contain expected fields:", responseData);
    }

    return responseData;
  } catch (error: any) {
    console.error("Error:", (error as Error).message);

    if (error instanceof TypeError) {
      console.error("Network error or CORS issue");
    } else if (error instanceof SyntaxError) {
      console.error("Error parsing JSON response");
    }

    throw error;
  }
};
