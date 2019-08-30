//**----------------------------canvas with circular disc animation-----------------------***** /

    // Initial Setup
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

   
    
      const mouse = {
        x:innerWidth/5,
        y:innerHeight/2.5 
       };

       if(innerWidth<=768){
        mouse.x=innerWidth/3.5,
        mouse.y=innerHeight/3.2
   }

       if(innerWidth<=480){
        mouse.x=innerWidth/2,
        mouse.y=innerHeight/1.65
   }
    
    
    // Variables
  
    //color of the circle
    const colors = [
    'grey',
    '266da7',
    'slategrey'];
    
    
    
    // Event Listeners
    addEventListener('mousemove', event => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });
    
    addEventListener('resize', () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    
      init();
    });
    
    
    // Utility Functions
    function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    
    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    
    // Objects
    function Particle(x, y, radius, color) {

      let vardistance;
      
      if(innerWidth<=480){
        vardistance = randomIntFromRange(innerHeight/12, innerHeight/5);
      }
      else if(innerWidth<=768){
        vardistance = randomIntFromRange(innerHeight/10, innerHeight/6);
      }
      else{
         vardistance = randomIntFromRange(innerWidth/16, innerWidth/7.5);
      }

      const distance = vardistance;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.radians = Math.random() * Math.PI * 2;
      this.velocity = 0.045;
      this.distanceFromCenter = {
        x: distance,
        y: distance };
    
      this.prevDistanceFromCenter = {
        x: distance,
        y: distance };
    
      this.lastMouse = { x: x, y: y };
    
      this.update = () => {
        const lastPoint = { x: this.x, y: this.y };
        // Move points over time
        this.radians += this.velocity;
    
        // Drag effect
         this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
         this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    
         //Circular Motion
          this.distanceFromCenter.x = this.prevDistanceFromCenter.x + Math.sin(this.radians) ;
         this.distanceFromCenter.y = this.prevDistanceFromCenter.x + Math.sin(this.radians) ;
    
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;
    
        this.draw(lastPoint);
      };
    
      this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
      };
    }
    
    
    // Implementation
    let particles;
    function init() {
      particles = [];
    
      for (let i = 0; i < 60; i++) {
        if(innerWidth<=420 || innerHeight <=420){
          // const radius = (Math.random() * 1) + 0.2;
          // particles.push(new Particle(25, 25, radius, randomColor(colors)));
        }
        
        else{
          const radius = (Math.random() * 1) + 1;
          particles.push(new Particle(25, 25, radius, randomColor(colors)));
        }
       
      }
    }
    
    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      c.fillStyle = 'rgba(246, 192, 20, 0.06)'; 
      c.fillRect(0, 0, canvas.width, canvas.height);
    
      particles.forEach(particle => {
        particle.update();
      });
    }
    
    init();
    animate();
  