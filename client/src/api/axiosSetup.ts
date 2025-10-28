import axios from 'axios'
import useRefresh from '../hooks/useRefresh'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

axios.defaults.baseURL = import.meta.env.PROD
  ? 'https://pinned-l4nt.onrender.com'
  : 'http://localhost:4000'
axios.defaults.withCredentials = true

const useAxiosInterceptor = () => {
  const { setAuth } = useAuth()
  const { refresh } = useRefresh(setAuth)

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const newToken = await refresh()
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return axios(originalRequest)
          }
        }
        return Promise.reject(err)
      }
    )

    // cleanup to prevent duplicate interceptors
    return () => axios.interceptors.response.eject(interceptor)
  }, [refresh])
}

export default useAxiosInterceptor
