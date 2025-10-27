import axios from 'axios'
import useRefresh from '../hooks/useRefresh'
import { useEffect } from 'react'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

const useAxiosInterceptor = () => {
  const { refresh } = useRefresh()

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
