class Ground{
    constructor(x,y,w,h){
        this.w = w;
        this.h = h;
        var op = {
            isStatic:true
        }
        this.body = Bodies.rectangle(x,y,w,h,op);
        World.add(world,this.body);
    }
    show(){
        var pos = this.body.position;
        push();
        rectMode(CENTER)
        noStroke();
        fill(140,60,60);
        rect(pos.x,pos.y,this.w,this.h);
        pop();
    }
}