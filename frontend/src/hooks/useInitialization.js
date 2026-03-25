import { useDispatch } from "react-redux"
import { initializeBlogs } from "../reducers/blogs"
import { initializeUsers } from "../reducers/users"
import { initUser } from "../reducers/user"

export const useInitialization = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initUser())
  }
}