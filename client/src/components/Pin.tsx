import editIcon from '../assets/edit.png'
import checkedCheckbox from '../assets/checked-checkbox.png'
import uncheckedCheckbox from '../assets/unchecked-checkbox.png'
import deleteIcon from '../assets/delete.png'
import '../styles/pin.css'
import '../styles/dashboard.css'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { PinType } from '../types/PinType'
import { useModal } from '../hooks/useModal'

// Type declaration for Props of Pin element
type PinProps = {
  pin: PinType
  onUpdate: () => void
}

// Element for each specific pin
const Pin = ({ pin, onUpdate }: PinProps) => {
  // Import auth and modal hooks
  const { auth } = useAuth()
  const { openModal } = useModal()

  // Set internal state for if the pin is checked, or if the app is waiting on
  // an api call
  const [isChecked, setIsChecked] = useState(pin.completed)
  const [isLoading, setIsLoading] = useState(false)

  // Called when user clicks to delete to open the delete Confirmation modal
  const handleClickDelete = () => {
    openModal({
      type: 'confirmation',
      title: 'Are you sure you want to delete this Pin?',
      onConfirm: deletePin,
    })
  }

  // Passed to the confirmation modal to be invoked when user confirms deleting of a pin
  const deletePin = async () => {
    // API call to server to delete pin of specified pinId
    await axios.delete(`/api/pin/${pin.pinId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    onUpdate()
  }

  // Opens the pin modal to edit a pin's description
  const handleClickEdit = () => {
    openModal({
      type: 'pin',
      title: 'Edit pin',
      initialDesc: pin.description,
      onConfirm: updatePin,
    })
  }
  // Passed to the pin modal to be invoked when user confirms update of a pin
  const updatePin = async (desc: string) => {
    try {
      // API call to server to edit pin's description
      await axios.put(
        `/api/pin/${pin.pinId}`,
        { description: desc },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      onUpdate()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'Error updating pin:',
          err.response?.data?.error || err.message
        )
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }
  // Handles functionality when user clicks a pin's checkbox
  const handleClickCheckbox = async () => {
    // Sets local variable to pin's new "checked" state, and updates local state
    // variables to make sure the application waits for this before continuing
    const updatedChecked = !isChecked
    setIsChecked(updatedChecked)
    setIsLoading(true)
    try {
      // API call to toggle the "completed" property in the database
      await axios.patch(
        `/api/pin/togglecompleted/${pin.pinId}`,
        { pin },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      // onUpdate must be called every time a child of the "Dashboard" is updated,
      // so the dashboard can re-fetch and re-render the data
      onUpdate()
    } catch (err) {
      console.error('Error updating pin: ', err)
      setIsChecked(!updatedChecked)
    } finally {
      setIsLoading(false)
    }
  }
  // Sets image from assets based on state of the pin's "completed" property
  const checkBoxImg = isChecked ? checkedCheckbox : uncheckedCheckbox

  // Pin element markup
  return (
    <div className={isChecked ? 'pin completed' : 'pin'}>
      <div className='pin-desc'>{pin.description}</div>
      <div className='pin-btns'>
        <img
          src={deleteIcon}
          className='pin-btn'
          alt='Delete'
          onClick={handleClickDelete}
        />
        <img
          src={editIcon}
          className='pin-btn'
          alt='Edit'
          onClick={handleClickEdit}
        />
        <img
          src={checkBoxImg}
          className='pin-btn'
          alt='checked'
          onClick={!isLoading ? handleClickCheckbox : undefined}
        />
      </div>
    </div>
  )
}

export default Pin
