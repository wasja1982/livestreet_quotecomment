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
        var link = (add_link ? '<a href="' + parent_url + '#comment' + idComment + '">#</a> ' : '');
        if (this.options.wysiwyg) {
            $.each(quotedText, function( index, value ) {
                tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'blockquote', {}, link + value);
                tinyMCE.activeEditor.dom.add(tinyMCE.activeEditor.getBody(), 'br', {}, '');
            });
        } else {
            var comment_text=$('#form_comment_text');
            if(comment_text.length){
                $.each(quotedText, function( index, value ) {
                    comment_text.val(comment_text.val() + '<blockquote>' + link + value + '</blockquote>\n');
                });
            }
        }
    };

    return this;
}).call(ls.comments || {}, jQuery);