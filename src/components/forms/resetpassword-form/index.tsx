"use client"

import axios from 'axios'
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import { resetPasswordSchema } from '@/schemas/authSchema'
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSearchParams } from 'next/navigation'


interface InitialValues {
    password: string;
    confirmPassword: string
}

const ResetPasswordForm = () => {

    const searchParams = useSearchParams()

    const expire = searchParams.get('expire')

    const router = useRouter()

    const initialValues: InitialValues = { password: "", confirmPassword: "" }


    const onSubmit = (values: InitialValues, actions: { resetForm: () => void; setSubmitting: (arg0: boolean) => void }) => {
        axios.post("/api/users/resetpassword", {
            ...values,
            expire
        }).then((res) => {
            console.log(res)
            if (res.data?.success == true) {
                toast.success('Successfully!')
                router.push("/login");
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
        validationSchema: resetPasswordSchema,
        onSubmit,
    })

    return (
        <div className="h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="px-20 py-12 rounded-md shadow-md hover:shadow-lg transition-all ease-in-out duration-500">
                <div className="flex items-center justify-center mb-8">
                    <p className="text-lg font-bold">Update password</p>
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
                        onBlur={handleBlur}
                        required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {errors.password && touched.password && (
                        <p className="text-xs font-medium text-red-600">{errors.password}</p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
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
                </div>


                <div className="text-center lg:text-left">
                    <button
                        type="submit"
                        className="w-full  flex flex-row border px-8 py-2 rounded-3xl text-white uppercase text-xs hover:text-gray-950 bg-gray-950 border-gray-950 hover:bg-white duration-500 transition-all ease-in disabled:opacity-25"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </button>
                </div>
            </form>
            <Toaster position="top-right"
                reverseOrder={false} />
        </div>
    )
}

export default ResetPasswordForm