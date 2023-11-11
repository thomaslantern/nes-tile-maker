<!-- Begin
// NES Tile Maker
// ©2023 by Thomas Wesley Scott


// Set entryPoint for the javascript app
const entryPoint = document.getElementById("javascript");


// CLASSES:


// 1) Pixel:
// - essentially an svg <rect> element of one NES colour
class Pixel {
	constructor(width = pxWidth, colour){
		this.width = width;
		this.colour = colour;
	}
}


// 2) Tableau:
class Tableau {
	constructor(id, tileSet, width, height, depth, activeTile, columnSpace, 
				activeHighlight, noLayers, showForeground, hasGridlines)
	{
		this.id = id;
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.columnSpace = columnSpace;
		this.hasGridlines = hasGridlines;
		this.activeHighlight = activeHighlight;
		this.noLayers = noLayers;
		this.showForeground = showForeground;
		
		// Begin creating the activeTile for the Tableau:
		// (I learned how to do this from: 
		// https://stackoverflow.com/questions/55206823/how-to-create-a-valid-svg-element-with-javascript)
		this.activeTile = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		// Height and width are set to pxWidth + 1 because otherwise
		// there are gaps between Pixels - we don't want that!
		// This allows for a small overlap that is unnoticable,
		// and solves this problem:
		this.activeTile.setAttribute("width", pxWidth + 1);
		this.activeTile.setAttribute("height", pxWidth + 1);
		this.activeTile.setAttribute("stroke-width", 5);
		this.activeTile.setAttribute("id", id + "Highlight");
		this.activeTile.setAttribute("class", "colour1");
		// Set x and y relative to selected coordinates in
		// activeTile multiplied by the width of the Pixel
		// objects, and the gap between them
		const activeX = activeTile[0] * (pxWidth + columnSpace);
		const activeY = activeTile[1] * (pxWidth + columnSpace);
		this.activeTile.setAttribute("x", activeX);
		this.activeTile.setAttribute("y", activeY);
		
		// Give our highlighted tile a red outline
		// if we want to see it
		if (activeHighlight == true) {
			// figure out x,y coordinate for activeTile
			this.activeTile.setAttribute("stroke", "red");
		}

		// Create gridlines if set to true. To do this, we
		// use the following algorithm:
		// 1) As long as our pathIndex is less than width,
		// draw a line equal to the width of the grid, vertically
		// and do the same thing horizontally.
		// 2) Keep moving over one column/row, until we've
		// exhausted all rows/columns (and our grid is a square,
		// so this happens at the same time).
		// 3) Add them together as one path, which essentially
		// crisscrosses in between all of the Pixels.
		if (hasGridlines == true) {
			
			// make SVG for the gridlines
			this.gridLines = document.createElementNS("http://www.w3.org/2000/svg", "path");

			// Build the path for gridlines
			const totalWidth = width * pxWidth + (columnSpace * (width - 1));
			let path = "M0 0 L" + totalWidth + " 0" +
								" L" + totalWidth + " " + totalWidth +
								" L0 " + totalWidth + " L0 0";
			let path2 = path;
			let pathIndex = 0;
			let currentHeight = 0;
			let currentGap = 0;
			let goingRight = true;
			let currentX = 0;
			while (pathIndex < width) {
				if (goingRight == true) {
					path += " L" + totalWidth + " " + currentHeight;
					path2 += " L" + currentHeight + " " + totalWidth;
					currentX = totalWidth;
				} else {
					path += " L0 " + currentHeight;
					path2 += " L" + currentHeight + " " + "0";
					currentX = 0;
				}
				goingRight = !goingRight;
				currentGap += 1;
				

				if ((currentGap >= columnSpace) || 
						(pathIndex == 0)) {
					currentHeight += pxWidth;
					path += " L" + currentX + " " + currentHeight;
					path2 += " L" + currentHeight + " " + currentX;
					currentGap = 0;
					pathIndex += 1;
				} else {
					currentHeight += 1;
				}
			}
			// Add all of path2 (the inverted path) to path
			// thereby crossing all rows and columns with lines
			path += path2;
			this.gridLines.setAttribute("d",path);
			
			// Colour all gridlines black, make path transparent				
			this.gridLines.setAttribute("stroke","black");
			this.gridLines.setAttribute("fill","none");
			// Id will be used to "turn off" gridlines when necessary
			this.gridLines.setAttribute("id",id + "gridlines");
		}

		
		
		// Start building the Svg for the tableau
		const makeSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		// Tableau width is based on pxWidth and tileGap:
		// pxWidth * width + tileGap * (width - 1)
		const svgWidth = pxWidth * width +  tileGap * (width - 1);
		// Similar for height:
		// pxWidth * height + tileGap * (height - 1)
		const svgHeight = pxWidth * height + tileGap * (height - 1);
		makeSvg.setAttribute("width", svgWidth);
		makeSvg.setAttribute("height", svgHeight);
		makeSvg.setAttribute("id", id);
	

		// Add tiles/pixels to Tableau:
		const tileNum = tileSet.length;
		for (let i = 0; i < tileNum; i++){
			
			
			const nextTile = tileSet[i];
			const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			
			// get the base x and y coordinates, 
			// based on index in list

			let y = Math.floor(i / width);
			let x = i % width;

			// then multiply them out based on 
			// pxWidth and columnSpace for
			// true x and y values
			x = pxWidth * x +  columnSpace * x;
			y = pxWidth * y +  columnSpace * y;


			newRect.setAttribute("x", x);
			newRect.setAttribute("y", y);
			// Set colour based on colour in Pixel
			newRect.setAttribute("fill", nextTile.colour);
			
			// Height and width are set to pxWidth + 1 because otherwise
			// there are gaps between Pixels - we don't want that!
			// This allows for a small overlap that is unnoticable,
			// and solves this problem:
			newRect.setAttribute("width", pxWidth+1);
			newRect.setAttribute("height", pxWidth+1);
			newRect.setAttribute("id", id + i)
			
			// Here we initialize class for each Pixel/rect 
			// based on colour. Each Pixel in playerPal Tableau
			// needs to be a different colour (based on that NES
			// palette), so each will have a unique class. The
			// spriteTableau starts out blank, which is why we
			// just assign colour1 to each Tile. Otherwise, we
			// assume every Pixel is a different colour and assign
			// classes based on our index i.
			if (this.id == "playerPal") {
				newRect.setAttribute("class", "colour" + (i + 1));
			} else if (this.id == "spriteTableau"){
				newRect.setAttribute("class", "colour1");
			} else {
				newRect.setAttribute("class", "colour" + i);
			}
			
			// Every time we click on a Pixel, we want to
			// do three things:
			// 1) Change the active tile to whatever we
			// clicked on.
			// 2) Paint that active tile (if appropriate).
			// 3) Update our code in our textarea.
			newRect.addEventListener("click", event => {
				changeActiveTile();
				paintTile();
				updateCode();
			});
			
			// Append every Pixel to its parent Svg element:
			makeSvg.appendChild(newRect);
		} // end of for loop (loop of all Pixels)

		// Find the colour of the tile underneath activeTile,
		// and set the activeTile to that colour (not doing so
		// leads to problems where the activeTile has a different
		// colour than the Pixel underneath)
		const activeIndex = activeTile[0] + (activeTile[1] * 8);
		const activeColour = tileSet[activeIndex].colour;
		this.activeTile.setAttribute("fill", activeColour);
		// Set same event to activeTile as other Pixels:
		this.activeTile.addEventListener("click", event => {
				changeActiveTile();
				paintTile();
				updateCode();
			});

		// Append the activeTile to the Svg parent
		makeSvg.appendChild(this.activeTile);
		// If we want gridlines, append them as well:
		if (hasGridlines == true) {
			makeSvg.appendChild(this.gridLines);
		}
		// Lastly, append the Svg parent to our entryPoint
		entryPoint.appendChild(makeSvg);
	}
}


