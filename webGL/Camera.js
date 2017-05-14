function Camera() {
    this.position = vec3.create();
    this.front = vec3.create();
    this.up = vec3.create();
    this.right = vec3.create();
    this.worldUp = vec3.create();
    this.worldUp[1] = 1;

    this.yaw = 1;;
    this.pitch = 1;;

    this.lastX = 1;
    this.lastY = 1;

    this.Update = function() {
        var frontTemp = vec3.create();
        frontTemp[0] = Math.cos(this.yaw * (Math.PI / 180)) * Math.cos((this.pitch * (Math.PI / 180)));
        frontTemp[1] = Math.sin(this.pitch * (Math.PI / 180));
        frontTemp[2] = Math.sin(this.yaw * (Math.PI / 180)) * Math.cos(this.pitch * (Math.PI / 180));
        vec3.normalize(this.front, frontTemp);
        vec3.cross(this.right, this.front, this.worldUp);
        vec3.cross(this.up, this.right, this.front);
    }
    this.GetPosition = function() {
        return this.position;
    }
    this.GetViewMatrix = function() {
        var viewMatrix = new Float32Array(16);
        var frontPos = vec3.create();
        vec3.add(frontPos, this.position, this.front);
        return mat4.lookAt(viewMatrix, this.position, frontPos, [0, 1, 0]);
    }
    this.ProcessMouseMovement = function(event) {
        var xOffset = this.lastX - event.clientX;
        this.lastX = event.clientX;
        var yOffset = this.lastY - event.clientY;
        this.lastY = event.clientY;
        xOffset *= 0.05;
        yOffset *= 0.05;
        this.yaw -= xOffset;
        this.pitch += yOffset;

        if (this.pitch >= 89.0) {
            this.pitch = 89.0;
        } else if (this.pitch <= -89.0) {
            this.pitch = -89.0;
        }
        this.Update();
    }
    this.ProcessKeys = function() {
        if (keys["KeyW"]) {
            vec3.add(this.position, this.position, this.front);
        }
        if (keys["KeyS"]) {
            vec3.subtract(this.position, this.position, this.front);
        }
        if (keys["KeyA"]) {
            vec3.subtract(this.position, this.position, this.right);

        }
        if (keys["KeyD"]) {
            vec3.add(this.position, this.position, this.right);
            console.log(this.position);
        }
    }
}
