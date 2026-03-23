import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div className={!visible ? "d-block" : "d-none"}>
        <button className="btn btn-primary btn-sm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div className={visible ? "d-block mt-2" : "d-none"}>
        {props.children}
        <button
          className="btn btn-secondary btn-sm mt-2"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable