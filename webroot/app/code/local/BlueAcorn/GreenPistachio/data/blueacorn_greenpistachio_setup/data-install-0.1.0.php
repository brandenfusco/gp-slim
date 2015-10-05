<?php

/**
 * @package     BlueAcorn\GreenPistachio
 * @version     0.1.0
 * @author      Blue Acorn, Inc. <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn, Inc.
 */

$installer = $this;

$installer->startSetup();

$urlKey = 'style-guide';
$rootTemplate = 'one_column';
$storeApplicable = 'default';
$installPage = $urlKey;
$currentInstallPage = Mage::getModel('cms/page')->load($installPage);

$installPageContent = <<<CONTENT
{{block type="core/template" name="style-guide" template="blueacorn/ui/styleguide.phtml"}}
CONTENT;

$installPageXML = <<<CONTENT
<reference name="head">
<action method="addItem"><type>skin_css</type><name>css/styleguide.css</name><params/></action>
<action method="addItem"><type>skin_css</type><name>css/vendor/prism.css</name><params/></action>
<action method="addItem"><type>skin_js</type><name>js/vendor/prism.js</name><params>data-manual</params></action>
<action method="addItem" ifconfig="sales/msrp/enabled"><type>skin_js</type><name>js/msrp.js</name></action>
<action method="addItem" ifconfig="sales/msrp/enabled"><type>skin_js</type><name>js/msrp_rwd.js</name></action>
<action method="addItem"><type>skin_js</type><script>js/lib/elevatezoom/jquery.elevateZoom-3.0.8.min.js</script></action>
</reference>

<reference name="cms.wrapper">
<action method="unsetChild"><name>cms_page</name></action>
</reference>

<reference name="content">
<action method="insert"><name>cms_page</name></action>
<block type="core/template" template="catalog/msrp/popup.phtml" name="product.tooltip"></block>
</reference>
CONTENT;

if($storeApplicable != ''){
    $stores = array(intval($storeApplicable));
}else{
    $stores = array(intval(0));
}

if($currentInstallPage->isObjectNew()){
    $currentInstallPage->setData(
        array(
            'title'             =>  'Style Guide',
            'identifier'        =>  $urlKey,
            'root_template'     =>  $rootTemplate,
            'content'           =>  $installPageContent,
            'layout_update_xml' =>  $installPageXML,
            'is_active'         =>  1,
            'stores'            =>  $stores
        )
    )
    ->save();

} else {
    $currentInstallPage
        ->setContent($installPageContent)
        ->setLayoutUpdateXml($installPageXML)
        ->setIsActive(1)
        ->save();
}

$urlKey = 'superselects';
$rootTemplate = 'one_column';
$storeApplicable = 'default';
$installPage = $urlKey;
$newInstallPage = Mage::getModel('cms/page')->load($installPage);

$installPageContent = <<<CONTENT
{{block type="core/template" name="style-guide" template="blueacorn/ui/super-select.phtml"}}
CONTENT;

$installPageXML = <<<CONTENT
<reference name="head">
<action method="addItem"><type>skin_css</type><name>css/blueacorn-super-selects.css</name></action>
</reference>
CONTENT;

if($storeApplicable != ''){
    $stores = array(intval($storeApplicable));
}else{
    $stores = array(intval(0));
}

if($newInstallPage->isObjectNew()){
    $newInstallPage->setData(
        array(
            'title'             =>  'Super Selects',
            'identifier'        =>  $urlKey,
            'root_template'     =>  $rootTemplate,
            'content'           =>  $installPageContent,
            'layout_update_xml' =>  $installPageXML,
            'is_active'         =>  1,
            'stores'            =>  $stores
        )
    )
    ->save();
} else {
    $newInstallPage
        ->setContent($installPageContent)
        ->setLayoutUpdateXml($installPageXML)
        ->setIsActive(1)
        ->save();
}

$installer->endSetup();