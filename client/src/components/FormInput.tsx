import { ChangeEvent, FocusEvent } from 'react'

// Type declaration for Props of FormInput element
type FormInputProps = {
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

// Element for the text input fields in the login and register forms
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
}: FormInputProps) => {
  // Returns empty class for default style, error class for red outline, and success
  // class for green outline, depending on status of form input
  const generateExtraClass = () => {
    if (error === '') {
      return success ? 'success' : ''
    }
    return 'error'
  }

  // Form input markup
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
