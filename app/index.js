'use strict';
var path   = require('path');
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var spawn  = require('child_process').spawn;


function validateNotBlank(input) {
    input = this._.str.trim(input);

    if (!input || this._.str.isBlank(input)) {
        return 'This value can not be blank. Please insert a valid value';
    }

    return true;
}

function doubleBackslashNamespace(input) {
    var backSlashed = input.split('\\');
    backSlashed = backSlashed.join('\\\\');
    backSlashed = backSlashed + '\\\\';
    return backSlashed;
}

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('pluginname', { type: String, desc: 'Plugin Name. (ex. Your Plugin Name)', required: true });
        this.option('classname', { type: String, desc: 'Class Name. (ex. YourClassName)', required: true });
        this.option('instancename', { type: String, desc: 'Instance getter Name. (ex. YCN)', required: true });
        this.option('foldername', {type: String, desc: 'Folder name (ex. your-plugin-name)', required: true });
        this.option('textdomain', {type: String, desc: 'Text Domain (ex. your-plugin-name)', required: true });
        this.option('version', {type: String, desc: 'Version (ex. 1.0.0)', required: true });
        this.option('namespace', { type: String, desc: 'Namespace for your library to be used in autoloading. (ex. YourPluginName)', required: true });
    },
    prompting: function () {
        var done = this.async();
        this.log(yosay(
            'Welcome to the Plugin Plate generator!'
        ));
        var prompts = [{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['pluginname']]) === true) {
                    this.log.writeln('plugin name: ' + this.options['pluginname']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'pluginName',
            message: 'Plugin Name',
            validate: validateNotBlank.bind(this),
            default : function () {
                return this._.str.slugify(this.appname);
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['classname']]) === true) {
                    this.log.writeln('class name: ' + this.options['classname']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'className',
            message: 'Class Name',
            validate: validateNotBlank.bind(this),
            default : function () {
                return this._.str.classify(this.pluginName);
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['instancename']]) === true) {
                    this.log.writeln('instance name: ' + this.options['instancename']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'instanceName',
            message: 'Instance Name',
            validate: validateNotBlank.bind(this),
            default : function () {
                return '';
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['foldername']]) === true) {
                    this.log.writeln('folder name: ' + this.options['foldername']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'folderName',
            message: 'Folder Name',
            validate: validateNotBlank.bind(this),
            default : function () {
                return this._.str.slugify(this.pluginName);
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['textdomain']]) === true) {
                    this.log.writeln('text domain: ' + this.options['textdomain']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'textDomain',
            message: 'Text Domain',
            validate: validateNotBlank.bind(this),
            default : function () {
                return this._.str.slugify(this.pluginName);
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['version']]) === true) {
                    this.log.writeln('version: ' + this.options['version']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'version',
            message: 'Version',
            validate: validateNotBlank.bind(this),
            default : function () {
                return '1.0.0';
            }.bind(this)
        },{
            when: function () {
                if(validateNotBlank.apply(this, [this.options['namespace']]) === true) {
                    this.log.writeln('namespace: ' + this.options['namespace']);
                    return false;
                }
                return true;
            }.bind(this),
            type: 'input',
            name: 'namespace',
            message: 'Namespace',
            validate: validateNotBlank.bind(this),
            default : function () {
                return this._.str.classify(this.pluginName);
            }.bind(this)
        }];

        this.prompt(prompts, function (props) {

            this.pluginName  = props.pluginName || this.options['pluginname']
            this.className  = props.className || this.options['classname']
            this.instanceName  = props.instanceName || this.options['instancename']
            this.folderName  = props.folderName || this.options['foldername']
            this.textDomain  = props.textDomain || this.options['textdomain']
            this.version  = props.version || this.options['version']
            this.namespace  = props.namespace || this.options['namespace']

            done();
        }.bind(this));
    },

    configuring: function () {
        if (this.folderName !== this._.last(this.destinationRoot().split(path.sep))) {
            this.destinationRoot(this.folderName);
        }
        this.config.save();
    },

    writing: function () {

        this.mkdir('includes');
        this.mkdir('tests/Unit');
        this.mkdir('bin');

        this.fs.copy(
            this.templatePath('includes/gitkeep'),
            this.destinationPath('includes/.gitkeep')
        );

        this.template('plugin-plate.php', this.folderName + '.php');
        this.template('autoloader.php', 'autoloader.php');

    },
    install: function () {}
});
