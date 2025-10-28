import axios, { isAxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'
import { PinType } from '../types/PinType'

// Exports helper pin operation functions used in the application
const PinOperations = (
  setPins: React.Dispatch<React.SetStateAction<PinType[] | undefined>>,
  setPinsError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const { auth } = useAuth()
  // Fetches all pins for specified user
  const fetchPins = async () => {
    try {
      const response = await axios.get(`/api/user/pin/${auth.userId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      setPins(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        setPinsError(err.response?.data.message || 'Unknown error loading pins')
      }
    }
  }
  // Creates a pin for authenticated user
  const createPin = async (desc: string) => {
    try {
      await axios.post(
        'api/pin',
        { description: desc },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
          withCredentials: true,
        }
      )
      await fetchPins()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'Error creating pin:',
          err.response?.data?.error || err.message
        )
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }
  return { fetchPins, createPin }
}

export default PinOperations
