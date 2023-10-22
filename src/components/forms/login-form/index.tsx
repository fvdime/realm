"use client"

import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { authSchema } from "@/schemas/authSchema"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginForm = () => {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async() => {
    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });

      console.log(response.data)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }, [username, password])

  // const handleSubmit = async ({e}: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/users/login", {
  //       username,
  //       password,
  //     });
  //     console.log(response);
  //     if (response?.data?.success) {
  //       localStorage.setItem("user", JSON.stringify(response?.data?.data));
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setError("Please check your credentials.");
  //   }
  // };

  return (
    <div className="h-screen flex items-center justify-center">
      <form 
        onSubmit={handleSubmit}
        className="px-16 py-8 rounded-md shadow-md hover:shadow-lg transition-all ease-in-out duration-500">
        <div className="flex items-center justify-center mb-8">
          <p className="text-lg font-bold">Sign in to your account</p>
        </div>
          <div className="relative z-0 w-full mb-6 group">
            <input 
              type="text" 
              name="username" 
              id="username" 
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
              `} 
              // ${errors.username && touched.username ?
                // "border-red-700"  : "border-gray-300"}
              placeholder=" " 
              value={username}
              onChange={(e) => setUsername(e.target.value)}   
              required />
              <label htmlFor="username"className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
              {/* {errors.username && touched.username && (
                <p className="text-xs font-medium text-red-600 pt-1">{errors.username}</p>
              )} */}
            </div>
          <div className="relative z-0 w-full mb-6 group">
            <input 
                type="password" 
                name="password" 
                id="password" 
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                `} 
                // ${errors.password && touched.password ?
                //   "border-red-700"  : "border-gray-300"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                {/* {errors.password && touched.password && (
                  <p className="text-xs font-medium text-red-600">{errors.password}</p>
                )} */}
          </div>  
          {/* <div className="relative z-0 w-full mb-6 group">
            <input 
                type="password" 
                name="confirmPassword" 
                id="confirmPassword" 
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                ${errors.confirmPassword && touched.confirmPassword ?
                "border-red-700"  : "border-gray-300"}`}  placeholder=" "
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}  
                required />
                <label htmlFor="floating_confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-xs font-medium text-red-600">{errors.confirmPassword}</p>
                )}
          </div>  */}
            <div className="text-center lg:text-left">
              <button
                      type="submit"
                      className="w-full border px-8 py-2 rounded-3xl text-white uppercase text-xs hover:text-gray-950 bg-gray-950 border-gray-950 hover:bg-white duration-500 transition-all ease-in disabled:opacity-25"
                      // disabled={isSubmitting}
                        >
                        Sign In
                    </button>
                    <p className="mb-0 mt-3 pt-1 text-sm font-medium text-gray-950">
                      Don&apos;t have an account?
                      <Link
                        href='/register'
                        className="ml-2 text-slate-500 transition duration-150 ease-in-out hover:text-slate-600 focus:text-slate-600 active:text-slate-700 cursor-pointer"
                        >
                        Sign Up
                      </Link>
                    </p>
                  </div>
      </form>
    </div>
  )
}

export default LoginForm