// VARIABLES:


// Constants dealing with sizes of Pixels
// and spaces in between them
const pxWidth = 50;
const tileGap = 5;


// Palette of all the NES colours, hex number is NES Hex code, second number hex code for html
const NESPalette = [{"$00":"#656565"}, {"$01":"#002D69"}, {"$02":"#131F7F"}, {"$03":"#3C137C"},
					{"$04":"#600B62"}, {"$05":"#730A37"}, {"$06":"#710F07"}, {"$07":"#5A1A00"},
					{"$08":"#342800"}, {"$09":"#0B3400"}, {"$0A":"#003C00"}, {"$0B":"#003D10"},
					{"$0C":"#003840"}, {"$0F":"#000000"}, {"$0E":"#000000"}, {"$0F":"#000000"},
					{"$10":"#AEAEAE"}, {"$11":"#0F63B3"}, {"$12":"#4051D0"}, {"$13":"#7841CC"},
					{"$14":"#A736A9"}, {"$15":"#C03470"}, {"$16":"#BD3C30"}, {"$17":"#9F4A00"},
					{"$18":"#6D5C00"}, {"$19":"#366D00"}, {"$1A":"#077704"}, {"$1B":"#00793D"},
					{"$1C":"#00727D"}, {"$1D":"#000000"}, {"$1E":"#000000"}, {"$1F":"#000000"},
					{"$20":"#FFFFFF"}, {"$21":"#5DB3FF"}, {"$22":"#8FA1FF"}, {"$23":"#C890FF"},
					{"$24":"#F785FA"}, {"$25":"#FF83C0"}, {"$26":"#FF8B7F"}, {"$27":"#EF9A49"},
					{"$28":"#BDAC2C"}, {"$29":"#85BC2F"}, {"$2A":"#55C753"}, {"$2B":"#3CC98C"},
					{"$2C":"#3EC2CD"}, {"$2D":"#4E4E4E"}, {"$2E":"#000000"}, {"$2F":"#000000"},
					{"$30":"#FFFFFF"}, {"$31":"#BCDFFF"}, {"$32":"#D1D8FF"}, {"$33":"#E1D8FF"},
					{"$34":"#FBCDFD"}, {"$35":"#FFCCE5"}, {"$36":"#FFCFCA"}, {"$37":"#F8D5B4"},
					{"$38":"#E4DCA8"}, {"$39":"#CCE3A9"}, {"$3A":"#B9E8B8"}, {"$3B":"#AEE8D0"},
					{"$3C":"#AFE5EA"}, {"$3D":"#B6B6B6"}, {"$3E":"#000000"}, {"$3F":"#000000"}];


