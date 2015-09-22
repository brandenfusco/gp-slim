<?php

/**
 * @package     BlueAcorn\GreenPistachio
 * @version     0.1.0
 * @author      Blue Acorn, Inc. <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn, Inc.
 */

class BlueAcorn_GreenPistachio_Block_Customer_Account_Navigation extends Mage_Customer_Block_Account_Navigation
{

    public function removeLinkByName($name)
    {
        unset($this->_links[$name]);
    }

}