import bcrypt from 'bcrypt'

export async function validatePassword (originalPassword: string, hashPassword: string | undefined): Promise<boolean> {
  if (typeof hashPassword === 'undefined') {
    throw new Error('No se encontro la contraseña')
  }
  const match = await bcrypt.compare(originalPassword, hashPassword)
  return match
}
export async function hashPassword (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  if (salt === null || salt === undefined) {
    throw new Error('salt is not defined')
  }
  const hash = await bcrypt.hash(password, salt)

  return hash
}
