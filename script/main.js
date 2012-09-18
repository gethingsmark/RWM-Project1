// The game and gui canvas and the context of the game canvas for drawing.
var canvasGame, canvasGui, guiCtx, gameCtx;

var circleBody, world, timeStep;

var groundBd;


/**	@Name:	Init 
	@Brief:	Initalise the game.
	@Arguments:N/A
	@Returns:N/A
*/
function init(){
	
	//Box2d vars
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	world = new b2World(worldAABB, gravity, doSleep); 

	// Create a circle definition.
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 20;
	// Bouncy bouncy
	circleSd.restitution = 0.9;
	circleSd.friction = 0;
	
	// Create the physical body definition.
	var circleBd = new b2BodyDef();
	circleBd.AddShape( circleSd );
	circleBd.position.Set(  canvasGame.width,  canvasGame.height );
	// Add it to the world.
	circleBody = world.CreateBody( circleBd );
	
	
	// Anchor the circle to a fixed position, pendulum effect.
	/*
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set( 250, 200 );
	jointDef.body1 = world.GetGroundBody();
	jointDef.body2 = circleBody;
	world.CreateJoint(jointDef);
	*/
	
	//Create a floor object.
	createGround( world );
	
	// Fix the canvas elements.
	initRenderer();
	 
	 // Set the timestep of the world.
	timeStep = 1.0/60;
	var iteration = 1;
	world.Step( timeStep, iteration );

	// Begin the game loop.
	setInterval( "main()", timeStep );
};

/**	@Name:	Init Render
	@Brief:	Initalise the renderer and add it to the Html page.
	@Arguments:N/A
	@Returns:N/A
*/
function initRenderer(){

	// The game canvas to display the game.
	canvasGame = document.getElementById( "canvasGame" );
	canvasGame.width = window.innerWidth;
	canvasGame.height = window.innerHeight;
	
	// The Gui layer.
	canvasGui = document.getElementById( "canvasGui" );
	canvasGui.width = window.innerWidth;
	canvasGui.height = window.innerHeight;
	
	// Get the context for drawing.
	guiCtx = canvasGui.getContext( "2d" );
	gameCtx = canvasGame.getContext( "2d" );

};


/**	@Name:	Main
	@Brief:	
	@Arguments: .
	@Returns:N/A
*/
function main(){

	world.Step( 1.0/60, 1 );
	

	// GUI Stuff
	canvasGui.width = canvasGui.width;
	gameCtx.clearRect( 0, 0, canvasGame.width, canvasGame.height );
	
	// Set the font and size.
	guiCtx.font = 'italic 40px Calibri';
	guiCtx.shadowOffsetX = 5;
	guiCtx.shadowOffsetY = 5;
	guiCtx.shadowBlur    = 4;
	guiCtx.shadowColor   = 'rgba( 155, 155, 155, 0.5)';
	guiCtx.fillStyle     = 'rgba(255, 255, 255, 0.5)';
	guiCtx.fillRect( 5, 5, 255, 255 );
	guiCtx.fillStyle     = '#000';
	//guiCtx.drawImage( level_Manager._player_Manager.getPlayer()._image, 10 ,10 , 128, 128 );
	//guiCtx.fillText( level_Manager._player_Manager.getPlayer()._name, 10, 180 );
	guiCtx.fillText( 'Score : '+ 'test', 10, 210 );
	guiCtx.fillText( 'Collisions : '+ 'test', 10, 240 );
	
	// Reset the floor position so its on the bottom of the canvas.
	groundBd.position.x = 0;
	groundBd.position.y = canvasGame.height - 50;
	
	drawWorld( world, gameCtx ); // see demos/draw_world.js
	
};


/**	@Name:	On Load
	@Brief:	Called from the dom's mouse down event listener.
	@Arguments: 
	@Returns:N/A
*/
function onLoad(){

	init();
};


