class ErrorHandler {
  private instance: number = 0
  private message: string
  constructor(message: string) {
    this.message = message
  }

  createError(message: string) {
    if (this.instance !== 0) {
      this.instance += 1
      return new ErrorHandler(message)
    } else {
      return this
    }
  }

  getMessage() {
    return this.message
  }

  deleteMessage() {
    this.message = ""
  }
}

export default ErrorHandler
