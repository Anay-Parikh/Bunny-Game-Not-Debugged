class Link {
    constructor(bodyA, bodyB) {
        var lastLink = bodyA.body.bodies.length - 2;
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[lastLink],
            bodyB: bodyB,
            pointA: {x: 0, y: 0},
            pointB: {x: 0, y: 0},
            stiffness: 0.01,
            length: -10
        })

        World.add(world, this.link)
    }

    detach() {
        World.remove(world, this.link);
    }
}