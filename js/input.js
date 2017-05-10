var Input = {
	init: function(data){
		var self = this;

		$(window).on("keydown", function(event){
			self.helpers.down[event.keyCode] = true;

		});

		$(window).on("keyup", function(event){
            delete self.helpers.down[event.keyCode];
            delete self.helpers.pressed[event.keyCode];
            
        });

	},
    
    update: function(data){
        var jack = data.entities.jack;
        
        // if left arrow pressed
        if(Input.helpers.isDown(37)){
            if(jack.velY === 0 ){
                jack.currentState = jack.states.walking;
            }else{
                jack.x -= jack.velX;
            }
            
            jack.direction = "left";
        }
        
        // if right arrow pressed
        
        if(Input.helpers.isDown(39)){
            if(jack.velY === 0 ){
                jack.currentState = jack.states.walking;
            }else{
                jack.x += jack.velX;
            }
            jack.direction = "right";
        }
        
        // if up arrow pressed
        if(Input.helpers.isPressed(38)){
            jack.currentState = jack.states.jumping;
        }
    },

	helpers: {
		isDown: function(code){
			return Input.helpers.down[code];
		},

		isPressed: function(code){
			if(Input.helpers.pressed[code]){
				return false;
			}else if(Input.helpers.down[code]){
				return Input.helpers.pressed[code] = true;
			}

			return false;
		},

		down:{},
		pressed:{}

	}

};