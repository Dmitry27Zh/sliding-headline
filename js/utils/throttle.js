export const throttleEvent = (elem, eventType, newEventType) => {
  let isRunning = false

  const eventHandler = () => {
    if (isRunning) return
    isRunning = true

    requestAnimationFrame(() => {
      elem.dispatchEvent(new CustomEvent(newEventType))
      isRunning = false
    })
  }

  elem.addEventListener(eventType, eventHandler)
}