// makeBlankTiles: returns an array of length 
// amount of "blank" (white) Tiles/Pixels
// Used to initialize arrays of Pixels for
// several Tableaus.
function makeBlankTiles(amount) {
	const blankTiles = [];
	
	// Make every item in the array a "blank" Pixel
	for (let i = 0; i < amount; i++) {
		blankTiles.push(new Pixel(pxWidth, "#FFFFFF"));
	}
	return blankTiles;
}

// Build the Pixels from NESPalette:
NESPalettePixels = [];
// Code inspired by the answer to the following question:
// https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
for (let i = 0; i < NESPalette.length; i++){
  const obj = NESPalette[i];
  for (let key in obj){
    const value = obj[key];
    NESPalettePixels.push(new Pixel(pxWidth, value));
  }
}



// consts used only to make Tableau
// declaration more readable:
const yesHighlight = true;
const noHighlight = false;
const noToLayers = true;
const foregroundVisible = true;
const yesGridlines = true;
const noGridlines = false;

entryPoint.style.display = "grid";
entryPoint.style.gridTemplateColumns = "auto auto auto";
entryPoint.style.gridGap = "15px";



const NESPaletteTitle = document.createElement("label");
NESPaletteTitle.innerHTML = "NES Palette";
entryPoint.appendChild(NESPaletteTitle);

