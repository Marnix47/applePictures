new p5(function(c){
    var planets = [];
    c.setup = function(){
        c.angleMode(c.RADIANS)
        c.createCanvas(1920, 1080);
        planets.push(new Body("sun"))
        planets.push(new Body({color: "blue", radius: 30, speed: 2.5, distance: 300, parent: planets[0]}))
        planets.push(new Body({color:"brown", radius: 15, speed: 2.5, distance: 100, parent: planets[1]}))
        planets.push(new Body({color:"white", radius: 5, speed: 5, distance: 40, parent: planets[2]}))
        planets.push(new Body({color:"orange", radius: 3, speed: 3.5, distance: 20, parent: planets[3]}))
    }
    c.draw = function(){
        c.background("black")
        for(var planet of planets){
            planet.render();
        }
    }

    class Body{
        constructor(properties){
            //{color, radius, speed, distance}
            if(properties === "sun"){
                this.color = "yellow";
                this.radius = 50;
                this.distance = 0;
                this.angle = 0;
                this.center = {x: c.width / 2, y: c.height / 2};
                this.position = this.center;
            } else {
                this.color = properties.color;
                this.radius = properties.radius;
                this.speed = properties.speed;
                this.distance = properties.distance;
                this.center = properties.parent.position;
                this.parent = properties.parent
                this.angle = Math.random() * 2 * Math.PI;
            }
        }
        render(){
            if(this.distance !== 0){
                this.position = this.getPosition();
            }
            c.fill(this.color)
            c.ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius);
            this.angle += this.speed / 100
        }
        getPosition(){
            this.center = this.parent.position;
            var x = this.center.x + this.distance * Math.cos(this.angle);
            var y = this.center.y + this.distance * Math.sin(this.angle);
            return {x: x, y: y}
        }
    }
})

