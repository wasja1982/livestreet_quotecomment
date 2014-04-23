<script type="text/javascript">
    var parent_url = "{$sParentUrl}";
    var add_link = {if $sTargetType == 'talk'}{if $oConfig->GetValue('plugin.quotecomment.add_link_talk')}true{else}false{/if}{else}{if $oConfig->GetValue('plugin.quotecomment.add_link_topic')}true{else}false{/if}{/if};
    var copy_whole = {if $oConfig->GetValue('plugin.quotecomment.copy_whole')}true{else}false{/if};
    var selected_empty_warning = "{$aLang.plugin.quotecomment.selected_empty}";
</script>
