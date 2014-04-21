<?php
/**
 * Quote Comment - цитирование комментариев
 *
 * Версия:	1.0.0
 * Автор:	Александр Вереник
 * Профиль:	http://livestreet.ru/profile/Wasja/
 * GitHub:	https://github.com/wasja1982/livestreet_quotecomment
 *
 **/

/**
 * Запрещаем напрямую через браузер обращение к этому файлу.
 */
if (! class_exists ( 'Plugin' )) {
    die ( 'Hacking attemp!' );
}

class PluginQuotecomment extends Plugin {

    /**
     * Активация плагина
     */
    public function Activate() {
        return true;
    }

    /**
     * Инициализация плагина
     */
    public function Init() {
        $this->Viewer_AppendScript(Plugin::GetTemplateWebPath(__CLASS__) . 'js/comments.js');

        return true;
    }
}