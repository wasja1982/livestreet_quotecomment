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

class PluginQuotecomment_HookQuotecomment extends Hook {
    public function RegisterHook() {
        if ($this->User_GetUserCurrent()) {
            $this->AddHook('template_comment_action', 'InjectQuoteLink');
            $this->AddHook('template_comment_tree_end', 'InjectQuoteTree');
        }
    }

    public function InjectQuoteLink($aParam) {
        $oUserCurrent=$this->User_GetUserCurrent();
        if (!$oUserCurrent) {
            return;
        }
        $oComment = $aParam['comment'];
        if (!$oComment) {
            return;
        }

        $sTemplatePath = Plugin::GetTemplatePath(__CLASS__) . 'inject_quotecomment_command.tpl';
        if ($this->Viewer_TemplateExists($sTemplatePath)) {
            $this->Viewer_Assign('oComment', $oComment);
            $this->Viewer_Assign('oConfig',Config::getInstance());
            $this->Viewer_Assign('oUserCurrent',$oUserCurrent);
            return $this->Viewer_Fetch($sTemplatePath);
        }
    }

    public function InjectQuoteTree($aParam) {
        $oUserCurrent=$this->User_GetUserCurrent();
        if (!$oUserCurrent) {
            return;
        }
        if ($aParam['sTargetType'] != 'topic' && $aParam['sTargetType'] != 'talk') {
            return;
        }
        $sUrl = "";
        if ($aParam['sTargetType'] == 'topic') {
            $oTopic = $this->Topic_GetTopicById($aParam['iTargetId']);
            if (!$oTopic) {
                return;
            }
            $sUrl = $oTopic->getUrl();
        } else if ($aParam['sTargetType'] == 'talk') {
            $sUrl = Router::GetPath('talk') . 'read/' . $aParam['iTargetId'];
        } else {
            return;
        }
        $sTemplatePath = Plugin::GetTemplatePath(__CLASS__) . 'inject_quotecomment_tree.tpl';
        if ($this->Viewer_TemplateExists($sTemplatePath)) {
            $this->Viewer_Assign('sParentUrl', $sUrl);
            return $this->Viewer_Fetch($sTemplatePath);
        }
    }
}
?>