var button;
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
var win = gui.Window.get();
function setup()
{
  createCanvas(400, 400);
	console.log('Your message')	
	background(220);
	colorMode(HSB);
	
	bar = new ProgressBar(10,10,200,10,"Hue",30,0,360);
	bar2 = new ProgressBar(10,30,200,10);
	bar3 = new ProgressBar(10,50,200,10);

  	button = createButton('submit');  
  	button.mousePressed(greet);	
  	button.position(220,30);
}

function greet() {
	win.showDevTools();
  }
var globalCapture = false;
class ProgressBar
{
	constructor(x,y,w,h,label,labelWidth,_min=0,_max = 100)
	{		
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pos = 50;
		this.capture = false;
		this.label = label;
		if(labelWidth >=w) labelWidth = 0;
		this.labelWidth = labelWidth;
		this._min = _min;
		this._max = _max;
		
	}
	
	Capture()
	{
		if((mouseX > this.x+1) && (mouseX < this.x+this.w-1)
				&& (mouseY > this.y+1) && (mouseY < this.y+this.h-1) && mouseIsPressed && globalCapture == false)
			{
				this.capture = true;
				globalCapture = true;
			}
		
		if(mouseIsPressed == false)
		{
			this.capture = false;
			globalCapture = false;
		}
		
		return this.capture;
	}
	
	
	Draw()
	{
			fill(255);
            stroke(0);
            fill(34);
			rect(this.x,this.y,this.w,this.h);
			if(this.Capture())
			{
				this.pos = mouseX - this.x;
				if(this.pos> this.w) this.pos = this.w;
				if(this.pos < 0) this.pos = 0;
				this.pos = map(this.pos,0,this.w,this._min,this._max);				
			}
				fill(120,255,255);				
				var pos2 = map(this.pos,this._min,this._max,0,this.w);			
				rect(this.x,this.y,pos2,this.h);
	}	
}

a = 0;
function draw()
{	
	background(bar.pos,bar2.pos, bar3.pos);  	
	bar.Draw();	
	bar2.Draw();	
	bar3.Draw();	
}