<?php
/**
 * @package     Blueacorn/SuperSelects
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>, Greg Harvell <greg@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

$urlKey = 'superselects';
$rootTemplate = 'one_column';
$storeApplicable = 'default';

$installPage = $urlKey;
$currentInstallPage = Mage::getModel('cms/page')->load($installPage);

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

if(!$currentInstallPage->getId() || !in_array($storeApplicable, $currentInstallPage->getStoreId())){
    $cmsPages[] = array(
        'title'             =>  'Super Selects',
        'identifier'        =>  $urlKey,
        'root_template'     =>  $rootTemplate,
        'content'           =>  $installPageContent,
        'layout_update_xml' =>  $installPageXML,
        'is_active'         =>  1,
        'stores'            =>  $stores
    );

    foreach ($cmsPages as $data) {
        Mage::getModel('cms/page')->setData($data)->save();
    }

}

$installer->endSetup();
