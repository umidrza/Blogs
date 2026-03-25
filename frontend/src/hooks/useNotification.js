import { useDispatch } from 'react-redux'
import { notify } from "../reducers/notification"

export const useNotification = () => {
  const dispatch = useDispatch()

  return (message, type = 'info')  => {
    dispatch(notify(message, type))
  }
}