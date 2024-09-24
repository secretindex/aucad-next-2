type AditionalText = {
  title: string
  message: string
}

export interface UserSchema {
  name: string
  email: string
  password: string
  personalMessages: Array<AditionalText>
}

export interface AdminSchema {
  name: string
  email: string
  password: string
  admin: boolean
}
