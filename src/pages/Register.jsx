import React, {  useState , useContext} from "react";
import { Link , Navigate} from "react-router-dom";
import axios from "axios";
 import {Context, server } from "../main";
 import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const { isAuthenticated, setIsAuthenticated, loading , setLoading } =  useContext(Context);

  console.log("server at register",server);
  const submitHandler = async(e) => {
    setLoading(true);
  e.preventDefault();
   
    try {
      console.log("enter in try catch block");
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("data is sucess" , data);
      toast.success(data.message);
       setIsAuthenticated(true);
       setLoading(false);
      setEmail("");
      setPassword("");
      setName("");

    } catch (error) {
     console.log("error" , error);
      //toast.error("some error");
       toast.error(error.response.data.message);
       setIsAuthenticated(false);
       setLoading(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  };

   if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
      <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;