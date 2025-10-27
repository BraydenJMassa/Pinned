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