const playerPalTitle = document.createElement("label");
playerPalTitle.innerHTML = "Player Palette";
entryPoint.appendChild(playerPalTitle);

const spriteTableauTitle = document.createElement("label");
spriteTableauTitle.innerHTML = "Sprite Tiles";
entryPoint.appendChild(spriteTableauTitle);


// fullNESPal: Tableau containing every palette of every NES colour
const fullNESPal = 
new Tableau("fullNESPal", NESPalettePixels, 8, 8, 1, [0,4], tileGap,
yesHighlight, noToLayers, foregroundVisible, noGridlines);




// playerPal: Tableau containing the four colours user has chosen
// to draw his tile
const playerPalPixels = makeBlankTiles(4);
const playerPal = 
new Tableau("playerPal", playerPalPixels, 4, 1, 1, [0,0], tileGap,
yesHighlight, noToLayers, foregroundVisible, noGridlines);


// spriteName - input that contains the name
// of the sprite (chosen/edited by user)
const spriteName = document.createElement("input");
spriteName.type = "text";
spriteName.style.height = "2.5em";
spriteName.style.backgroundColor = "white";
spriteName.placeholder = "(Enter Sprite Name Here)";
spriteName.borderRadius = "3px";
spriteName.addEventListener("change", updateCode);




// spriteTableau: Tableau for drawing on;
// Initializes as empty (white Pixels).
const spritePalPixels = makeBlankTiles(64);
const spriteTableau = 
new Tableau("spriteTableau", spritePalPixels, 8, 8, 1, [0,0], 0,
noHighlight, noToLayers, foregroundVisible, yesGridlines);


// showGridLines - checkBox that turns 
// on/off gridlines for spriteTableau
const showGridLines = document.createElement("input");
showGridLines.type = "checkbox";
showGridLines.id = "enableGrid";

// Start out checked because gridlines
// start out visible
showGridLines.checked = true;
// Clicking the checkbox turns on/off gridlines:
showGridLines.addEventListener("click", configureGridLines);


// Create label for checkbox
const showGridLinesText = document.createElement("label");
showGridLinesText.innerHTML = "Enable/Disable Gridlines";
showGridLinesText.for = "enableGrid";



// codeText: Text area for ASM6502 code for user
const codeText = document.createElement("textarea");
codeText.innerHTML = "(Code to paste in will appear here.)";
// Set to read-only so user can't edit text destined
// for ASM6502 programming!
codeText.readOnly = true;
// Adding id, title for use with jQuery tooltips
codeText.id = "text-tooltip";
let codeTitle = "This is where your ASM6502 code appears after drawing to the screen. Pressing ";
codeTitle += "the reset button will restart the screen, and the code in this box will reset. ";
codeTitle += "Pressing the Copy Text button will copy the code to your clipboard, so you can put it ";
codeTitle += "in your .asm file.";
codeText.title = codeTitle;



// resetButton - button that allows user to reset 
// spriteTableau (their custom sprite drawing)
const resetButton = document.createElement("input");
resetButton.type = "submit";
resetButton.style.margin = "20px";
resetButton.value = "Reset Sprite";
resetButton.onclick = confirmReset;
// Adding id, title for use with jQuery tooltips
resetButton.id = "reset-tooltip";
resetButton.title = "CAUTION: Pressing this button will reset any changes you've made to the screen!";


// clipboardCopy - button that copies text 
// from codeText into the clipboard
const clipboardCopy = document.createElement("input");
clipboardCopy.type = "submit";
clipboardCopy.style.margin = "20px";
clipboardCopy.value = "Copy Text";
clipboardCopy.onclick = copyCodeToClipboard;
// Adding id, title for use with jQuery tooltips
clipboardCopy.id = "copy-tooltip";
clipboardCopy.title = "Pressing this button copies your code to the clipboard.";

