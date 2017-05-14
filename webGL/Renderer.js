function Render(mesh, shader) {
    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);
    var identityMatrix = new Float32Array(16);

    mat4.identity(identityMatrix);

    var matWorldUniformLocation = gl.getUniformLocation(shader3D.program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(shader3D.program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(shader3D.program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    viewMatrix = camera.GetViewMatrix();

    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var worldMatrix = new Float32Array(16);

    angle = 0;
    mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1 * dt, 0]);
    mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
    mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
    mat4.translate(worldMatrix, worldMatrix, mesh.position);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    mesh.Update();

    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.drawElements(gl.TRIANGLES, mesh.boxIndices.length, gl.UNSIGNED_SHORT, 0);
}