var gl;
var canvas;

var previous;
var elapsedTime = 0;
var frameCount = 0;
var lastTime = 0;
var dt;

var up = false;

var firstBox;
var firstBox2;

var meshes = new Array();
var camera;

function main() {
    camera = new Camera();
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    lastTime = new Date().getTime();

    canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL is now supported! :(, I will try it one more time on experimental mode.');
        gl = canvas.getContext('experimental-webgl');
    }
    if (!gl) {
        alert('WebGl is not supported, Try a different browser.');
    }

    gl.clearColor(0.3, 0.3, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    CreateShader();
    for (var i = 0; i < 10; i++) {
        meshes[i] = new Mesh();
        meshes[i].CreateMesh();
        meshes[i].position[0] = Rand() * 5;
        meshes[i].position[1] = Rand() * 5;
        meshes[i].position[2] = Rand() * 5;

    }
    CreateTexture();

    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    viewMatrix = camera.GetViewMatrix();
    console.log(viewMatrix);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    requestAnimationFrame(loop);
}

function loop(timestamp) {
    now = Date.now() * 0.001;
    dt = now - previous;
    previous = now;

    var currentTime = new Date().getTime();

    frameCount++;
    elapsedTime += (currentTime - lastTime);
    lastTime = currentTime;

    if (elapsedTime >= 10000) {
        fps = frameCount;
        frameCount = 0;
        elapsedTime -= 10000;

        console.log("Your current fps is : " + fps / 10);
    }
    gl.clearColor(0.3, 0.3, 0.1, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    camera.ProcessKeys();
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var viewMatrix = new Float32Array(16);

    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);




    for (i = 0; i < meshes.length; i++) {
        Render(meshes[i]);
    }

    requestAnimationFrame(loop);

};