// Append all new html elements to entryPoint:
entryPoint.appendChild(spriteName);
entryPoint.appendChild(showGridLinesText);
entryPoint.appendChild(resetButton);
entryPoint.appendChild(codeText);
entryPoint.appendChild(showGridLines);
entryPoint.appendChild(clipboardCopy);



// changeActiveTile: change activeTile
// coordinates to wherever the user clicks
function changeActiveTile() {
	
	// Find the parent Svg element
	const parentId = event.target.parentElement.getAttribute("id"); 
	
	// Find the highlight tile of this Tableau
	const currentActiveTile = document.getElementById(parentId + "Highlight");
	
	// Get the x and y coordinates of click
	const clickX = event.target.getAttribute("x");
	const clickY = event.target.getAttribute("y");
	
	// Get the colour and class of the Pixel clicked on
	const newColour = event.target.getAttribute("fill");
	const newClass = "colour" + (clickX / (pxWidth + tileGap) + 1);
	
	// Set new coordinates of highlight tile, 
	// and fill it with the colour of Pixel underneath;
	// change the class so new coordinates are embedded in class:
	currentActiveTile.setAttribute("x", clickX);
	currentActiveTile.setAttribute("y", clickY);
	currentActiveTile.setAttribute("fill", newColour);
	currentActiveTile.setAttribute("class", newClass);
}


