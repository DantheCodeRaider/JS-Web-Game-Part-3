//Variable for inventory management
const inventory = newInventory();

//Variable for movement management
let charCoords = [100, 100, 10]; // Xpos, Ypos, Zpos 

//Variables to determine screen size for background images
let horizon = 0
if (window.innerHeight>800){
  horizon = window.innerHeight / 2
}
else {
  horizon = window.innerHeight / 1.5
}
let heightOfSky = window.innerHeight-horizon
let heightOfGrass = horizon + 100
let widthOfGrass = window.innerWidth

//Function for placing background images throughout the browser
function tile(ImgAssest, Xpos, Ypos, Zpos, width, height){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*100, Ypos + h*100, Zpos)
        }
    }
}

//Function for placing static images throughout the browser
function newImage (ImgAssest, Xpos, Ypos, Zpos) {
    let nImg = document.createElement('img')
    nImg.src = ImgAssest
    nImg.style.position = 'fixed'
    nImg.style.left = Xpos +'px'
    nImg.style.bottom = Ypos +'px'
    nImg.style.Zpos = Zpos
    document.body.append(nImg)
    return nImg
}

//Function for placing new items throughout the browser
function newItem (ImgAssest, Xpos, Ypos, Zpos) {
    let nItm = newImage (ImgAssest, Xpos, Ypos, Zpos)
    nItm.addEventListener('dblclick', function(){
        nItm.remove()
        let inventoryItem = document.createElement('img')
        inventoryItem.src = ImgAssest;
        inventory.append(inventoryItem)
    })
    return nItm
}

//Fucntion to maintain inventory space
function newInventory(){
    let inventory = document.createElement('div')
    inventory.style.position = 'fixed'
    inventory.style.bottom = '0px';
    inventory.style.left = '0px'
    inventory.style.width = '100%'
    inventory.style.height = '100px'
    inventory.style.display = 'flex'
    inventory.style.flexDirection = 'row'
    inventory.style.alignItems = 'center'
    inventory.style.justifyContent = 'space-evenly'
    inventory.style.border = '2px solid black'
    inventory.style.backgroundColor = 'brown'
    inventory.style.Zpos = '0'
    document.body.append(inventory)
    return inventory
}

//Function for moving assets around in the game
function moveChar(Xpos, Ypos, Zpos, cDir){
    charCoords[0] += Xpos //Update Xpos
    charCoords[1] += Ypos //Update Ypos
    charCoords[2] += Zpos //Update Zpos
    //Keep Character on the map West/East
    if (charCoords[0] < 0) {
        charCoords[0] = 0
    } else if (charCoords[0] >= widthOfGrass) {
        charCoords[0] = widthOfGrass - 50
    }
    //Keep Character on the map North/South
    if (charCoords[1] < 100) {
      charCoords[1] = 100
    } else if (charCoords[1] > heightOfGrass) {
      charCoords[1] = heightOfGrass 
    }
    /* Logs for bug testing 
    console.log(charCoords[0]+' Xpos');
    console.log(charCoords[1]+' Ypos');
    console.log(charCoords[2]+' Zpos'); */
    //let nImg = document.querySelector('[src="assets/green-character.gif"]');
    greenCharacter.style.left = charCoords[0]+'px';
    greenCharacter.style.bottom = charCoords[1] +'px';
    greenCharacter.style.Zpos = charCoords[2]
    // Switch case to change character model based on direction of travel
    switch (cDir) {
      // Update character model for moving North
      case "North":
        greenCharacter.src='assets/green-character/north.gif'
      break;
      // Update character model for moving South
      case "South":
        greenCharacter.src='assets/green-character/south.gif'
      break;
      // Update character model for moving East
      case "East":
        greenCharacter.src='assets/green-character/east.gif'
      break;
      // Update character model for moving West
      case "West":
        greenCharacter.src='assets/green-character/west.gif'
      break;
      // Update character model for static
      case null:
        greenCharacter.src='assets/green-character/static.gif'
      break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Update Character
    document.body.append(greenCharacter)
}

//Call background image function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos, Width, Height)
tile('assets/sky.png', 0, horizon, 0, window.innerWidth/100, heightOfSky/100)
tile('assets/grass.png', 0, 100, 0, window.innerWidth/100, horizon/100)

//Call new Image function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos)
const greenCharacter = newImage('assets/green-character/static.gif', charCoords[0], charCoords[1], charCoords[2]) //Set Green Character Object & intial load
newImage('assets/pine-tree.png', 450, 200, 1) //Add Pine Tree
newImage('assets/tree.png', 200, 300, 1) //Add a Tree
newImage('assets/pillar.png', 350, 100, 1) //Add a Pillar
newImage('assets/crate.png', 150, 200, 1) //Add a Crate
newImage('assets/well.png', 500, 450, 1) //Add a Well

//Call new Item function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos)
newItem('assets/sword.png', 500, 400, 5) //Add a Sword
newItem('assets/shield.png', 200, 200, 5) //Add a Shield
newItem('assets/staff.png', 600, 100, 5) //Add a Staff

//Event listener to move the Green Character
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
      // Code for "down arrow" key press.
      case "ArrowDown":
           moveChar(0, -50, 0, 'South') // Move Green Character Down (South)
        break;
        // Code for "S" key press.
        case "S":
          moveChar(0, -50, 0, 'South') // Move Green Character Down (South)
       break;
       // Code for "s" key press.
        case "s":
          moveChar(0, -50, 0, 'South') // Move Green Character Down (South)
       break;
      case "ArrowUp":
        // Code for "up arrow" key press.
        moveChar(0, 50, 0, 'North') // Move Green Character Up (North)
        break;
        case "W":
          // Code for "W" key press.
          moveChar(0, 50, 0, 'North') // Move Green Character Up (North)
          break;
          case "w":
            // Code for "w" key press.
            moveChar(0, 50, 0, 'North') // Move Green Character Up (North)
            break;
      case "ArrowLeft":
        // Code for "left arrow" key press.
        moveChar(-50, 0, 0, 'West') // Move Green Character Left (West)
        break;
        case "A":
          // Code for "A" key press.
          moveChar(-50, 0, 0, 'West') // Move Green Character Left (West)
          break;
          case "a":
            // Code for "a" key press.
            moveChar(-50, 0, 0, 'West') // Move Green Character Left (West)
            break;
      case "ArrowRight":
        // Code for "right arrow" key press.
        moveChar(50, 0, 0, 'East') // Move Green Character Right (East)
        break;
        case "D":
          // Code for "D" key press.
          moveChar(50, 0, 0, 'East') // Move Green Character Right (East)
          break;
          case "d":
            // Code for "d" key press.
            moveChar(50, 0, 0, 'East') // Move Green Character Right (East)
            break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // The last option dispatches the event to the listener first,
  // Then dispatches event to window

  document.addEventListener('keyup',function(event){
     moveChar(0, 0, 0, null) // Reset Character to static state when it is not moving
  })







