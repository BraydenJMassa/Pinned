import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type LogoutModalContext = {
  showLogoutModal: boolean
  toggleLogoutModal: Dispatch<SetStateAction<boolean>>
}

const LogoutModalContext = createContext<LogoutModalContext | undefined>(
  undefined
)

export const LogoutModalProvider = ({ children }: { children: ReactNode }) => {
  const [showLogoutModal, toggleLogoutModal] = useState(false)

  return (
    <LogoutModalContext.Provider value={{ showLogoutModal, toggleLogoutModal }}>
      {children}
    </LogoutModalContext.Provider>
  )
}

export default LogoutModalContext
