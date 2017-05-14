function Mesh() {

    var boxVertices;
    var boxIndices;

    var position = vec3.create();

    this.position = position;

    this.CreateMesh = function() {
        boxVertices = [ // X, Y, Z           U, V
            // Top
            -1.0, 1.0, -1.0, 0, 0, -1.0, 1.0, 1.0, 0, 1,
            1.0, 1.0, 1.0, 1, 1,
            1.0, 1.0, -1.0, 1, 0,

            // Left
            -1.0, 1.0, 1.0, 0, 0, -1.0, -1.0, 1.0, 1, 0, -1.0, -1.0, -1.0, 1, 1, -1.0, 1.0, -1.0, 0, 1,

            // Right
            1.0, 1.0, 1.0, 1, 1,
            1.0, -1.0, 1.0, 0, 1,
            1.0, -1.0, -1.0, 0, 0,
            1.0, 1.0, -1.0, 1, 0,

            // Front
            1.0, 1.0, 1.0, 1, 1,
            1.0, -1.0, 1.0, 1, 0,
            -1.0, -1.0, 1.0, 0, 0,
            -1.0, 1.0, 1.0, 0, 1,

            // Back
            1.0, 1.0, -1.0, 0, 0,
            1.0, -1.0, -1.0, 0, 1, -1.0, -1.0, -1.0, 1, 1, -1.0, 1.0, -1.0, 1, 0,

            // Bottom
            -1.0, -1.0, -1.0, 1, 1, -1.0, -1.0, 1.0, 1, 0,
            1.0, -1.0, 1.0, 0, 0,
            1.0, -1.0, -1.0, 0, 1,
        ] ;

        boxIndices = [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23
        ];
        this.boxIndices = boxIndices;

        var VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

        var IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(shader3D.program, 'vertPosition');
        var texCoordAttribLocation = gl.getAttribLocation(shader3D.program, 'vertTexCoord');
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