// paintTile: paints the selected Tile the 
// colour of a particular Tableau's activeTile
function paintTile() {
	
	// Get the current target and its parent:
	const currentTarget = event.target;
	const parent = currentTarget.parentElement.getAttribute("id");
	
	switch(parent) {
		// User clicked on the spriteTableau
		// aka where they are drawing
		case "spriteTableau":
			// Get the active tile of player palette:
			const paletteHighlight = document.getElementById("playerPalHighlight");
			// Get the class and colour of that Pixel:
			const desiredClass = paletteHighlight.getAttribute("class");
			const paintColour = paletteHighlight.getAttribute("fill");
			// Set the clicked on Tile to that colour and class
			currentTarget.setAttribute("fill", paintColour);
			currentTarget.setAttribute("class", desiredClass);
			// If currentTarget is highlight tile, 
			// you need to paint the tile underneath, too!
			if (currentTarget.id == "spriteTableauHighlight") {
				// Grab all of the Pixels
				const spriteTiles = document.getElementsByTagName("rect");
				// Loop through and find the one that has the same
				// x and y value, I.e., underneath our highlighted Pixel:
				for(let i = 0; i < spriteTiles.length; i++) {
					const currentTile = spriteTiles[i];
					const tileX = currentTile.getAttribute("x");
					const tileY = currentTile.getAttribute("y");
					const targetX = currentTarget.getAttribute("x");
					const targetY = currentTarget.getAttribute("y");

					// If they're the same location, paint the tile underneat:
					if ((currentTile.parentElement.id == "spriteTableau") &&
							(tileX == targetX) && (tileY == targetY)) {
						currentTile.setAttribute("fill", paintColour);
						currentTile.setAttribute("class", desiredClass);
					}
				} // End for loop through rect elements
			} // End check for Pixel underneath
			
			// Make sure highlight tile is coloured in, too.
			const parentTableau = document.getElementById(parent);
			const parentHighlight = document.getElementById(parent + "Highlight");
			parentHighlight.setAttribute("fill", paintColour);

			break;

		// User clicked on NES palette, so put 
		// that colour on playerPal activeTile
		case "fullNESPal":

			// Find the highlighted tile
			const NESPalHighlight = document.getElementById("fullNESPalHighlight");
			// Find its x and y coordinates
			let NESPalY = NESPalHighlight.getAttribute("y");
			NESPalX = NESPalHighlight.getAttribute("x");
			// Get the index of that colour by calling desiredNESIndex:
			const desiredNESIndex = getTileIndex(fullNESPal.width, fullNESPal.height, 
																			fullNESPal.columnSpace, pxWidth, 
																			fullNESPal.id, NESPalX, NESPalY);

			// Get the Pixel with the id containing desired coordinates:
			const desiredNESTile = document.getElementById("fullNESPal" + desiredNESIndex);
			// Get the colour of that Pixel:
			const desiredColour = desiredNESTile.getAttribute("fill");
			
			// Find the highlighted Pixel in player palette,
			// and follow similar procedures for x, y coordinates and index
			const playerPalHighlight = document.getElementById("playerPalHighlight")
			const playerPalX = playerPalHighlight.getAttribute("x");
			playerPalHighlight.setAttribute("fill", desiredColour);
			const playerPalY = playerPalHighlight.getAttribute("y");
			
			const desiredIndex = getTileIndex(playerPal.width, playerPal.height, 
																			playerPal.columnSpace, pxWidth, 
																			playerPal.id, playerPalX, playerPalY);
			
			// Get the tile whose colour we want to change:
			const desiredTile = document.getElementById("playerPal" + desiredIndex);

			// Change the colour:
			desiredTile.setAttribute("fill", desiredColour);


			// This loop below ensures that every tile in spriteTableau
			// that is supposed to be same colour as playerPal gets
			// coloured the same. So if spriteTableau was all green (colour1),
			// but then colour1 changed to blue, we'd want to make all of the
			// green tiles blue.
			
			// But before we loop:
			// Get the class of the colour based on index of playerPal
			comparableColour = "colour" + (desiredIndex + 1);
			// collect all elements with that colour as class
			const spriteCompareColour = document.getElementsByClassName(comparableColour);

			
			// Now, the loop:
			for(let i = 0; i < spriteCompareColour.length; i++){
				const currentElement = spriteCompareColour[i];
				// if currentElement not in fullNESPal,
				// give it the new colour:
				if (currentElement.parentElement.id != "fullNESPal") {
					currentElement.setAttribute("fill", desiredColour);
				}
				// Set the highlight of spriteTableau to the same colour,
				// if the highlight is one of the affected Pixels:
				const highlightX = spriteTableau.activeTile.getAttribute("x");
				const highlightY = spriteTableau.activeTile.getAttribute("y");
				if ((highlightX == currentElement.getAttribute("x")) &&
						(highlightY == currentElement.getAttribute("y"))) {
					spriteTableau.activeTile.setAttribute("fill", desiredColour);
					spriteTableau.activeTile.setAttribute("class", comparableColour);
				}
			} // end for loop
			

			break;
		
		// Clicking on user's palette
		// should not paint anything
		case "playerPal":
			break;

		default:
			alert("This shouldn't happen!");
		}
}


// copyCodeToClipboard: copies code in textarea to clipboard
// Inspired by code from: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
function copyCodeToClipboard() {
	
	const copyText = codeText.innerHTML;

	// Throw copied text onto the clipboard:
	navigator.clipboard.writeText(copyText);
	

	// Let user know that the text has copied successfully
	// with a new div element:
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = "Text copied successfully!";
	tempDiv.id = "text-copied";
	
	// Collect all div elements to check whether
	// we've already pasted this div element to
	// the screen:
	const elements = document.getElementsByTagName("div");

	// Assume we haven't already done this:	
	let isAppended = false;
	for (let i = 0; i < elements.length; i++){
	
		// But if we find our div, then we've
		// already created this element
		if (elements[i].id == "text-copied"){
			isAppended = true;
		}
	}
	
	// Append div if we've never
	// done that before:
	if (isAppended == false){
		const parent = 	entryPoint;
		parent.appendChild(tempDiv);
	}
}


