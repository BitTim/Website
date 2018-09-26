const SCREEN_WIDTH = 400, SCREEN_HEIGHT = 400;
const map_width = 25, map_height = 25;

var mapdat = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

var tmpdat = [
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
];

const offset_x = [
  -1, 0, 1, 1, 1, 0, -1, -1
];

const offset_y = [
  -1, -1, -1, 0, 1, 1, 1, 0
];

var cell_x = 0, cell_x = 0;
var run = false;

function setup()
{
  var canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
	frameRate(10);
	canvas.parent('gol');	
  noStroke();
}

function update()
{
  for(var j = 0; j < map_height; j++)
  {
    for(var i = 0; i < map_width; i++)
    {
      var cnt = 0;
      
      for(var n = 0; n < 8; n++)
      {
        if(mapdat[(j + offset_y[n]) * map_width + i + offset_x[n]] === '#')
        {
          cnt++;
        }
      }
      
      if(cnt < 2 && mapdat[j * map_width + i] === '#')
      {
        tmpdat[j * map_width + i] = ' ';
      }
      else if(cnt > 3 && mapdat[j * map_width + i] === '#')
      {
        tmpdat[j * map_width + i] = ' ';
      }
      else if(cnt === 3 && mapdat[j * map_width + i] === ' ')
      {
        tmpdat[j * map_width + i] = '#';
      }
      else
      {
        tmpdat[j * map_width + i] = mapdat[j * map_width + i];
      }
    }
  }
  
  for(var j = 0; j < map_height; j++)
  {
    for(var i = 0; i < map_width; i++)
    {
      mapdat[j * map_width + i] = tmpdat[j * map_width + i];
    }
  }
}

var grid_floor = function(value, grid)
{
  return floor(value / grid) * grid;
}

function mouseClicked()
{
  if(mouseX > 0 && mouseX < SCREEN_WIDTH && mouseY > 0 && mouseY < SCREEN_HEIGHT)
  {
    cell_x = grid_floor(floor(mouseX / (SCREEN_WIDTH - 1) * map_width * map_width), map_width) / map_width;
    cell_y = grid_floor(floor(mouseY / (SCREEN_HEIGHT - 1) * map_height * map_height), map_height) / map_height;
    
    if(mapdat[cell_y * map_width + cell_x] === ' ')
    {
      mapdat[cell_y * map_width + cell_x] = '#';
    }
    else
    {
      mapdat[cell_y * map_width + cell_x] = ' ';
    }
  }
}

function keyPressed()
{
  if(key === 's')
  {
    update();
  }
}

function draw()
{
  if(keyIsPressed && keyCode === ENTER)
  {
    run = true;
  }
  
  if(keyIsPressed && keyCode === BACKSPACE)
  {
    run = false;
  }
  
  background(63);
  
  for(var j = 0; j < map_height; j++)
  {
    for(var i = 0; i < map_width; i++)
    {
      stroke(22);
      line(i * ((SCREEN_WIDTH) / map_width), 0, i * ((SCREEN_WIDTH) / map_width), SCREEN_HEIGHT);
      
      if(mapdat[j * map_width + i] === '#')
      {
        noStroke();
        fill(252, 63, 63);
        rect(i * ((SCREEN_WIDTH) / map_width) + 1, j * ((SCREEN_HEIGHT) / map_height) + 1, (SCREEN_WIDTH) / map_width, (SCREEN_HEIGHT) / map_height);
      }
    }
    
    stroke(22);
    line(0, j * ((SCREEN_HEIGHT) / map_height), SCREEN_WIDTH, j * ((SCREEN_HEIGHT) / map_height));
  }
  
  stroke(22);
  line(SCREEN_WIDTH - 1, 0, SCREEN_WIDTH - 1, SCREEN_HEIGHT);
  line(0, SCREEN_HEIGHT - 1, SCREEN_WIDTH, SCREEN_HEIGHT - 1);
  
  if(run)
  {
    update();
  }
}