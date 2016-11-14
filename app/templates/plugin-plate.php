<?php
/*
Plugin Name:   <%= pluginName %>
Description:   <%= pluginName %> Description
Plugin URI:    http://anunatak.no
Author:        Tor Morten Jensen
Author URI:    http://anunatak.no
Version:       <%= version %>
License:       GPL2
Text Domain:   <%= textDomain %>
Domain Path:   lang/
*/

/*

    Copyright (C) 2016  Tor Morten Jensen  tormorten@tormorten.no

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

final class <%= className %> {

    /**
     * Plugin Plate version.
     *
     * @var string
     */
    public $version = '<%= version %>';

    /**
     * The single instance of the class.
     *
     * @var <%= className %>
     * @since <%= version %>
     */
    protected static $_instance = null;


    /**
     * Main Plugin Plate Instance.
     *
     * Ensures only one instance of Plugin Plate is loaded or can be loaded.
     *
     * @since <%= version %>
     * @static
     * @see <%= instanceName %>()
     * @return <%= className %>
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Cloning is forbidden.
     *
     * @since <%= version %>
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', '<%= textDomain %>' ), '2.1' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     *
     * @since <%= version %>
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', '<%= textDomain %>' ), '2.1' );
    }

    /**
     * Auto-load in-accessible properties on demand.
     *
     * @param mixed
     * @return mixed
     * @since <%= version %>
     */
    public function __get( $key ) {
    }

    /**
     * Plugin Plate Constructor.
     */
    public function __construct() {
        $this->autoload();
    }

    /**
     * Plugin autoloader
     * @return void
     */
    public function autoload() {
        if(!class_exists('PP_SplClassLoader')) {
            require_once 'autoloader.php';
        }
        $autoload = new PP_SplClassLoader(get_called_class(), plugin_dir_path( __FILE__ ) . 'includes/');
        $autoload->register();
    }
}

/**
 * Fetches the single formie instance
 */
function <%= instanceName %>() {
    return <%= className %>::instance();
}

$GLOBALS['<%= textDomain %>'] = <%= instanceName %>();
