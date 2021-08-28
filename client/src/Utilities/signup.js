const signUp = (userID, password, rePassword, setMessage) => {
   if (password !== rePassword) {
      setMessage("Passwords Don't Match");
      return;
   }

   const request = {
      userID,
      password,
   };

   fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
   })
      .then((response) => response.json())
      .then((data) => {
         if (data.message) {
            setMessage({ value: data.message, color: "" });
         } else {
            localStorage.setItem("token", data.token);
            window.location.href = "http://localhost:8080/home";
         }
      });
};

export default signUp;