/**	@Name:	Render.
	@Brief:	
	@Arguments: 
	@Returns:N/A
*/
function Render() {



};



/**	@Name:	Handle Key Events.
	@Brief:	Called from the dom's mouse down event listener.
	@Arguments: event object.
	@Returns:N/A
*/
function handleKeyEvents( event ) {

	var key = event.keyCode;

	switch( key ){

		case 38:// UP ARROW	
	
	  		break;
		case 40:// DOWN ARROW
	  		break;
		case 37:// LEFT ARROW
	  		break;
		case 39:// RIGHT ARROW
	  		break;
		case 65:// A
	  		break;
		case 68:// D
	  		break;
		case 87:// W
	  		break;
		case 83:// S
	  		break;
		case 88:
	  		break;
		case 97:// Num pad 1. First Person.
	  		break;
		case 98:// Num pad 2. Test.
	  		break;
		case 99:// Num pad 3. Third Person.
	  		break;
		default:
	  		return;		
	}
};

function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	createBox(world, 0, 125, 10, 250);
	createBox(world, 500, 125, 10, 250);
	return world;
}

function createGround( world ) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(1000, 50);
	groundSd.restitution = 0.2;
	groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(-500, 340);
	return world.CreateBody(groundBd)
}

function createBall( world, x, y ) {
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = 20;
	ballSd.restitution = 1.0;
	ballSd.friction = 0;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x,y);
	return world.CreateBody(ballBd);
}

function createBox( world, x, y, width, height, fixed ) {

	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return world.CreateBody(boxBd)
}


function drawWorld(world, context) {
	for (var j = world.m_jointList; j; j = j.m_next) {
		drawJoint(j, context);
	}
	for (var b = world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s, context);
		}
	}
}
function drawJoint(joint, context) {
	var b1 = joint.m_body1;
	var b2 = joint.m_body2;
	var x1 = b1.m_position;
	var x2 = b2.m_position;
	var p1 = joint.GetAnchor1();
	var p2 = joint.GetAnchor2();
	context.strokeStyle = '#00eeee';
	context.beginPath();
	switch (joint.m_type) {
	case b2Joint.e_distanceJoint:
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		break;

	case b2Joint.e_pulleyJoint:
		// TODO
		break;

	default:
		if (b1 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
		}
		else if (b2 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x1.x, x1.y);
		}
		else {
			context.moveTo(x1.x, x1.y);
			context.lineTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
			context.lineTo(p2.x, p2.y);
		}
		break;
	}
	context.stroke();
}


function drawShape(shape, context) {

	context.strokeStyle = '#ffffff';
	context.beginPath();
	switch (shape.m_type) {
	case b2Shape.e_circleShape:
		{
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
	
			// draw radius
			context.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			context.lineTo(pos2.x, pos2.y);
		}
		break;
	case b2Shape.e_polyShape:
		{
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
		}
		break;
	}
	context.stroke();
}




/**	@Name:	Resize
	@Brief:	Called from the dom's resize listener.
	@Arguments:N/A
	@Returns:N/A
*/
function resize(){
    
	//camera.aspect = window.innerWidth / window.innerHeight;
    
    // adjust the FOV
    //camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
    
    //camera.updateProjectionMatrix();
    //camera.lookAt( scene.position );

    //renderer.setSize( window.innerWidth, window.innerHeight );
	//guiCanvas.width = window.innerWidth;
	//guiCanvas.height = window.innerHeight;
    // Redraw 
    Render();
};

// Listen for a resize event and provide the callback.
window.addEventListener( 'resize', resize, false );

// Listen for an orientation change, probably not needed.
window.addEventListener( 'orientationchange', resize, false );

// Listen for a mouse move and provide the callback.
//window.addEventListener( 'mousemove', handleMouseEvents, false );

// Listen for keyboard input and provide the callback.
window.addEventListener( 'keydown', handleKeyEvents, false );

// Tell me when the window loads!
window.onload = onLoad;