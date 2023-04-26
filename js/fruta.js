class Fruta{
    constructor(){
        
        this.img = loadImage("assets/melon.png");
        this.body = Bodies.circle(300,300,25);
        World.add(world,this.body)
        
    }

    show(){
        var pos = this.body.position
        image(this.img,pos.x,pos.y,80,80);
    }
}