/* External dependencies */
import moment from 'moment'
import 'moment/locale/ko'

export const getDate = (date: Date): string => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

export const getTime = (date: Date): any => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  const minute = date.getMinutes()

  if (minute === 0) {
    return moment(date).format('A h시')
  }
  return moment(date).format('A h시 mm분')
}
