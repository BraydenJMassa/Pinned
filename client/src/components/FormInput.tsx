import { ChangeEvent, FocusEvent } from 'react'

type Props = {
  labelText: string
  name: string
  type: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  error: string
  success: boolean
}

const FormInput = ({
  type,
  handleChange,
  handleBlur,
  value,
  placeholder,
  labelText,
  name,
  error,
  success,
}: Props) => {
  const generateExtraClass = () => {
    if (error === '') {
      return success ? 'success' : ''
    }
    return 'error'
  }
  return (
    <div className={`form-input ${generateExtraClass()}`}>
      <label htmlFor={name}>{labelText}</label>
      <input
        name={name}
        type={type}
        autoComplete='off'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
      />
      <div className='error'>{error}</div>
    </div>
  )
}

export default FormInput
