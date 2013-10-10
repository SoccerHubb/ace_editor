(function(window, $, undefined) {
    $(function() {
        // retrieve all code text area elements
        var $codeElements = $('textarea.code');

        $codeElements.each(function(i, textArea) {
            var $textArea = $(textArea);

            // create a new element after the text area to host the Ace editor
            var $codeArea = $('<div>')
                .text($textArea.val())
                .css('position', 'relative')
                .css('display', 'inline-block')
                .css('width', '100%')
                .css('height', $textArea.height())
                .css('margin', $textArea.css('margin'));

            // insert the code area and hide the text area
            $textArea.after($codeArea)
                .hide();

            // create an editor instance for the newly created code area
            var editor = ace.edit($codeArea.get(0));
            editor.setTheme('ace/theme/textmate');
            editor.getSession().setMode('ace/mode/xml');
            editor.getSession().setUseWrapMode(true);
            editor.setHighlightActiveLine(true);

            var synchingTextArea = false;
            var synchingCodeEditor = false;
            var previousText = $textArea.val();

            /**
             * Updates the text area value from the Ace editor code.
             */
            var syncTextArea = function() {
                if (!synchingCodeEditor) {
                    synchingTextArea = true;
                    previousText = editor.getValue();
                    $textArea.val(previousText);
                    synchingTextArea = false;
                }
            };

            /**
             * Updates the Ace editor code with the text area value.
             */
            var syncCodeEditor = function() {
                if (!synchingTextArea) {
                    synchingCodeEditor = true;
                    editor.setValue($textArea.val(), -1);
                    synchingCodeEditor = false;
                }
            };

            editor.getSession().on('change', syncTextArea);

            setInterval(function() {
                var currentText = $textArea.val();

                // determine whether the current text area value is different
                // to the previous text area value, updating the code editor
                // value if this is the case
                if (currentText != previousText) {
                    previousText = currentText;
                    syncCodeEditor();
                }
            }, 100);
        });
    });
})(this, jQuery);
