Плагин "Quote Comment" (версия 1.0.1) для LiveStreet 1.0.3


ОПИСАНИЕ

Плагин добавляет возможность цитирования комментариев.

Настройка плагина осуществляется редактированием файла "/plugins/quotecomment/config/config.php".

Поддерживаемые директивы:
1) $config['add_link_topic'] - Добавлять ссылку на оригинальное сообщение в комментариях к топикам.
По умолчанию отлючено (false).

2) $config['add_link_talk'] - Добавлять ссылку на оригинальное сообщение в личных сообщениях.
По умолчанию отлючено (false).

3) $config['copy_whole'] - При отсутствии выделенных фрагментов цитируется комментарий целиком.
По умолчанию включено (true).



УСТАНОВКА

1. Скопировать плагин в каталог /plugins/
2. Через панель управления плагинами (/admin/plugins/) запустить его активацию.



ИЗМЕНЕНИЯ:
1.0.1 (25.04.2014)
Добавлены параметры конфигурации:
- $config['add_link_topic'] - Добавлять ссылку на оригинальное сообщение в комментариях к топикам.
- $config['add_link_talk'] - Добавлять ссылку на оригинальное сообщение в личных сообщениях.
- $config['copy_whole'] - При отсутствии выделенных фрагментов цитируется комментарий целиком.



АВТОР
Александр Вереник

САЙТ 
https://github.com/wasja1982/livestreet_quotecomment