// function returns the index of a tile in a tileSet,
// given the width, height, etc of that Tableau
function getTileIndex(tableauWidth, tableauHeight, tableauColumnSpace, 
											tileWidth, tableauId, tileX, tileY) {
	// To get x and y index (that is, index without
	// consideration for tile width and gaps between
	// tiles), divide by tileWidth + the gaps AKA
	// tableauColumnSpace)
	const xIndex = tileX / (tileWidth + tableauColumnSpace);
	const yIndex = tileY / (tileWidth + tableauColumnSpace);
	const index = xIndex + (yIndex * tableauWidth);
	return index;
}


// configureGridLines: turns on or off gridlines for spriteTableau 
// (gridlines make it easier to draw and see where each pixel is, 
// but the NES does not actually show these gridlines, so turning 
// them off lets the user see what the Tile would really look like)
function configureGridLines(){
	stroke = 	spriteTableau.gridLines.getAttribute("stroke");
	
	// If stroke is set to black, make it none, or vice versa:
	if (stroke == "black") {
		spriteTableau.gridLines.setAttribute("stroke", "none");
		
	} else {
		spriteTableau.gridLines.setAttribute("stroke", "black");
	}
}


// confirmReset: confirms user
// wants to reset to initial state
function confirmReset() {
	
	// Assume user does not confirm
	let confirmation = false;

	// Set up div to confirm with user
	const warningBox = document.createElement("div");
	warningBox.style.width = "50vw";
	warningBox.style.height = "25vw";
	warningBox.style.zIndex = "1";
	warningBox.style.backgroundColor = "white";
	warningBox.style.position = "fixed";
	warningBox.style.top = "10vw";
	warningBox.style.left = "10vw";
	warningBox.style.borderRadius = "5px";
	warningBox.style.textAlign = "center";
	warningBox.innerHTML = "Are you sure you want to reset the tile and erase all of your work?";

	// Set up "yes" button
	const warningYes = document.createElement("input");
	warningYes.type = "submit";
	warningYes.style.margin = "20px";
	warningYes.value = "Yes";
	// If user clicks button, function
	// will set confirmation to true,
	// remove buttons, and call
	// resetScreen to reset the resetScreen
	warningYes.onclick = function() {
		confirmation = true;
		warningYes.remove();
		warningNo.remove();
		warningBox.remove();
		resetScreen(confirmation);
	};
	
	// Set up "no" button
	const warningNo = document.createElement("input");
	warningNo.type = "submit";
	warningNo.style.margin = "20px";
	warningNo.value = "No";
	// Clicking "No" simply removes
	// the buttons and div
	warningNo.onclick = function() {
		confirmation = false;	
		warningYes.remove();
		warningNo.remove();
		warningBox.remove();
	};

	warningBox.appendChild(warningYes);
	warningBox.appendChild(warningNo);
	entryPoint.appendChild(warningBox);
}


// resetScreen: prompts user to confirm reset of spriteTableau, 
// if user confirms, resets spriteTableau to initial settings
function resetScreen(confirm) {
	
	// The reset is pretty simple for this app:
	// 1) Grab all of the rect elements
	// 2) If an element is part of spriteTableau,
	// set its colour to white and colour # to 1
	// 3) If an element is part of playerPal,
	// set its colour to white
	if (confirm == true) {
		const allRect = document.getElementsByTagName("rect");
		for(let i = 0; i < allRect.length; i++){
			if (allRect[i].parentElement.id == "spriteTableau") {
				palColour = playerPal.activeTile;
				palColour.setAttribute("fill", "#FFFFFF");
				palColour = palColour.getAttribute("fill");
				allRect[i].setAttribute("fill", palColour);
				allRect[i].setAttribute("class", "colour1");
			} else if (allRect[i].id.indexOf("playerPal") > -1) {
				allRect[i].setAttribute("fill", "#FFFFFF");
			}
		}

		// Update our textbox with reset data:
		updateCode();
	}
}


