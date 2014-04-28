var ls = ls || {};

ls.comments = (function($) {

    this.getQuotedText = function(idComment) {
        var comment = document.getElementById("comment_content_id_" + idComment);
        var quotedText = [];
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection(), rangeCount;
            if ( (rangeCount = sel.rangeCount) > 0 ) {
                var range = document.createRange();
                for (var i = 0, selRange; i < rangeCount; ++i) {
                    range.selectNodeContents(comment);
                    selRange = sel.getRangeAt(i);
                    if (selRange.compareBoundaryPoints(range.START_TO_END, range) == 1 && selRange.compareBoundaryPoints(range.END_TO_START, range) == -1) {
                        if (selRange.compareBoundaryPoints(range.START_TO_START, range) == 1) {
                            range.setStart(selRange.startContainer, selRange.startOffset);
                        }
                        if (selRange.compareBoundaryPoints(range.END_TO_END, range) == -1) {
                            range.setEnd(selRange.endContainer, selRange.endOffset);
                        }
                        quotedText.push($.trim(range.toString()));
                    }
                }
            }
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            var selTextRange = document.selection.createRange();
            var textRange = selTextRange.duplicate();
            textRange.moveToElementText(comment);
            if (selTextRange.compareEndPoints("EndToStart", textRange) == 1 && selTextRange.compareEndPoints("StartToEnd", textRange) == -1) {
                if (selTextRange.compareEndPoints("StartToStart", textRange) == 1) {
                    textRange.setEndPoint("StartToStart", selTextRange);
                }
                if (selTextRange.compareEndPoints("EndToEnd", textRange) == -1) {
                    textRange.setEndPoint("EndToEnd", selTextRange);
                }
                quotedText.push($.trim(textRange.text));
            }
        }
        if(!quotedText.length){
            if (copy_whole) {
                var comment_content = $("#comment_content_id_" + idComment).first();
                quotedText.push($.trim(comment_content.text()));
            } else {
                ls.msg.error(null, selected_empty_warning);
            }
        }
        return quotedText;
    };

    this.addQuotedText = function(idComment) {
        var quotedText = this.getQuotedText(idComment);
        if(!quotedText.length){
            return;
        }
        var reply=$('#reply');
        if(!reply.length){
            return;
        }
        if (this.iCurrentShowFormComment != idComment || !reply.is(':visible')) {
            this.toggleCommentForm(idComment);
        }
        var comment_author = $.trim($("#comment_id_" + idComment + " .comment-author").first().text());
        var comment_url = parent_url + '#comment' + idComment;
        var link = ((add_link && !add_name) ? '<a href="' + comment_url + '">#</a> ' : '');
        if (this.options.wysiwyg) {
            $.each(quotedText, function( index, value ) {
                if (add_name) {
                    // TODO: Тег LS не отображается в TinyMCE
                    // tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'ls', {'user' : comment_author}, '');
                    tinyMCE.activeEditor.execCommand('mceInsertContent', false, '@' + comment_author + ' ');
                    if (add_link) {
                        tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'a', {"href" : comment_url}, add_name_message);
                    } else {
                        tinyMCE.activeEditor.execCommand('mceInsertContent', false, add_name_message);
                    }
                }
                tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'blockquote', {}, link + value);
                tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'br', {}, '');
            });
        } else {
            var name = (add_name ? '<ls user="' + comment_author + '" /> ' + (add_link ? '<a href="' + comment_url + '">' : '') + add_name_message + (add_link ? '</a>' : '') : '');
            var comment_text=$('#form_comment_text');
            if(comment_text.length){
                $.each(quotedText, function( index, value ) {
                    comment_text.val(comment_text.val() + name + '<blockquote>' + link + value + '</blockquote>\n');
                });
            }
        }
    };

    return this;
}).call(ls.comments || {}, jQuery);