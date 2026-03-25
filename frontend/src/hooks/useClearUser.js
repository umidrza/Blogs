import { useDispatch } from "react-redux"
import { clearUser } from "../reducers/user"

export const useClearUser = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(clearUser())
  }
}