// updateCode: updates the code in text
// area for ASM6502/NES programming:
function updateCode() {

	// Declare two empty arrays,
	// spritePalette and spriteCode.
	// The former for code for setting
	// the NES palette, the latter for
	// tiledate (for that sprite).
	const spritePalette = [];
	const spriteCode = [];
	
	// Collect all rect elements into an array
	const allRect = document.getElementsByTagName("rect");
	
	
	// Here if an element is part of playerPal and
	// not a highlight tile, we grab its colour,
	// convert it to NES hex code using hexToNesPal, 
	// and push it to spritePalette. Otherwise,
	// if it's part of spriteTableau and not the
	// highlight tile, we pass its colour number
	// to spriteCode.
	for(let i = 0; i < allRect.length; i++){
		const itsParent = allRect[i].parentElement.id;
		const itsId = allRect[i].id;
		const currentRect = allRect[i];
		if ((itsParent == "playerPal") &&
				(itsId != "playerPalHighlight")) {
			let palColour = currentRect.getAttribute("fill");
			palColour = hexToNesPal(palColour);
			spritePalette.push(palColour);
		} else if ((itsParent == "spriteTableau") &&
							 (itsId !="spriteTableauHighlight")) {
			const itsColourNum = currentRect.getAttribute("class").slice(-1);
			spriteCode.push(itsColourNum);
		}
	}

	// Now we loop through spritePalette with
	// appropriate "punctuation" formatting
	// to feed palette info to newText in proper
	// ASM 6502 format:
	let newText = "; Paste this into palette:\ndb ";
	for (let i = 0; i < spritePalette.length; i++) {
		newText += spritePalette[i] + ", ";
	}
	
	// Cut the last unnecessary comma out:
	const newLength = newText.length - 1;
	newText = newText.slice(0, newLength - 1);
	newText += "\n; Paste this into your tiles:";
	newText += "\n; Tile for " + spriteName.value;

	// Loop through numbers in spriteCode to
	// convert the colours into proper tile code
	let bitPlane1 = ""
	let bitPlane2 = ""
	for (let i = 0; i < spriteCode.length; i++) {
		// If we've already done 8 bits, we need 
		// to start a newline:
		if (i % 8 == 0) {
			bitPlane1 += "\ndb %";
			bitPlane2 += "\ndb %";
		}
		const currentNum = spriteCode[i];
		
		// Each colour has a different bitplane value
		// over the two bitplanes:
		// bitplane 1, 2 both zero for colour1
		// bitplane 1 one, 2 zero for colour2
		// bitplane 1 zero, 2 one for colour3
		// both bitplanes set to one for colour4
		switch (currentNum) {
			case "1":
				bitPlane1 += "0";
				bitPlane2 += "0";
				break;
			case "2":
				bitPlane1 += "1";
				bitPlane2 += "0";
				break;
			case "3":
				bitPlane1 += "0";
				bitPlane2 += "1";
				break;
			case "4":
				bitPlane1 += "1";
				bitPlane2 += "1";
				break;
		}
	}
	// Add all relevant sprite code info to newText:
	newText += bitPlane1 + "\n" + bitPlane2;
	// Put newText into codeText:
	codeText.innerHTML = newText;
}


// hexToNesPal: function that takes a hex code and 
// returns the equivalent NES hex code
function hexToNesPal (hex) {
	// Code inspired by the answer to the following question:
	// https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
	const hexValues = [];

	// Grab value based on key given, 
	// return that key.
	for (let i = 0; i < NESPalette.length; i++){
  	const obj = NESPalette[i];
  	for (let key in obj){
	    const value = obj[key];
	    hexValues.push(value)
	    if (value == hex) {
				return key;
	    } 
  	}
  }
  return "ERROR";
}

$( "#text-tooltip" ).tooltip({classes: {"ui-tooltip-content": "ui-tooltip-content"}});
$( "#reset-tooltip" ).tooltip();
$( "#copy-tooltip" ).tooltip();


// Increment progress bar for loading JS:
progress.value = Math.min((progress.value + 10) % 100, 100);

// End -->