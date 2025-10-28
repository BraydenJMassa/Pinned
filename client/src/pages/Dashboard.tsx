import { useEffect, useState } from 'react'
import { PinType } from '../types/PinType'
import '../styles/dashboard.css'
import Navbar from '../components/Navbar'
import PinList from '../components/PinList'
import PinOperations from '../utils/PinOperations'
import { useModal } from '../hooks/useModal'

// Dashboard page for authenticated users
const Dashboard = () => {
  // Local state for list of user's pins and any errors fetching pins
  const [pins, setPins] = useState<undefined | PinType[]>(undefined)
  const [pinsError, setPinsError] = useState<undefined | string>(undefined)

  // Importing openModal to open Modal for creating new pins
  const { openModal } = useModal()

  // Importing fetchPins and createPin helpers
  const { fetchPins, createPin } = PinOperations(setPins, setPinsError)

  // Called when user clicks the Add Pin button, to open the Modal
  const handleClickAddPin = () => {
    openModal({
      type: 'pin',
      title: 'Add Pin',
      initialDesc: '',
      onConfirm: createPin,
    })
  }

  // Sets page title
  useEffect(() => {
    document.title = 'Pinned · Dashboard'
    fetchPins()
  }, [])

  // If there is an error fetching pins, this is displayed instead of the page
  if (pinsError) {
    return (
      <>
        <Navbar />
        <div className='dashboard pinsError'>{pinsError}</div>
      </>
    )
  }
  // Loads this loading spinner if application is in process of fetching pins
  if (!pins) {
    return (
      <div className='loading-container'>
        <div className='spinner' />
      </div>
    )
  }

  // Dashboard page markup
  return (
    <div className='dashboard'>
      <Navbar />
      <main>
        <button className='create-pin-btn' onClick={handleClickAddPin}>
          +
        </button>
        <PinList pins={pins} onUpdate={fetchPins} />
      </main>
    </div>
  )
}

export default Dashboard
