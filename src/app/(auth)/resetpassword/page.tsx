'use client'

import { useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
    const searchParams = useSearchParams()

    const expire = searchParams.get('expire')

    console.log(expire)

    return <div>

    </div>
}

export default ResetPasswordPage