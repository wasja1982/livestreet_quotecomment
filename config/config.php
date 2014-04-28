<?php
/**
 * Quote Comment - цитирование комментариев
 *
 * Версия:	1.0.1
 * Автор:	Александр Вереник
 * Профиль:	http://livestreet.ru/profile/Wasja/
 * GitHub:	https://github.com/wasja1982/livestreet_quotecomment
 *
 **/

$config = array();

// Добавлять ссылку на оригинальное сообщение в комментариях к топикам
$config['add_link_topic'] = false;

// Добавлять ссылку на оригинальное сообщение в личных сообщениях
$config['add_link_talk'] = false;

// Добавлять упоминание автора в комментариях к топикам
$config['add_name_topic'] = false;

// Добавлять упоминание автора в личных сообщениях
$config['add_name_talk'] = false;

// При отсутствии выделенных фрагментов цитируется комментарий целиком.
$config['copy_whole'] = true;

return $config;
?>