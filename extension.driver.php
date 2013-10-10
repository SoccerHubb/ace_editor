<?php

Class Extension_Ace_Editor extends Extension {
    public function getSubscribedDelegates(){
        return array(
            array(
                'page' => '/backend/',
                'delegate' => 'AdminPagePreGenerate',
                'callback' => 'addAssets'
            )
        );
    }

    public function addAssets(){
        Administration::instance()->Page->addScriptToHead(
            URL.'/extensions/ace_editor/assets/ace/ace.js', null, false);
        Administration::instance()->Page->addScriptToHead(
            URL.'/extensions/ace_editor/assets/main.js', null, false);
    }
}
