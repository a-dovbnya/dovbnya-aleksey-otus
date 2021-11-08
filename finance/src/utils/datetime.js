export const getLastDays = (n) => {
  /**
   * Возвращает массив строк n дат от текущего дня
   */
  const today = (new Date()).getTime()
  const startDate = today - (n - 1) * 24 * 60 * 60 * 1000
  const result = []

  for (let i = 0; i < n; i++) {
    const current = new Date(startDate + i * 24 * 60 * 60 * 1000)
    let day = current.getDate()
    let month = current.getMonth() + 1

    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }

    result.push(`${day}.${month}.${current.getFullYear()}`)
  }

  return result
}

export const simpleDate = (timestamp) => {
  const date = new Date(timestamp)
  let day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  if (day < 10) {
    day = `0${day}`
  }

  return `${day}.${month}.${year}`
}
