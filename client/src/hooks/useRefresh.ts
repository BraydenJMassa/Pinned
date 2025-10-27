import axios from 'axios'

const useRefresh = (
  setAuth: (auth: { userId: string; accessToken: string }) => void
) => {
  const refresh = async () => {
    try {
      const response = await axios.post(
        '/api/auth/refresh',
        {},
        { withCredentials: true }
      )

      setAuth({
        userId: response.data.userId,
        accessToken: response.data.accessToken,
      })

      return response.data.accessToken
    } catch (err) {
      setAuth({ userId: '', accessToken: '' })
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
