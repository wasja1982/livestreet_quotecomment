{if $oUserCurrent}
    <li><a href="#" class="comment-quote link-dotted" onclick="ls.comments.addQuotedText({$oComment->getId()}); return false;">{$aLang.plugin.quotecomment.quote}</a></li>
{/if}