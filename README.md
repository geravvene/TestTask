P.S. Дата создания картин хранится на сервере как строка. Фильтрация _gte и _lte сравнивает даты как символы Unicode. Не знаю задумано ли так, правильно сравнивать можно только фильтруя на стороне клиента, что противоречит выданному заданию. 

P.S.S. Не сразу заметил вашу библиотеку, поэтому брал только пагинацию. При использовании библиотеки либо неправильно работают стили, либо я что-то делал не так. Взял код с репозитория, немного исправил (почему-то не работала смена темы).

P.S.S.S. При загрузке некоторых изображений сервер отправляет ошибку ERR_CONTENT_LENGTH_MISMATCH и не загружает больше 115kb. После перезагрузки сервер всё же отправляет изображение. Проблема остаётся даже если запрашивать по одной картинке. Сделал прослойку при ошибке, пока не знаю смогу ли исправить без доступа к серверу.
(Исправлено: было принято решение делать запрос, создавать blob и прокидывать из него URL в атрибут src, помогло.  Upd: так как сломалось встроенное кэширование переделал просто на повторение запроса.)

GitHub Pages: https://geravvene.github.io/TestTask/
