import Link from 'next/link'
import React from 'react'

const Masonry = () => {

  const imgSrc = [
    {
      id: 1,
      src: 'https://i.pinimg.com/236x/b0/01/0e/b0010e6d7e0d2c18a10db96797862430.jpg'
    },
    {
      id: 2,
      src: 'https://i.pinimg.com/236x/38/e3/06/38e3061f97277f6fb24b11f97d7f04dc.jpg'
    },
    {
      id: 3,
      src: 'https://i.pinimg.com/236x/32/db/92/32db926d506996e2679195c4888710a3.jpg'
    },
    {
      id: 4,
      src: 'https://i.pinimg.com/236x/95/94/ee/9594ee1c4a41af20f26f4286c8ac80ec.jpg'
    },
    {
      id: 5,
      src: 'https://i.pinimg.com/236x/6a/9e/fd/6a9efdafcbbd1819cf32ff0cd8d85fd3.jpg'
    },
    {
      id: 6,
      src: 'https://i.pinimg.com/236x/1c/b4/7d/1cb47d484df16072293b711d502ea914.jpg'
    },
    {
      id: 7,
      src: 'https://i.pinimg.com/236x/37/51/0b/37510b30d7c721b0c3d592a662dcad91.jpg'
    },
    {
      id: 8,
      src: 'https://i.pinimg.com/236x/18/05/f8/1805f84a61cf029343ae7416fcea019a.jpg'
    },
    {
      id: 9,
      src: 'https://i.pinimg.com/236x/c9/93/08/c99308fc8c0809ca6f1283f0f4d7778f.jpg'
    },
    {
      id: 10,
      src: 'https://i.pinimg.com/236x/0e/42/7a/0e427a5bf5dac8a293894bd4671ec048.jpg'
    },

    {
      id: 11,
      src: 'https://i.pinimg.com/236x/20/a6/3c/20a63ceca4e8756a6b9e5598450c4f02.jpg'
    },
    {
      id: 12,
      src: 'https://i.pinimg.com/236x/25/f3/4d/25f34d867496c3a918353f04fb2ba25c.jpg'
    },
    {
      id: 13,
      src: 'https://i.pinimg.com/236x/07/00/de/0700de83b56da7f8dad62a5bae7bedb2.jpg'
    },{
      id: 14,
      src: 'https://i.pinimg.com/236x/f2/1a/d9/f21ad919b699421f8c7bad60b965855d.jpg'
    },
    {
      id: 15,
      src: 'https://i.pinimg.com/236x/3a/fd/1b/3afd1bd1fee4e9c6d445adc983999eeb.jpg'
    },

    {
      id: 16,
      src: 'https://i.pinimg.com/236x/d6/16/b2/d616b233068b02be3dd547db8c69dd4a.jpg'
    },
    {
      id: 17,
      src: 'https://i.pinimg.com/236x/b0/01/0e/b0010e6d7e0d2c18a10db96797862430.jpg'
    },
    {
      id: 18,
      src: 'https://i.pinimg.com/236x/38/e3/06/38e3061f97277f6fb24b11f97d7f04dc.jpg'
    },
    {
      id: 19,
      src: 'https://i.pinimg.com/236x/32/db/92/32db926d506996e2679195c4888710a3.jpg'
    },
    {
      id: 20,
      src: 'https://i.pinimg.com/236x/95/94/ee/9594ee1c4a41af20f26f4286c8ac80ec.jpg'
    },
  ]

  // gonna think bout next image dw
  return (
    <div>
      <div className='my-8'>
        <h1 className='font-semibold uppercase text-center'>gallery</h1>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {/* max-w-screen-lg mx-auto p-4 lg:px-0  */}
      {imgSrc.map((item) => (
        <div className='w-full break-inside-auto mb-2' key={item.id}>
          <Link href='/faya/1' className='cursor-pointer bg-gray-500 bg-blend-multiply'>
            <img src={item.src} alt="" className='rounded-lg transition-all duration-500 ease-in-out hover:brightness-50' />
          </Link>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Masonry