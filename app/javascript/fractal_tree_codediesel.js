console.log("hello from fractal trees")
/*

    Algorithmic Tree - 1.0.0
    drawing trees algorithmically on the HTML5 canvas

    License       : GPL
    Developer     : Sameer Borate: http://codediesel.com
    Web Site      : http://codediesel.com

 */

var tree = {

    canvas:     '',
    ctx:        '',
    height:     0,
    width:      0,
    spread:     0.6,
    drawLeaves: true,
    leavesColor:'',
    leaveType:  this.MEDIUM_LEAVES,

    MAX_BRANCH_WIDTH:   20,
    SMALL_LEAVES:       10,
    MEDIUM_LEAVES:      200,
    BIG_LEAVES:         500,
    THIN_LEAVES:        900,

    /**
     * @member draw
     * tree.draw() initializes tthe tree structure
     *
     * @param {object} ctx      the canvas context
     * @param {integer} h       height of the canvas
     * @param {integer} w       width of the canvas
     * @param {float} spread    how much the tree branches are spread
     *                          Ranges from 0.3 - 1.
     * @param {boolean} leaves  draw leaves if set to true
     *
     */
    draw : function(ctx, h, w, spread, leaves, leaveType) {
        // Set how much the tree branches are spread
        if(spread >= 0.3 && spread <= 1) {
            this.spread = spread;
        }

        if(leaves === true || leaves === false) {
            this.drawLeaves = leaves;
        }

        if(leaveType == this.SMALL_LEAVES ||
           leaveType == this.MEDIUM_LEAVES ||
           leaveType == this.BIG_LEAVES ||
           leaveType == this.THIN_LEAVES) {
            this.leaveType = leaveType;
        }

        this.ctx = ctx;
        this.height = h;
        this.width = w;
        this.ctx.clearRect(0,0,this.width,this.height);
        // Center the tree in the window
        this.ctx.translate(this.width/2,this.height);
        // Set the leaves to a random color
        this.leavesColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        // Set branch thickness
        this.ctx.lineWidth = 1 + (Math.random() * this.MAX_BRANCH_WIDTH);
        this.ctx.lineJoin = 'round';

        this.branch(0);
    },

    /**
     * @member branch
     * tree.branch() main tree drawing function
     *
     * @param {String} depth the maimum depth the tree can branch,
     *        Keep this value near 12, larger value take linger to render.
     *
     */
    branch : function(depth) {
        if (depth < 12)
        {
            this.ctx.beginPath();
            this.ctx.moveTo(0,0); // Se centra el arbol ya que se habia transladado el punto de inicio
            this.ctx.lineTo(0,-(this.height)/10); // La primera branch, este es el tronco principal
            this.ctx.stroke(); // No se, en p5js esto se refiere darle color a la linea

            this.ctx.translate(0,-this.height/10); // El punto inicial de la proxima rama inicia en el punto final del tronco
            // Random integer from -0.1 to 0.1
            var randomN = -(Math.random() * 0.2) + 0.1; // Cada vez se crea un numero aleatorio desde -1 a 1

            this.ctx.rotate(randomN); // Rotacion de la rama

            // Aqui se dibuja el arbol, recuerde que el spread se refiere a lo que se extienden las ramas, a valores mas altos
            // arboles mas pequeños
            if ((Math.random() * 1) < this.spread)
            {
                // Draw the left branches
                this.ctx.rotate(-0.3); // Angulo negativo va hacia la izquierda
                this.ctx.scale(0.7,0.7);
                this.ctx.save(); // Este seria el push en el p5js
                this.branch(depth + 1); //Se suma 1, recuerde que este valor va hasta 12
                // Draw the right branches
                this.ctx.restore(); // Este seria el pop en el p5js
                this.ctx.rotate(0.6); // Angulo positivo, ramas hacia la derecha
                this.ctx.save(); // Push
                this.branch(depth + 1); // Se vuelve a llamar el metodo de la branch con 1 mas
                this.ctx.restore(); // Pop
            }
            else
            {
                this.branch(depth);
            }

        }
        else
        {
            // Now that we have done drawing branches, draw the leaves
            if(this.drawLeaves) {
                var lengthFactor = 200;
                if(this.leaveType === this.THIN_LEAVES) {
                    lengthFactor = 10;
                }
                this.ctx.fillStyle = this.leavesColor;
                this.ctx.fillRect(0, 0, this.leaveType, lengthFactor); // fillRect dibuja un rectangulo
                this.ctx.stroke();
            }
        }
    }
};
