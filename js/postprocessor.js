PUZODER.PostProcessor = function() {

	this.postProcessors = {};

}

PUZODER.PostProcessor.prototype.load = function( url, callback ) {

	$.getScript( url, callback );

}

PUZODER.PostProcessor.prototype.add = function( name, postProcessor, enabled ) {

	this.postProcessors[ name ] = new THREE.ShaderPass( postProcessor );
	this.postProcessors[ name ].renderToScreen = enabled || false;
	composer.addPass( this.postProcessors[ name ] );

}

PUZODER.PostProcessor.prototype.setUniform = function( name, uniform, value ) {

	this.postProcessors[ name ].uniforms[ uniform ].value = value;

}

PUZODER.PostProcessor.prototype.getUniform = function( name, uniform ) {

	return this.postProcessors[ name ].uniforms[ uniform ].value;

}

PUZODER.PostProcessor.prototype.enable = function( name ) {

	this.postProcessors[ name ].renderToScreen = true;

}

PUZODER.PostProcessor.prototype.disable = function( name ) {

	this.postProcessors[ name ].renderToScreen = false;

}