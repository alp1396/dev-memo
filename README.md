# Dev-memo

## Тестовое задание

### Вариант запуска с Docker
Для запуска необходим Docker версии не ниже 4.xx, установленный docker-compose

1. Запустить контейнер
`docker-compose up`
Скрипт сам установит зависимости NPM и запустит приложение

2. Открыть приложение в браузере [http://localhost:3000/](http://localhost:3000/)


### Вариант без Docker
Для запуска необходим NodeJS не ниже 16.xx версии

1. Установить зависимости NPM
`cd app && npm install`

2. Запуск приложения
`npm run start`

3. Если приложение не открылось автоматически в браузере, перейти по ссылке  [http://localhost:3000/](http://localhost:3000/)