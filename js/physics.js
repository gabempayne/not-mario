var Physics = {
    update: function(data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
          
    },
    
    collisionDetection: function(data){
      var jack = data.entities.jack;
        
        // determines whether or not collission occurs
        var entityCollisionCheck = function(entity){
            if (jack.x < entity.x + entity.w && 
                jack.x + jack.w > entity.x && 
                jack.y < entity.y + entity.h &&
                jack.h + jack.y > entity.y )  {
              
              Physics.handleCollision(data, entity);
            }
        };
        
        data.entities.wallsArray.forEach(function (wall){
           entityCollisionCheck(wall); 
        });
        data.entities.coinsArray.forEach(function (coin){
           entityCollisionCheck(coin); 
        });
        
        entityCollisionCheck(data.entities.exitPipe);
        
    },
    
    handleCollision: function(data, entity){
        var jack = data.entities.jack;
        var pipeSound = new Audio("audio/pipe.wav");
        
        if(entity.type === "wall"){
            // left side wall colllision
            if(jack.x < entity.x && jack.y >= entity.y){
                jack.x = entity.x - jack.w;
            }
            
            // right side wall collision
            if(jack.x > entity.x && jack.y >= entity.y){
                jack.x = entity.x + entity.w;
            }
            
            // top of wall collision
            if(jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&   
               jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0){
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
        
        if(entity.type === "coin"){
            var coinsArray = data.entities.coinsArray;
            var coinSound = entity.sound.cloneNode();
            var index = coinsArray.indexOf(entity);
            
            data.entities.score.value += 1;
            
            coinSound.play();
            coinsArray.splice(index, 1);
            
        }
        // exit pipe collision
        if(entity.type === "exitPipe"){
            // left side of exit pipe
           if (jack.x < entity.x && jack.y >= entity.y) {
                if (jack.velY === 0) {
                    pipeSound.play();
                    jack.x += 200;
                } else {
                    jack.x = entity.x - jack.w;
                }
            }

            //Right Side Pipe Collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }

            //Top of Pipe Collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 &&
                jack.x < (entity.x + entity.w) - 10 && jack.velY >= 0) {
                jack.currentState = jack.states.standing
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
    },
    
    helpers: {
        gravity: function(entity){
            entity.velY += 1.2;
            entity.y += entity.velY;
        }  
    },
};