"use client"

import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useFormik } from 'formik'
import { authSchema } from "@/schemas/authSchema"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { ReloadIcon } from "@radix-ui/react-icons"

interface InitialValues {
  username: string;
  email: string;
  birthday: string;
  password: string;
}


const RegisterForm = () => {

  const initialValues: InitialValues = {
    username: "",
    email: "",
    birthday: "",
    password: "",
    // confirmPassword: "",
  }

  const router = useRouter()

  const onSubmit = (values: InitialValues, actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }) => {
    console.log(values)
    axios.post("/api/users/register", values).then((res) => {
      console.log(values)
      if (res.data?.success == true) {
        localStorage.setItem("user", JSON.stringify(res.data?.data))
        toast.success('Successfully!')
        setTimeout(() => router.push("/login"), 250)
        // router.push("/");
      } else {
        actions.resetForm();
        toast.error('Permission denied!')
        actions.setSubmitting(false);
      }
    }).catch(err => {
      actions.resetForm();
      toast.error('Permission denied!')
      actions.setSubmitting(false);
    })
  };



  const { values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting, } = useFormik({
      initialValues,
      validationSchema: authSchema,
      onSubmit,
    })



  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-16 py-8 rounded-md shadow-md hover:shadow-lg transition-all ease-in-out duration-500">
        <div className="flex items-center justify-center mb-8">
          <p className="text-lg font-bold">Sign up for an account</p>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
              ${errors.username && touched.username ?
                  "border-red-700" : "border-gray-300"}`}
              placeholder=" "
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            {errors.username && touched.username && (
              <p className="text-xs font-medium text-red-600 pt-1">{errors.username}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              id='birthday'
              name="birthday"
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                ${errors.birthday && touched.birthday ?
                  "border-red-700" : "border-gray-300"}`} placeholder=" "
              value={values.birthday}
              onChange={handleChange}
              onBlur={handleBlur}
              required />
            <label htmlFor="birthday" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
            {errors.birthday && touched.birthday && (
              <p className="text-xs font-medium text-red-600">{errors.birthday}</p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                ${errors.email && touched.email ?
                "border-red-700" : "border-gray-300"}`} placeholder=" "
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          {errors.email && touched.email && (
            <p className="text-xs font-medium text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                ${errors.password && touched.password ?
                "border-red-700" : "border-gray-300"}`} placeholder=" "
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur} />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {errors.password && touched.password && (
            <p className="text-xs font-medium text-red-600">{errors.password}</p>
          )}
        </div>
        {/* <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
                ${errors.confirmPassword && touched.confirmPassword ?
                "border-red-700" : "border-gray-300"}`} placeholder=" "
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required />
          <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-xs font-medium text-red-600">{errors.confirmPassword}</p>
          )}
        </div> */}
        <div className="text-center lg:text-left">
          <button
            type="submit"
            className="w-full  flex justify-center items-center flex-row border px-8 py-2 rounded-3xl text-white uppercase text-xs hover:text-gray-950 bg-gray-950 border-gray-950 hover:bg-white duration-500 transition-all ease-in disabled:opacity-25"
            disabled={isSubmitting}
          >
            {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </button>
          <p className="mb-0 mt-3 pt-1 text-sm font-medium text-gray-950">
            Already have an account?
            <Link
              href='/login'
              className="ml-2 text-slate-500 transition duration-150 ease-in-out hover:text-slate-600 focus:text-slate-600 active:text-slate-700 cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
      <Toaster position="top-right"
        reverseOrder={false} />
    </div>
  )
}

export default RegisterForm