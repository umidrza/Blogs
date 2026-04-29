import { useDispatch } from "react-redux"
import { initializeBlogs } from "../reducers/blogs"
import { initializeUsers } from "../reducers/users"
import { initUser } from "../reducers/user"
import { useNotification } from "./useNotification"

export const useInitialization = () => {
  const dispatch = useDispatch()
  const notify = useNotification()

  return async () => {
    try {
      await dispatch(initializeBlogs())
    } catch (error) {
      const errorMessage = error.error || error.message || "Failed to load blogs"
      notify(errorMessage, "error")
    }

    try {
      await dispatch(initializeUsers())
    } catch (error) {
      const errorMessage = error.error || error.message || "Failed to load users"
      notify(errorMessage, "error")
    }

    try {
      await dispatch(initUser())
    } catch {
      // Silent fail for user initialization
    }
  }
}