import { useState, useEffect } from "react";

const useFetch = (url, token, request, method, formatData) => {
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchURL = async () => {
         try {
            const response = await fetch(url, {
               method: method,
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(request),
            });
            let data = await response.json();
            setResponse(formatData(data));
         } catch (error) {
            setError(error);
         } finally {
            setLoading(false);
         }
      };
      fetchURL();
   }, []);

   return [response, loading, error];
};

export default useFetch;
