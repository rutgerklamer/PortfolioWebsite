function HUDMesh() {

    var boxVertices;
    var boxIndices;

    var position = vec3.create();

    this.position = position;

    this.CreateMesh = function() {
        boxVertices = [ 1.0, 1.0, 0.0, 1, 1,
                        1.0, -1.0, 0.0, 1, 0,
                        -1.0, -1.0, 0.0, 0, 0,
                        -1.0, 1.0, 0.0, 0, 1,];

        boxIndices = [ 1,0,2, // first triangle (bottom left - top left - top right)
                     3,2,0 ];
        this.boxIndices = boxIndices;

        var VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader2D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader2D.program, 'vertTexCoord');
        gl.vertexAttribPointer(
            positionAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.vertexAttribPointer(
            texCoordAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);

    }

    this.Update = function() {

    }
}
