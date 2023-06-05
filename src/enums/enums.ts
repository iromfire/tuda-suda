export enum OrderStatus {
  inProcessing = 'В обработке',
  sentWaiting = 'Ожидает отправки',
  sent = 'Отправлен',
  onTheWay = 'В пути',
  delivered = 'Доставлен',
  cancelled = 'Отменен',
}

export enum OrderLoader {
  no = 'Не требуется',
  one = 'Один',
  two = 'Два',
  three = 'Три',
}
