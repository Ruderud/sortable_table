const BASE_URL = "http://localhost:4000";
export const getData = async ({ query }) => {
  try {
    const response = await fetch(`${BASE_URL}/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error log:", error);
    alert("json db서버 에러발생");
  }
};

export default getData;
