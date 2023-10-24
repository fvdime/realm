"use client"

import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { loginSchema } from "@/schemas/authSchema"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast"
import { ReloadIcon } from "@radix-ui/react-icons"

interface InitialValues {
  username: string;
  password: string
}

const LoginForm = () => {

  const router = useRouter();

  const initialValues: InitialValues = { username: "", password: "" }

  const onSubmit = (values: InitialValues, actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }) => {
    axios.post("/api/users/login", values).then((res) => {
      console.log(res)
      if (res.data?.success == true) {
        toast.success('Successfully!')
        router.push("/");
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
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  })

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
            placeholder=' '
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-[1px]  appearance-none focus:outline-none focus:ring-0 focus:border-slate-400 peer
              ${errors.username && touched.username ?
                "border-red-700" : "border-gray-300"}`}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username or Email</label>
          {errors.username && touched.username && (
            <p className="text-xs font-medium text-red-600 pt-1">{errors.username}</p>
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
        <div className="text-center lg:text-left">
          <button
            type="submit"
            className="w-full  flex justify-center items-center flex-row border px-8 py-2 rounded-3xl text-white uppercase text-xs hover:text-gray-950 bg-gray-950 border-gray-950 hover:bg-white duration-500 transition-all ease-in disabled:opacity-25"
            disabled={isSubmitting}
          >
            {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
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
      </form >
      <Toaster position="top-right"
        reverseOrder={false} />
    </div >
  )
}

export default LoginForm