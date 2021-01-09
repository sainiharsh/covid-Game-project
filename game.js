function load_images(){
    //player,virus and gem..
    Enemy_img = new Image;
    Enemy_img.src = "source/v1.png";

    enemy_img = new Image;
    enemy_img.src = "source/v2.png"

    Player_img = new Image;
    Player_img.src = "source/superhero.png";

    Gem_img = new Image;
    Gem_img.src = "source/gemm.png";

}


function init(){
    //object definition
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 1200;
    H = 400;

    canvas.width = W;
    canvas.height = H;

    ctx = canvas.getContext('2d');
    console.log(ctx);
    game_over = false;

    E1 = {
        x:150,
        y:50,
        w:60,
        h:60,
        speed:15,
    };
    
    E2 = {
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30,
    };

    E3 = {
        x:450,
        y:20,
        w:60,
        h:60,
        speed:45,
    };

    Enemy = [E1,E2,E3];

    e1 = {
		x : 600,
		y : 50,
		w : 60,
		h : 60,
		speed : 60,
	};
	e2 = {
		x : 750,
		y : 150,
		w : 60,
		h : 60,
		speed : 75,
	};
	e3 = {
		x : 900,
		y : 20,
		w : 60,
		h : 60,
		speed : 90,
	};
    
    enemy = [e1,e2,e3];

    Player = {
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100,
    };

    Gem = {
        x:W-110,
        y:H/2,
        w:60,
        h:60,
    };
    
    // events on canvas
    canvas.addEventListener('mousedown',function(){
        console.log("Mouse Pressed");
        Player.moving = true;
    });

    canvas.addEventListener('mouseup',function(){
        console.log("Mouse Released");
        Player.moving = false;
    });

}


function overlap(num1,num2){
    if(num1.x < num2.x + num2.w && num1.x + num1.w > num2.x && num1.y < num2.y + num2.h && num1.y + num1.h > num2.y){
        return true;
    }
    return false;
}


function draw(){

    //clear the canvas area for the old one
    ctx.clearRect(0,0,W,H);
    
    ctx.fillStyle  = "red";
    //draw the player
    ctx.drawImage(Player_img,Player.x,Player.y,Player.w,Player.h);
    // draw the gem
    ctx.drawImage(Gem_img,Gem.x,Gem.y,Gem.w,Gem.h);

    for(let i=0;i<Enemy.length;i++){
        ctx.drawImage(Enemy_img,Enemy[i].x,Enemy[i].y,Enemy[i].w,Enemy[i].h);
    }
    
    for(let i=0;i<enemy.length;i++){
        ctx.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana"
    ctx.fillText("Score "+Player.health,10,30);
}

function Update(){
    // if player is moving
    if(Player.moving == true){
        Player.x += Player.speed;
        Player.health += 20;
    }

    for(let i=0;i<Enemy.length;i++){
        if(overlap(Enemy[i],Player)){
            Player.health -= 50;
            if(Player.health < 0){
                console.log(Player.health);
                game_over = true;
                alert("Game Over "+Player.health);
                return;
            }
        }
    }

    for(let i=0;i<enemy.length;i++){
        if(overlap(enemy[i],Player)){
            Player.health -= 100;
            if(Player.health < 0){
                console.log(Player.health);
                game_over = true;
                alert("Game Over"+Player.health);
                return;
            }
        }
    }
    
    if(overlap(Player,Gem)){
        
        console.log("You cleared!");
        
        game_over = true;
        return ;
    }


    for(let i = 0;i<Enemy.length;i++){
        Enemy[i].y += Enemy[i].speed;
        if(Enemy[i].y > H-Enemy[i].h || Enemy[i].y<0){
            Enemy[i].speed *= -1;
        }
    }
    for(let i = 0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y > H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed *= -1;
        }
    }

}

function gameloop(){    
   
    if(game_over==true){
        if(overlap(Player,Gem)){
            alert("You Won the Game Challenge "+Player.health);
        }
        clearInterval(f);
    }
    console.log("in gameloop");
    draw();
    Update();
    
}

load_images();
init();
var f = setInterval(gameloop,100);