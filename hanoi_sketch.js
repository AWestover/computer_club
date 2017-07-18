// Alek Westover

var screen_dims = [200, 200];
var screen_color = [0, 0, 0];
var rings = 3;
var descending_rings = [];
for (var i = rings-1; i >= 0; i--) {
  descending_rings.push(i);
}
var state = [descending_rings, [], []];
var move_sequence = [state];//a list of states
var th = 3.141/2;
var ct = 0;
var place = 0;


function setup() {
  createCanvas(screen_dims[0], screen_dims[1], WEBGL);
  move_stack(2, 0, 0, state);
}


function draw() {
  frameRate(0.1);
  background(200);

  if (ct == 10) {
    if (place != move_sequence.length-1) {
        place += 1;
        ct = 0;
    }
  }
  if (ct == 30) {
    place = 0;
    ct = 0;
  }

  translate(-50, 0, 0);
  display_stack(move_sequence[place][0]);
  translate(50, 0, 0);
  display_stack(move_sequence[place][1]);
  translate(50, 0, 0);
  display_stack(move_sequence[place][2]);
  ct += 1;
}


//returns which pole is not yet taken so we can easily switch pole goals
function not_included(goal, current) {
  if (goal != 0 && current != 0) {
    return (0);
  }
  else if (goal != 1 && current != 1) {
    return (1);
  }
  else if (goal != 2 && current != 2) {
    return (2);
  }
}


// This recursive function is the crux of the program 
// example parrameters
// state = [[1,2,3], [4,5,6], [7,8,9]]
// goal = 1, current = 2, ring = 0 (index in array)
// no output, dirrectly modifies state
function move_stack(goal, current, ring, board_state) {
  if (ring + 1 != state[current].length) {// if not on top of the current stack -> 
    move_stack(not_included(goal, current), current, ring+1, board_state);//move stuff off 
    board_state[goal].push(board_state[current].pop()) // pop automaticly removes it
    move_sequence.push(board_state);
    move_stack(goal, not_included(goal, current), 0, board_state);//move the stuff we moved
  }
  else {// if it is on top move our ring to the goal
    board_state[goal].push(board_state[current].pop()) // pop automaticly removes it
    move_sequence.push(board_state);
  }
}


function display_stack(a_stack) {  //stack is state[X], an array
  rotateX(th);
  var mag_total = (rings+3)*(rings+4)*0.5;
  var mag_per = mag_total/(a_stack.length + 1);
  var mag_left = mag_total - mag_per * a_stack.length;
  translate(0, mag_total*cos(th)*0.5, mag_total*sin(th)*0.5);
  for (var i = 0; i < a_stack.length; i++){
    translate(0, -mag_per*cos(th), -mag_per*sin(th));
    torus(a_stack[i] + 2, a_stack[i] + 2);
  }
  translate(0, -mag_left*cos(th), -mag_left*sin(th));
  translate(0, mag_total*cos(th)*0.55, mag_total*sin(th)*0.55);
  rotateX(-th);
  cylinder(3, 100);
}

