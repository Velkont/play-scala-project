# Naumen scala-play-slick-postgresql
***
## Как развернуть приложение:
1. Установить PostgreSQL 12
2. Установить JavaSDK 11. Проверить работоспрособность командой javac -verison. В случае ошибки убедиться, что указан путь в глобальной переменной.
3. Установить sbt.
4. Изменить путь к базе даннных и данные для входа на свои в файле Scala_play_project/conf/application.conf. Также там можно поменять путь для файла, который будет содержать данные в CSV формате о всех записях базы данных.
5. С помощью командной строки или терминала перейти в папку Scala_play_project и выполнить команду "~sbt run port", где port - порт, который будет использовать приложение, если не указывать порт, то по умолчанию 9000.
6. В пути Scala_play_project/Frontend находится фронтенд часть приложения, чтобы использовать его, нужно открыть файл index.html.
7. В пути Scala_play_project/Frontend/config/config.js находится файл конфигурации url для запросов, перед использованием приложения его тоже необходимо изменить под свой сервер.
***
## Примеры использования API:
* Добавить новый телефон:
endpoint: POST /phone
data: JSON вида {
				"name: "qwerty",
				"number": "+7-1111111111"
			}
* Получить список номеров:
endpoint: GET /phones
response: JSON вида [
				{
					"id": "1",
					"name": "qwerty",
					"number": "+7-1111111111"
				},
				{
					"id": "2",
					"name": "qwerty2",
					"number": "+7-9123277530"
				}
				]
* Искать по подстроке имени:
endpoint: GET /phones/searchByName/?name=qwe
response: JSON вида [
				{
					"id": "1",
					"name": "qwerty",
					"number": "+7-1111111111"
				},
				{
					"id": "2",
					"name": "qwerty2",
					"number": "+7-9123277530"
				}
				]
* Искать по подстроке номера:
endpoint: GET /phones/searchByName/?name=7-111
response: JSON вида [
				{
					"id": "1",
					"name": "qwerty",
					"number": "+7-1111111111"
				}
				]
* Обновить данные телефона:
endpoint: POST /phone/{id}
data: JSON вида {
				"name: "qwerty",
				"number": "+7-1111111112"
			}
* Удалить телефон:
endpoint: DELETE /phone/{id}
## Описание архитектуры
Т.к. до этого я не работал со Scala, а тем более с фреймфорком Play и Slick, то решил взять за основу проект-туториал с официального сайта <https://github.com/playframework/play-samples/tree/2.8.x/play-scala-slick-example>
Проект старался делать расширяемым, чтобы можно было добавлять новые функции. Хотелось бы реализовать фронтенд на React, а не на чистом js, но потратить время на изучение React я уже не мог. Добавил тест API через Python в папке test-python.

