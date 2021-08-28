const logIn = (userID, password, setMessage) => {
   if (password == "" || userID == "") {
      setMessage("Enter Details");
      return;
   }

   const request = {
      userID,
      password,
   };

   fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
   })
      .then((response) => response.json())
      .then((data) => {
         if (data.message) {
            setMessage(data.message);
         } else {
            localStorage.setItem("token", data.token);
            window.location.href = "http://localhost:8080/home";
         }
      });
};

export default logIn;
