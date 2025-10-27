import axios from 'axios'

const useRefresh = (
  setAuth?: (auth: { userId: string; accessToken: string }) => void
) => {
  const refresh = async () => {
    try {
      const response = await axios.post(
        '/api/auth/refresh',
        {},
        {
          withCredentials: true,
          validateStatus: (status) => status < 500, // ✅ don't treat 4xx as errors
        }
      )
      console.log('refresh response status', response.status)
      if (response.status === 200) {
        if (setAuth) {
          setAuth({
            accessToken: response.data.accessToken,
            userId: response.data.userId,
          })
        }
        return response.data.accessToken
      } else {
        if (setAuth) setAuth({ userId: '', accessToken: '' })
        return null
      }
    } catch (err) {
      console.log('Caught by catch:', err)
      if (setAuth) setAuth({ userId: '', accessToken: '' })
      return null
    }
  }

  return { refresh }
}

export default useRefresh

// import axios from 'axios'
// import { useAuth } from './useAuth'
// import { useState } from 'react'

// const useRefresh = () => {
//   const { setAuth } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const refresh = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.post(
//         '/api/auth/refresh',
//         {},
//         {
//           withCredentials: true,
//         }
//       )
//       setAuth({
//         accessToken: response.data.accessToken,
//         userId: response.data.userId,
//       })
//       return response.data.accessToken
//     } catch (err) {
//       setAuth({ userId: '', accessToken: '' })
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }
//   return { refresh, loading }
// }

// export default useRefresh
