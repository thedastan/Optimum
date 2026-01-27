export const IS_CLIENT = typeof window !== 'undefined'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
 
export const PHONE_NUMBER = '+996 774 000 315'

export const WHATSAPP_NUMBER = PHONE_NUMBER

export const EMAIL_ADDRESS = ''
export const INSTAGRAM = ''
export const LOCATION = 'Бишкек, Горького 1/2'
export const TELEGRAM = ''

 

/// links/

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.split(' ').join('')}`
export const PHONE_NUMBER_LINK = `tel:${PHONE_NUMBER.split(' ').join('')}`


export const EMAIL_ADDRESS_LINK = `mailto:${EMAIL_ADDRESS}`

export const INSTAGRAM_LINK = `https://instagram.com/${INSTAGRAM}`
export const FACEBOOK_LINK = ``
export const YOUTUBE_LINK = ``

export const TELEGRAM_LINK = `https://t.me/${TELEGRAM}`

export const LOCATION_LINK = 'https://2gis.kg/bishkek/firm/70000001067269216?m=74.634637%2C42.857024%2F16'
 