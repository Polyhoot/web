import md5 from 'md5'

const getGravatarURL = (email: string): string => {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase()

  // Create an MD5 hash of the final string
  const hash = md5(address)

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}?d=https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`
}

export default getGravatarURL
