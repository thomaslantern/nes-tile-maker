<!-- Begin
// NES Music Maker
// ©2023 by Thomas Wesley Scott

const entryPoint = document.getElementById("javascript");


// CLASSES:


// 1) Note:
// - block of SVG code (to represent it "physically" on the screen)
// (I learned how to do this from: 
// https://stackoverflow.com/questions/55206823/how-to-create-a-valid-svg-element-with-javascript)
// - int duration, length of the note:
// - string pitch, pitch of the note (pitch represented as hex string 
// for easy conversion to ASM6502)
class Note {
	constructor(duration, pitch) {
		this.duration = duration;
		this.pitch = pitch;
		// Declare the listahjfkh of svg elements:
		this.svgList = [];

		// Determine length/type of note:
		switch(duration) {
  			// Whole Note/Whole Rest
  			case wholeNoteLength:
				// Check to see if note is actually a rest
				if ((pitch != null) && (pitch.indexOf("rest")) >= 0) {
					// Whole Rest
  					const wholeRestSvg = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  					wholeRestSvg.setAttribute("x", 265);
  					wholeRestSvg.setAttribute("y", 395);
  					wholeRestSvg.setAttribute("width", restWidth);
  					wholeRestSvg.setAttribute("height", restHeight);
  					wholeRestSvg.setAttribute("fill", "black");
  					this.svgList.push(wholeRestSvg);

  					const wholeRestLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
  					wholeRestLine.setAttribute("x1", 255);
  					wholeRestLine.setAttribute("y1", 395);
  					wholeRestLine.setAttribute("x2", 305);
  					wholeRestLine.setAttribute("y2", 395);
  					wholeRestLine.setAttribute("stroke", "black");
  					wholeRestLine.setAttribute("stroke-width", 2);
  					this.svgList.push(wholeRestLine);
  				} else {
  					// Whole Note
		  			const wholeNoteSvg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); 
					wholeNoteSvg.setAttribute("cx", 45);
					wholeNoteSvg.setAttribute("cy", 400); 
					wholeNoteSvg.setAttribute("rx", noteWidth / 2); 
					wholeNoteSvg.setAttribute("ry", (noteWidth / 2) * 0.7); 
					wholeNoteSvg.setAttribute("stroke", "black"); 
					wholeNoteSvg.setAttribute("stroke-width", 5); 
					wholeNoteSvg.setAttribute("fill", "none");
					wholeNoteSvg.setAttribute("class", "whole-note");
					this.svgList.push(wholeNoteSvg);
				}
    			break;

  			// Half Note/Half Rest
  			case halfNoteLength:
  				// Similar check for rest vs note
  				if ((pitch != null) && (pitch.indexOf("rest")) >= 0) {
  					// Half Rest
  					const halfRestSvg = document.createElementNS("http://www.w3.org/2000/svg", "rect")
  					halfRestSvg.setAttribute("x", 265);
  					halfRestSvg.setAttribute("y", 395);
  					halfRestSvg.setAttribute("width", 30);
  					halfRestSvg.setAttribute("height", 15);
  					halfRestSvg.setAttribute("fill", "black");
  					this.svgList.push(halfRestSvg);

  					const halfRestLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
  					halfRestLine.setAttribute("x1", 255);
  					halfRestLine.setAttribute("y1", 410);
  					halfRestLine.setAttribute("x2", 305);
  					halfRestLine.setAttribute("y2", 410);
  					halfRestLine.setAttribute("stroke", "black");
  					halfRestLine.setAttribute("stroke-width", 2);
  					this.svgList.push(halfRestLine);
  				}
  				else {
					// Half Note
					// Stem of note
					const halfNoteStem = document.createElementNS("http://www.w3.org/2000/svg", "line");
					halfNoteStem.setAttribute("x1", 115);
					halfNoteStem.setAttribute("y1", 395);
					halfNoteStem.setAttribute("x2", 115);
					halfNoteStem.setAttribute("y2", 345);
					halfNoteStem.setAttribute("stroke-width", 5); 
					halfNoteStem.setAttribute("stroke", "black"); 
					halfNoteStem.setAttribute("fill", "none"); 
					halfNoteStem.setAttribute("class", "half-note");
					this.svgList.push(halfNoteStem);

					// "Body" of note (the ellipse)
					const halfNoteSvg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
					halfNoteSvg.setAttribute("cx", 95); 
					halfNoteSvg.setAttribute("cy", 400); 
					halfNoteSvg.setAttribute("rx", noteWidth / 2); 
					halfNoteSvg.setAttribute("ry", (noteWidth / 2) * 0.7); 
					halfNoteSvg.setAttribute("stroke", "black"); 
					halfNoteSvg.setAttribute("stroke-width", 5); 
					halfNoteSvg.setAttribute("fill", "none");
					halfNoteSvg.setAttribute("class", "half-note");
					this.svgList.push(halfNoteSvg);
				}
    			break;

  			case quarterNoteLength:
    			// Determine if it's a rest or a note
    			if ((pitch != null) && (pitch.indexOf("rest")) >= 0) {
    				// Quarter Rest
    				const quarterRest = document.createElementNS("http://www.w3.org/2000/svg", "path");
    				quarterRest.setAttribute("path","M 0 0 L10 20 C -10 40 0 20 15 50");
    				quarterRest.setAttribute("stroke-width", 5);
    				quarterRest.setAttribute("stroke", "black");
    				this.svgList.push(quarterRest);
    			} else {
	    			// Quarter Note
					const quarterNoteStem = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
					quarterNoteStem.setAttribute("x1", 165);
					quarterNoteStem.setAttribute("y1", 395);
					quarterNoteStem.setAttribute("x2", 165);
					quarterNoteStem.setAttribute("y2", 345);
					quarterNoteStem.setAttribute("stroke-width", 5); 
					quarterNoteStem.setAttribute("stroke", "black");
					quarterNoteStem.setAttribute("fill", "none");
					quarterNoteStem.setAttribute("class", "quarter-note");
					this.svgList.push(quarterNoteStem);

					const quarterNoteSvg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); 
					quarterNoteSvg.setAttribute("cx", 145); 
					quarterNoteSvg.setAttribute("cy", 400); 
					quarterNoteSvg.setAttribute("rx", noteWidth / 2); 
					quarterNoteSvg.setAttribute("ry", (noteWidth / 2) * 0.7); 
					quarterNoteSvg.setAttribute("stroke", "black"); 
					quarterNoteSvg.setAttribute("stroke-width", 5);
					quarterNoteSvg.setAttribute("fill", "black");
					quarterNoteSvg.setAttribute("class", "quarter-note");
					this.svgList.push(quarterNoteSvg); 	    			
	    		}
	    		break;
    		
    		case eighthNoteLength:
    			// Determine if it's a rest or a note
    			if ((pitch != null) && (pitch.indexOf("rest")) >= 0) {
    				// Eighth Rest
    				const eighthRest = document.createElementNS("http://www.w3.org/2000/svg", "path");
    				eighthRest.setAttribute("path","M30 C20 25 30 35 46 46");
    				eighthRest.setAttribute("stroke-width", 5);
    				eighthRest.setAttribute("stroke", "black");
    				this.svgList.push(eighthRest);
    			} else {
	    			// Eighth Note
					const eighthNoteStem = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
					eighthNoteStem.setAttribute("x1", 215);
					eighthNoteStem.setAttribute("y1", 395);
					eighthNoteStem.setAttribute("x2", 215);
					eighthNoteStem.setAttribute("y2", 345);
					eighthNoteStem.setAttribute("stroke-width", 5); 
					eighthNoteStem.setAttribute("stroke", "black");
					eighthNoteStem.setAttribute("fill", "none");
					eighthNoteStem.setAttribute("class", "eighth-note");
					this.svgList.push(eighthNoteStem);

					const eighthNoteSvg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); 
					eighthNoteSvg.setAttribute("cx", 195); 
					eighthNoteSvg.setAttribute("cy", 400); 
					eighthNoteSvg.setAttribute("rx", noteWidth / 2); 
					eighthNoteSvg.setAttribute("ry", (noteWidth / 2) * 0.7); 
					eighthNoteSvg.setAttribute("stroke", "black"); eighthNoteSvg.setAttribute("stroke-width", 5);
					eighthNoteSvg.setAttribute("fill", "black");
					eighthNoteSvg.setAttribute("class", "eighth-note");
					this.svgList.push(eighthNoteSvg);

					const eighthNotePath = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
					eighthNotePath.setAttribute("d", "M215 345 C215 385 240 380 227 393");
					eighthNotePath.setAttribute("stroke", "black"); 
					eighthNotePath.setAttribute("stroke-width", 4);
					eighthNotePath.setAttribute("stroke-linecap", "round");
					eighthNotePath.setAttribute("fill", "none");
					eighthNotePath.setAttribute("class", "eighth-note");
					this.svgList.push(eighthNotePath);
	     		}
	     		break;

    		case sixteenthNoteLength:
    			// Determine if it's a rest or a note
    			if ((pitch != null) && (pitch.indexOf("rest")) >= 0) {
    				// Sixteenth Rest
    				const sixteenthRest = document.createElementNS("http://www.w3.org/2000/svg", "path");
    				sixteenthRest.setAttribute("path","M30 C20 25 30 35 46 46");
    				sixteenthRest.setAttribute("stroke-width", 5);
    				sixteenthRest.setAttribute("stroke", "black");
    				this.svgList.push(sixteenthRest);
    			} else {
	    			// Sixteenth Note
					const sixteenthNoteStem = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
					sixteenthNoteStem.setAttribute("x1", 285);
					sixteenthNoteStem.setAttribute("y1", 395);
					sixteenthNoteStem.setAttribute("x2", 285);
					sixteenthNoteStem.setAttribute("y2", 345);
					sixteenthNoteStem.setAttribute("stroke-width", 5); 
					sixteenthNoteStem.setAttribute("stroke", "black");
					sixteenthNoteStem.setAttribute("fill", "none");
					sixteenthNoteStem.setAttribute("class", "sixteenth-note");
					this.svgList.push(sixteenthNoteStem);

					const sixteenthNoteSvg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); 
					sixteenthNoteSvg.setAttribute("cx", 265); 
					sixteenthNoteSvg.setAttribute("cy", 400); 
					sixteenthNoteSvg.setAttribute("rx", noteWidth / 2); 
					sixteenthNoteSvg.setAttribute("ry", (noteWidth / 2) * 0.7); 
					sixteenthNoteSvg.setAttribute("stroke", "black"); sixteenthNoteSvg.setAttribute("stroke-width", 5);
					sixteenthNoteSvg.setAttribute("fill", "black");
					sixteenthNoteSvg.setAttribute("class", "sixteenth-note");
					this.svgList.push(sixteenthNoteSvg);

					const sixteenthNotePath = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
					sixteenthNotePath.setAttribute("d", "M285 345 C285 385 310 380 297 393");
					sixteenthNotePath.setAttribute("stroke", "black"); 
					sixteenthNotePath.setAttribute("stroke-width", 4);
					sixteenthNotePath.setAttribute("stroke-linecap", "round");
					sixteenthNotePath.setAttribute("fill", "none");
					sixteenthNotePath.setAttribute("class", "sixteenth-note");
					this.svgList.push(sixteenthNotePath);

					const sixteenthNotePath2 = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
					sixteenthNotePath2.setAttribute("d", "M285 330 C285 370 310 365 297 378");
					sixteenthNotePath2.setAttribute("stroke", "black"); 
					sixteenthNotePath2.setAttribute("stroke-width", 4);
					sixteenthNotePath2.setAttribute("stroke-linecap", "round");
					sixteenthNotePath2.setAttribute("fill", "none");
					sixteenthNotePath2.setAttribute("class", "sixteenth-note");
					this.svgList.push(sixteenthNotePath2);
				}
    			break;
    		default:
    			// Theoretically shouldn't happen!
    		}
    	}
    }


// 2) Song:
// - string id, id (to easily find svg elements)
// - array of Notes, noteArray
// - svg canvas musicStaff, consisting of rectangles representing 
// different pitches of music (the graphical representation of noteArray)
// - int activeNote (takes that index of the noteArray)
// - boolean enableHighlighting (allows for highlighting of activeNote 
// index of noteArray if true)
// - int noteSpacing (how much space between notes in px)
// - boolean canBeModified (true or false), determines whether Notes in noteArray can be modified,
// - int maxNotes, maximum amount of allowed notes*/

class Song {
	constructor(id, noteArray, activeNote, enableHighlighting = false, 
				noteSpacing, canBeModified = false, maxNotes = 1) {
		this.noteArray = noteArray;
		this.activeNote = activeNote;
		this.enableHighlighting = enableHighlighting;
		this.noteSpacing = noteSpacing;
		this.canBeModified = canBeModified;
		this.maxNotes = maxNotes;


		// Build the music staff
		let startOffset = 0;
		this.musicStaff = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.musicStaff.setAttribute("style", "margin-left: 2vw");
		this.musicStaff.setAttribute("id", id);
		// Height/Width of music staff will be different depending on
		// whether it can be modified (an actual customizable Song)
		// .vs. not (a list of notes to use like a palette for a song)
		let currentWidth = defaultSongWidth;
		if (canBeModified == true) {
			this.musicStaff.setAttribute("height", modifiableSongHeight);
			currentWidth = maxSongLength * totalNoteWidth;
			this.musicStaff.setAttribute("width", currentWidth);
			// Events are also different; drawing on modifiable
			// song requires a different setup; also want to change
			// highlighting based on mouse position, not just clicking
			this.musicStaff.addEventListener("click", drawSetup);
			this.musicStaff.addEventListener("mouseover", changeActiveNote);
			startOffset = totalNoteWidth;
		} else {
			// Height only needs to be as tall as notes
			this.musicStaff.setAttribute("height", noteHeight);
			// Set Width to amount of notes in array:
			currentWidth = noteArray.length * totalNoteWidth;
			this.musicStaff.setAttribute("width", currentWidth);
			this.musicStaff.addEventListener("click", changeActiveNote);
		}
		
		// Set musicStaff's id
		this.musicStaff.setAttribute("id", id);
				

		// If highlighting is enabled for this Song,
		// we need to set up the highlight "tile" (rect),
		// assigning relevant attributes and appending
		// to musicStaff:
		if (enableHighlighting == true) {
			this.activeHighlight = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.activeHighlight.setAttribute("x", highlightWidth);
			this.activeHighlight.setAttribute("y", 0);
			this.activeHighlight.setAttribute("stroke", "red");
			this.activeHighlight.setAttribute("stroke-width", 3);
			const staffHeight = this.musicStaff.getAttribute("height");
			this.activeHighlight.setAttribute("width", highlightWidth);
			this.activeHighlight.setAttribute("height", staffHeight);  
			this.activeHighlight.setAttribute("stroke", "red");
			this.activeHighlight.setAttribute("fill", "none");
			this.musicStaff.appendChild(this.activeHighlight);
		}
		
		
		// Call the function drawNote for every
		// note in the noteArray		
		for (let i = 0; i < noteArray.length; i++){
			drawNote(this, i, startOffset, 0);
		}


		// Build the staff if this Song can be modified
		if (this.canBeModified == true) {

			// TREBLE AND BASS CLEF FOR MUSIC STAFF:

			
			// Treble Clef

			const trebleClefPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
			trebleClefPath1.setAttribute("d","M24 58 S20 40 28 30 C40 35 40 45 \
							30 60 C05 110 10 120 35 120 C80 90 0 90 25 110");
			trebleClefPath1.setAttribute("stroke","black"); 
			trebleClefPath1.setAttribute("stroke-width", 5); 
			trebleClefPath1.setAttribute("stroke-linecap", "round"); 
			trebleClefPath1.setAttribute("fill", "none");
			this.musicStaff.appendChild(trebleClefPath1);
			
			const trebleClefLine = document.createElementNS("http://www.w3.org/2000/svg","line"); 
			trebleClefLine.setAttribute("x1", 24); 
			trebleClefLine.setAttribute("y1", 58); 
			trebleClefLine.setAttribute("x2", 38); 
			trebleClefLine.setAttribute("y2", 138); 
			trebleClefLine.setAttribute("stroke","black"); 
			trebleClefLine.setAttribute("stroke-linecap", "round"); 
			trebleClefLine.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(trebleClefLine);

			const trebleClefPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
			trebleClefPath2.setAttribute("d","M38 138 S 25 155 12 135"); 
			trebleClefPath2.setAttribute("stroke","black"); 
			trebleClefPath2.setAttribute("fill", "none");
			trebleClefPath2.setAttribute("stroke-width", 5); 
			trebleClefPath2.setAttribute("stroke-linecap", "round"); 
			this.musicStaff.appendChild(trebleClefPath2);

			const trebleClefNote = document.createElementNS("http://www.w3.org/2000/svg","circle"); 
			trebleClefNote.setAttribute("cx", 16.9); 
			trebleClefNote.setAttribute("cy", 134.6); 
			trebleClefNote.setAttribute("r", 7); 
			trebleClefNote.setAttribute("fill", "black");
			this.musicStaff.appendChild(trebleClefNote);

			// Bass Clef

			const bassClefPath = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
			bassClefPath.setAttribute("d","M10 305 C68 220 0 190 5 235"); 
			bassClefPath.setAttribute("stroke", "black"); 
			bassClefPath.setAttribute("stroke-width", 5); 
			bassClefPath.setAttribute("fill", "none");
			this.musicStaff.appendChild(bassClefPath);

			const bassClefCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");  
			bassClefCircle1.setAttribute("cx", 7); 
			bassClefCircle1.setAttribute("cy", 234); 
			bassClefCircle1.setAttribute("r", 10); 
			bassClefCircle1.setAttribute("fill", "black");
			this.musicStaff.appendChild(bassClefCircle1);

			const bassClefCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");  
			bassClefCircle2.setAttribute("cx", 45); 
			bassClefCircle2.setAttribute("cy", 225); 
			bassClefCircle2.setAttribute("r", 5);
			bassClefCircle2.setAttribute("fill", "black");
			this.musicStaff.appendChild(bassClefCircle2);
			
			const bassClefCircle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");  
			bassClefCircle3.setAttribute("cx", 45); 
			bassClefCircle3.setAttribute("cy", 255); 
			bassClefCircle3.setAttribute("r", 5); 
			bassClefCircle3.setAttribute("fill", "black");
			this.musicStaff.appendChild(bassClefCircle3);

			// STAFF LINES:

			const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line1.setAttribute("x1", 10);
			line1.setAttribute("y1", 30);
			line1.setAttribute("x2", currentWidth);
			line1.setAttribute("y2", 30);
			line1.setAttribute("stroke","black");
			line1.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line1);

			const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line2.setAttribute("x1", 10);
			line2.setAttribute("y1", 60); 
			line2.setAttribute("x2", currentWidth);
			line2.setAttribute("y2", 60);
			line2.setAttribute("stroke","black");
			line2.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line2);

			const line3 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line3.setAttribute("x1", 10);
			line3.setAttribute("y1", 90);
			line3.setAttribute("x2", currentWidth)
			line3.setAttribute("y2", 90);
			line3.setAttribute("stroke","black");
			line3.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line3);
			
			const line4 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line4.setAttribute("x1", 10);
			line4.setAttribute("y1", 120); 
			line4.setAttribute("x2", currentWidth);
			line4.setAttribute("y2", 120);
			line4.setAttribute("stroke", "black");
			line4.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line4);
			
			const line5 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line5.setAttribute("x1", 10);
			line5.setAttribute("y1", 150);
			line5.setAttribute("x2", currentWidth)
			line5.setAttribute("y2", 150);
			line5.setAttribute("stroke", "black");
			line5.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line5);

			const line6 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line6.setAttribute("x1", 10);
			line6.setAttribute("y1", 210);
			line6.setAttribute("x2", currentWidth)
			line6.setAttribute("y2", 210);
			line6.setAttribute("stroke","black");
			line6.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line6);

			const line7 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line7.setAttribute("x1", 10);
			line7.setAttribute("y1", 240);
			line7.setAttribute("x2", currentWidth)
			line7.setAttribute("y2", 240); 
			line7.setAttribute("stroke","black");
			line7.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line7);

			const line8 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line8.setAttribute("x1", 10);
			line8.setAttribute("y1", 270);
			line8.setAttribute("x2", currentWidth)
			line8.setAttribute("y2", 270);
			line8.setAttribute("stroke","black");
			line8.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line8);

			const line9 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line9.setAttribute("x1", 10);
			line9.setAttribute("y1", 300); 
			line9.setAttribute("x2", currentWidth)
			line9.setAttribute("y2", 300); 
			line9.setAttribute("stroke","black");
			line9.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line9);

			const line10 = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
			line10.setAttribute("x1", 10);
			line10.setAttribute("y1", 330);
			line10.setAttribute("x2", currentWidth)
			line10.setAttribute("y2", 330);
			line10.setAttribute("stroke","black");
			line10.setAttribute("stroke-width", 5);
			this.musicStaff.appendChild(line10);
		}
	}
}


// VARIABLES:


// First we have a number of const variables.
// They are used for various things, mostly for
// drawing purposes. Putting the values in const
// makes it easier to maintain the app if changes
// need to be made.

// Const variables for drawing:
const defaultSongWidth = 500;
const noteSpace = 15;
// width of note itself
const noteWidth = 20;
// width of note including gaps
const totalNoteWidth = noteWidth * 1.5 + noteSpace;
const noteHeight = 100;
const cyOffset = noteWidth * 0.7;
const restOffset = 20;
const restHeight = 15;
const restWidth = 30;
const modifiableSongHeight = 400;
const musicStaffYOffset = 0.73 * modifiableSongHeight
const highlightWidth = noteWidth + noteSpace * 2;
const xOffset8th = 10; 
const yOffset8th = 20; 
const xOffset16th = 5;
const yOffset16th = 15;
const flagMultiplier = 20;


// Const variables for various properties
// Mostly just makes object declarations more
// readable without having to scroll back
// and forth between class and object.
const canModifyNotes = true;
const noModifyingNotes = false;
const canHighlight = true;
const noHighlighting = false;
const maxSongLength = 16;


// Const variables for note lengths
// Note: values based on a tempo of 60
const wholeNoteLength = 240;
const halfNoteLength = 120;
const quarterNoteLength = 60;
const eighthNoteLength = 30;
const sixteenthNoteLength = 15;


// Const variables for different kinds of notes:
const wholeNote = new Note(wholeNoteLength, null);
const halfNote = new Note(halfNoteLength, null);
const quarterNote = new Note(quarterNoteLength, null);
const eighthNote = new Note(eighthNoteLength, null);
const sixteenthNote = new Note(sixteenthNoteLength, null);

// Const variables for different kinds of rests:
const wholeRest = new Note(wholeNoteLength, "whole-rest");
const halfRest = new Note(halfNoteLength, "half-rest");
const quarterRest = new Note(quarterNoteLength, "quarter-rest");
const eighthRest = new Note(eighthNoteLength, "eighth-rest");
const sixteenthRest = new Note(sixteenthNoteLength, "sixteenth-rest");

// List of possible note choices in app
// TODO: Add rest functionality.
//(wholeRest, halfRest, quarterRest, eighthRest, sixteenthRest); 
const noteChoicesArray = 
[wholeNote, halfNote, quarterNote, eighthNote, 
sixteenthNote];


// H1 element for Note Choices
const chooseNotesHere = document.createElement("h1");
chooseNotesHere.innerHTML = "Choose from notes here:";

// noteChoices - a "Song" that consists of 
// exactly one of every kind of note:
const noteChoices = 
new Song("noteChoices", noteChoicesArray, 0, canHighlight, 
		noteSpace, noModifyingNotes, noteChoicesArray.length);


// H1 element for customSong
const putNotesHere = document.createElement("h1");
putNotesHere.innerHTML = "Insert notes here:"

// customSong - a Song that initializes to 
// zero notes (but can have notes added)
let customSong = 
new Song("customSong", [], null, canHighlight, 
	noteSpace, canModifyNotes, maxSongLength);

// Create arrays for songs to be used 
// for converting to ASM6502 code:
let customSongPitchArray = [];
let customSongDurationArray = [];


// codeforNES - a read-only textarea that gives the 
// user the code to use, based on notes in customSong
const codeForNES = document.createElement("textarea");
codeForNES.innerHTML = "(Code to paste in will appear here.)";
codeForNES.readOnly = true;
codeForNES.style.marginLeft = "2vw";


// H1 element for tempo input:
const tempoH1 = document.createElement("h1");
tempoH1.innerHTML = "Input Valid Tempo (40-255) here:"

// tempo - an input that starts at 120, 
// that can be changed to any number from 40 to 255 
// (affects duration of notes in NES code)
let tempo = document.createElement("input");
tempo.value = 120;
tempo.style.marginLeft = "2vw";
// Changing the tempo requires updating ASM6502 code:
tempo.addEventListener("change", updateTempo);


// We need somewhere to store the old tempo to know
// how to update each note's duration
let oldTempo = 120;


// resetButton - an input that, when 
// clicked, deletes the notes in customSong
const resetButton = document.createElement("input");
resetButton.type = "submit";
resetButton.style.margin = "20px";
resetButton.value = "Reset Notes";
resetButton.style.width = "fit-content";
resetButton.style.paddingBottom = "35px";
resetButton.onclick = confirmReset;


// clipboardCopy - button that allows user to
// copy code from codeForNES to the clipboard
const clipboardCopy = document.createElement("input");
clipboardCopy.type = "submit";
clipboardCopy.style.margin = "20px";
clipboardCopy.value = "Copy Text";
clipboardCopy.style.width = "fit-content";
clipboardCopy.style.paddingBottom = "35px";
clipboardCopy.onclick = copyCodeToClipboard;

// downloadNesFile - allows download into
// .NES file
const NESDownload = document.createElement("input");
NESDownload.type = "submit";
NESDownload.style.margin = "20px";
NESDownload.style.width = "fit-content";
NESDownload.style.paddingBottom = "35px";
NESDownload.value = "Download Cartridge";




// Append elements to our entryPoint:
entryPoint.appendChild(tempoH1);
entryPoint.appendChild(tempo);
entryPoint.appendChild(chooseNotesHere);
entryPoint.appendChild(noteChoices.musicStaff);
entryPoint.appendChild(putNotesHere);
entryPoint.appendChild(customSong.musicStaff);
entryPoint.appendChild(codeForNES);
entryPoint.appendChild(resetButton);
entryPoint.appendChild(NESDownload);
entryPoint.appendChild(clipboardCopy);


// FUNCTIONS:


// updateTempo: Update duration values
// and call updateCode based on current 
// value in tempo 
function updateTempo() {
	// Sanitize tempo so that is in
	// integer form:
	let newTempo = parseInt(tempo.value);
	
	// Sanitize tempo value so that it stays
	// between integer values of 40 to 255
	if (isNaN(newTempo)) {
		newTempo = 120;
	} else if ((newTempo > 255) || (newTempo < 40)){
		newTempo = 120;
	}
	
	// Set tempo.value to sanitized/parsed tempo:
	tempo.value = newTempo;

	// Change note durations in customSong based 
	// on newTempo: 
	for (let i = 0; i < customSongDurationArray.length; i++) {
		let currentDuration = customSongDurationArray[i];
		currentDuration = currentDuration * (oldTempo / newTempo);
		customSongDurationArray[i] = currentDuration;
	}

	// set oldTempo to newTempo for any future changes
	oldTempo = newTempo;
	
	// Update our ASM 6502 code in textarea:
	updateCode();
}


// findParent: Finds the parent SVG element
function findParent(eventTarget) {
	// Haven't found parent yet
	let foundParentSvg = false;
	let parentSvg = undefined;
	
	// Loop through elements starting
	// at eventTarget, stopping when
	// svg element(parent) is found:
	let currentParent = eventTarget;
	while (foundParentSvg == false) {
		// Collect all the svg elements
		const allSvgs = document.getElementsByTagName("svg");
		
		// Are currentParent and currentSvg the same?
		for (let i = 0; i < allSvgs.length; i++) {
			const currentSvg = allSvgs[i];
			if (currentSvg == currentParent) {
				// If so, set parentSvg to currentParent
				// and set foundParentSvg to true:
				parentSvg = currentParent;
				foundParentSvg = true;
			}
		}

		// Otherwise, move up one(down?) one element
		// in the DOM and try again
		currentParent = currentParent.parentElement;
	}
	// return parent from function:
	return parentSvg;
}

// relativeXAndY: gives the relative X and Y coordinates
// ("relative" to the element they are in)
function relativeXAndY(eventX, eventY, parent) {
	
	// Get the left and top dimensions of the parent element:
	const parentBounds = parent.getBoundingClientRect();
	const parentLeft = parseInt(parentBounds.left);
	const parentTop = parseInt(parentBounds.top);
	
	// Determine the relative x and y
	// using parentTop, parentLeft,
	// and event x and y:
	const relativeX = eventX - parentLeft;
	const relativeY = eventY - parentTop;
	
	// Return x,y values as array:
	return [relativeX, relativeY];
}


// getNoteIndex: gives the number of note
// based on where you're clicking on the song
function getNoteIndex(xVal) {
	const indexOffset = Math.floor(xVal / (totalNoteWidth));
	return indexOffset;
}


// changeActiveNote: changes activeNote of Song 
// based on either clicking or mouse movement
function changeActiveNote() {
	// Find the parent of the target
	const parentSvg = findParent(event.target);
	let currentHighlight = undefined;
	
	// Find the highlight of the target:
	const highlights = document.getElementsByTagName("rect");
	for (let i = 0; i < highlights.length; i++) {
		const currentElement = highlights[i];
		if ((currentElement.getAttribute("stroke") == "red") &&
			(currentElement.parentElement == parentSvg)) {
				currentHighlight = currentElement;
			}
	}

	// Figure out if highlight is in appropriate place
	// Inspired by the following stackoverflow question:
	// https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element/11396681#11396681
	const parentBounds = parentSvg.getBoundingClientRect();
	const parentLeft = parseInt(parentBounds.left);
	const highlightX = currentHighlight.getAttribute("x");
	const clickX = event.x - parentLeft;
	// Get the end x coordinate of highlighted area:
	const highlightEndX = 
	parseInt(highlightX) + totalNoteWidth;
	
	
	// Determine if where the user clicked falls outside
	// of the start and end of a highlighted area:
	if ((clickX < highlightX) || (clickX > highlightEndX)) {
		// Figure out appropriate new x coords for highlight
		const newXOffset = Math.floor(clickX / totalNoteWidth);
		const newX = newXOffset * totalNoteWidth; 
		
		// Keep cursor from moving onto the Treble/Bass Clef in
		// "customSong"
		if ((newX != 0) || (parentSvg.id != "customSong")) {
			currentHighlight.setAttribute("x", newX);	
		}
	}
}


// deleteNote: removes the note of songName at index
function deleteNote(songName, index) {
	// Find all svg elements at this index:
	const sameClassNotes = document.getElementsByClassName(index);
	
	// Declare a list of notes (svg elements) to remove:
	const notesToRemove = [];
	
	// Loop through list to find elements with class
	// sameClassNotes that have customSong as parent:
	for (let i = 0; i < sameClassNotes.length; i++){
		const currentNote = sameClassNotes[i];
		if (currentNote.parentElement.id == "customSong"){
			// Add them to list to be removed
			notesToRemove.push(currentNote);
		}
	}
	
	// Go through removal list and remove each element:
	for (let i = notesToRemove.length - 1; i >= 0; i--) {
		const currentNote = notesToRemove[i];
		currentNote.remove();
	}
}


// drawSetup: takes the activeNote of noteChoices
// and gets relevant information to call drawNote
function drawSetup() {
	
	// Find the parent element
	const parentSvg = findParent(event.target);

	// Get the relative x and y indices
	const xAndY = relativeXAndY(event.x, event.y, parentSvg);
	// Get the index for placing note in array
	// (subtract one because treble/bass 
	// clefs take up first block):
	let songNoteIndex = getNoteIndex(xAndY[0]);

	// yOffset will be used to calculate pitch ot note later:
	const yOffset = xAndY[1];

	// Find the highlight x and index from noteChoices
	// (so we know which note we're drawing):
	const highlightX = noteChoices.activeHighlight.getAttribute("x");
	const highlightIndex = getNoteIndex(highlightX);

	// Build a new note based on that index and x value:		
	const newNoteLength = noteChoices.noteArray[highlightIndex].duration;
	const newNotePitch = noteChoices.noteArray[highlightIndex].pitch;
	const newNote = new Note(newNoteLength, newNotePitch);

	// songNoteIndex == 0 means you're clicking on
	// treble/bass clef, we don't want to place a note there	
	if (songNoteIndex > 0) {
		// realIndex is one less due to treble clef/bass clef
		let realIndex = Math.max(songNoteIndex - 1, 0);
		
		// If song index doesn't exist yet...
		if ((realIndex + 1) > customSong.noteArray.length) {
		
			// place it at the last possible index if 
			// song is "full" (reached maxSongLength)...
			if (customSong.noteArray.length == maxSongLength) {
				customSong.noteArray[maxSongLength - 1] = newNote;
			} else {
				// Otherwise, add it to end of customSong
				customSong.noteArray.push(newNote);
			}
			// Change realIndex to reflect where note
			// was actually placed (i.e. if you tried 
			// to place a note at index 10 but there 
			// are less than 10 notes)
			realIndex = customSong.noteArray.length - 1;
				
		} else {
			// You placed a note where a note already
			// exists, so delete the old note, and update
			// the array for customSong with the new note:
			deleteNote(customSong, realIndex);
			customSong.noteArray[realIndex] = newNote;
		}
		
		
		// Draw the new note at the correct location:
		drawNote(customSong, realIndex, totalNoteWidth, yOffset);
	}
}


// drawNote: draws a note in 
// targetSong from a note at index
function drawNote(targetSong, index, startOffset, yOffset = 0){
	// Determine our starting point (horizontally)
	// for drawing:
	const xOffset = startOffset + 
	noteSpace + (index * totalNoteWidth);
	noteArray = targetSong.noteArray;
	

	// Get the height of the musicStaff, and declare
	// relevant variables for drawing.
	// NOTE: we declare cy, y1, y2, etc, because
	// we don't know yet what kind of note we're drawing
	const staffHeight = targetSong.musicStaff.getAttribute("height");
	let cy = 0;
	let y1 = 0;
	let y2 = 0;
	
	// Our starting y coordinate is based on 
	// the height of the music staff and height
	// of the note:
	let startY = staffHeight - noteHeight;

	// If yOffset is 0, we're drawing our noteChoices
	// (essentially our "palette" of Notes):
	if (yOffset == 0) {
		cy = staffHeight - cyOffset;
		y1 = staffHeight - noteHeight;
		y2 = staffHeight - 10;

	} else {
		// Otherwise, we are drawing on 
		// customSong and require more
		// precise/specific values:
		cy = yOffset;
		y1 = yOffset;
		y2 = yOffset - noteHeight;
		startY = y2;
	}
	

	// Counter for "flags" (curly flourishes) of notes, if any
	let flagCount = 0;
	const currentNote = noteArray[index];

	// Loop through the SVG elements representing the Note:
	for (let j = 0; j < noteArray[index].svgList.length; j++){
		const currentNoteFragment = noteArray[index].svgList[j];
		
		// Check for defined values to determine what kind of
		// shape we're drawing. If the value is undefined, we
		// aren't drawing that shape and move to the next 
		// condition:
		if (currentNoteFragment.getAttribute("cx") != undefined) {
			// it's a Circle/Ellipse
			currentNoteFragment.setAttribute("cx", (noteWidth/2) + xOffset);
			currentNoteFragment.setAttribute("cy", cy);
		} else if (currentNoteFragment.getAttribute("width") != undefined) {
			// it's a Rect
			currentNoteFragment.setAttribute("x", xOffset);
			currentNoteFragment.setAttribute("y", staffHeight - restOffset);
			if (targetSong.canBeModified == true) {
					currentNoteFragment.setAttribute("y", staffHeight - restOffset - musicStaffYOffset);
				}
		} else if (currentNoteFragment.getAttribute("x1") != undefined) {
			// It's a line
			// Check if the "pitch" of Note is "rest" (and thus requires different art):
			if ((currentNote.pitch != null) && (currentNote.pitch.indexOf("rest") >= 0)) {
				// It's part of a rest
				y1 = staffHeight - (0.25 * restOffset) + (restHeight * currentNote.pitch.indexOf("half"));
				currentNoteFragment.setAttribute("x1", (noteWidth * 1.5 + 5) + xOffset);
				currentNoteFragment.setAttribute("x2", xOffset - 5);
				currentNoteFragment.setAttribute("y1", y1);
				currentNoteFragment.setAttribute("y2", y1);
				if (targetSong.canBeModified == true) {
					y1 -= musicStaffYOffset;
				}
				currentNoteFragment.setAttribute("y1", y1);
				currentNoteFragment.setAttribute("y2", y1);
				
				
			} else {
				// It's part of a note
				currentNoteFragment.setAttribute("x1", noteWidth + xOffset);
				currentNoteFragment.setAttribute("x2", noteWidth + xOffset);
				currentNoteFragment.setAttribute("y1", y1);
				currentNoteFragment.setAttribute("y2", y2);
			}
			
		} else {
			// It's a path
			// Determine if it's a rest or a note
			if ((currentNote.pitch != null) && (currentNote.pitch.indexOf("rest") >= 0)) {
				// It's a rest
				let pathYOffset = 0;
				if (targetSong.canBeModified == true) {
					pathYOffset = staffHeight - (restOffset * 2.5) - 
					musicStaffYOffset;
				}
				
				// newPath will be the new path for rest,
				// based on relative position on the staff:
				let newPath = "";
				
				
				// Paths for rests are broken up into segments
				// (curves, lines), for easier maintainability, in 
				// case new rests would be added in the future, or
				// in case size changes were desired.
				if (currentNote.pitch.indexOf("eighth") >= 0) {
					// Eighth Rest
					const initPath = "M " + (xOffset - xOffset8th) + " " + 
					(pathYOffset + yOffset8th) + " ";
					const firstCurve = "c 3.2 -16 14 -16 16 0 ";
					const secondCurve = "c 2.4 16 8 8 16 -2.4 ";
					const firstLine = "l 4 0 ";
					const secondLine = "l -16 76 ";
					const thirdLine = "l -4 0 ";
					const fourthLine = "l 14 -68 ";
					const thirdCurve = "c -12 12.8 -16 4.8 -32 -5 Z";
					newPath = initPath + firstCurve + secondCurve + 
					firstLine + secondLine + thirdLine + 
					fourthLine + thirdCurve;
				} else if (currentNote.pitch.indexOf("quarter") >= 0) {
					// Quarter Rest
					const initPath = "M " + xOffset + " " + pathYOffset + " ";
					const firstLine = "l 20 30 ";
					const firstCurve = "c -15 15 -12 15 5 40 ";
					const secondCurve = "c -6 -1 -40 -8 -10 24 ";
					const thirdCurve = "c -30 -30 -36 -33 -2 -34 ";
					const secondLine = "l -18 -20";
					const fourthCurve = "c 30 -20 10 -10 3 -38 Z";
					
					newPath = initPath + firstLine + firstCurve + secondCurve 
					+ thirdCurve + secondLine + fourthCurve;
				} else if (currentNote.pitch.indexOf("sixteenth") >= 0) {
					// Sixteenth Rest
					const initPath = "M " + (xOffset - 5) + " " + 
					(pathYOffset + 15) + " ";
					const firstCurve = "c 3.2 -16 14 -16 16 0 ";
					const secondCurve = "c 2.4 16 8 8 16 -3 ";
					const firstLine = "l 5 0 ";
					const secondLine = "l -16 76 ";
					const thirdLine = "l -4 0 ";
					const fourthLine = "l 14 -68 ";
					const thirdCurve = "c -12 12.8 -16 4.8 -32 -4 m -4 20 " 
					+ firstCurve + secondCurve + firstLine + secondLine + 
					thirdLine + fourthLine + "c -12 12.8 -16 4.8 -32 -4 Z";
					
					newPath = initPath + firstCurve + secondCurve + firstLine + 
					secondLine + thirdLine + fourthLine + thirdCurve;
				}
    			currentNoteFragment.setAttribute("stroke-width", 1);
    			currentNoteFragment.setAttribute("stroke", "black");
    			currentNoteFragment.setAttribute("fill", "black");
				currentNoteFragment.setAttribute("d", newPath);
			// end of path drawing for rests 

			// Next "else" statement is for notes 
			// that require path elements:
			} else {
				// It's a note
				
				// Determine starting x
				const startX = noteWidth + xOffset;
				// Determine flag offset and starting y:
				const flagOffset = flagCount * flagMultiplier;
				startY += flagOffset;

				// Start new path:
				let newD = "";
				const firstMove = "M" + startX + " " + startY;
				const firstCurve = "c 0 40 25 35 12 48";
				newD += firstMove + firstCurve;
				
				// Set new path for currentNoteFragment:
				currentNoteFragment.setAttribute("d", newD);
				// Add to flagcount in case there is another pat
				// (for 16th notes and smaller)
				flagCount += 1;
			}
		}
		currentNoteFragment.setAttribute("class", index);
		// append the note fragment to the staff:
		targetSong.musicStaff.appendChild(currentNoteFragment);

	}

	if (targetSong.canBeModified == true) {
		// We're updating our customSong, so
		// let's update our code information for 
		// ASM6502:
		updatePitchAndLength(targetSong, index, yOffset);
		updateCode();
	}
}
		

// updatePitchAndLength: chooses pitch of 
// note based on y position; also updates 
// arrays for ASM6502 code.
function updatePitchAndLength(targetSong, index, yOffset) {
	
	// Get height of parent staff:
	const staffHeight = targetSong.musicStaff.getAttribute("height");	
	// Declare pitch variable
	let pitch = "";
	
	// Get the current tempo
	let currentTempo = tempo.value;
	
	// Get the length of the note
	// Taking the const duration value
	// and dividing by (currentTempo / 60)
	// as const values are based on a tempo
	// of 60:
	const duration = 
	Math.round(targetSong.noteArray[index].duration / (currentTempo/60));
	
	// Use the yoffset and staff height
	// to determine where on the staff
	// the note lies:
	const relativeY = yOffset / staffHeight;

	// Determine note based on relativeY:
	if (relativeY <= (24/400)) {
		// note is G5
		pitch = "G5";
	} else if (relativeY <= (37/400)) {
		//note is F5
		pitch = "F5";
	} else if (relativeY <= (54/400)) {
		//note is E5
		pitch = "E5";
	} else if (relativeY <= (67/400)) {
		//note is D5
		pitch = "D5";
	} else if (relativeY <= (84/400)) {
		//note is C5
		pitch = "C5";
	} else if (relativeY <= (97/400)) {
		//note is B4
		pitch = "B4";
	} else if (relativeY <= (114/400)) {
		//note is A4
		pitch = "A4";
	} else if (relativeY <= (127/400)) {
		//note is G4
		pitch = "G4";
	} else if (relativeY <= (144/400)) {
		//note is F4
		pitch = "F4";
	} else if (relativeY <= (157/400)) {
		//note is E4
		pitch = "E4";
	} else if (relativeY <= (174/400)) {
		//note is D4
		pitch = "D4";
	} else if (relativeY <= (187/400)) {
		//note is C4
		pitch = "C4";
	} else if (relativeY <= (204/400)) {
		//note is B3
		pitch = "B3";
	} else if (relativeY <= (217/400)) {
		//note is A3
		pitch = "A3";
	} else if (relativeY <= (234/400)) {
		//note is G3
		pitch = "G3";
	} else if (relativeY <= (247/400)) {
		//note is F3
		pitch = "F3";
	} else if (relativeY <= (264/400)) {
		//note is E3
		pitch = "E3";
	} else if (relativeY <= (277/400)) {
		//note is D3
		pitch = "D3";
	} else if (relativeY <= (294/400)) {
		//note is C3
		pitch = "C3";
	} else if (relativeY <= (307/400)) {
		//note is B2
		pitch = "B2";
	} else if (relativeY <= (324/400)) {
		//note is A2
		pitch = "A2";
	} else if (relativeY <= (337/400)) {
		//note is G2
		pitch = "G2";
	} else {
		//note is F2
		pitch = "F2";
	} 

	
	// Find out if the note we're targeting is a rest
	const currentPitch = targetSong.noteArray[index].pitch;
	if ((currentPitch != null) && (currentPitch.indexOf("rest") >= 0)) {
		// If it is, change pitch to "rest" 
		// (for ASM6502 code):
		pitch = "rest";
	} else {
		// Otherwise give it the newly
		// discovered pitch from above:
		targetSong.noteArray[index].pitch = pitch;
	}

	// Update our pitch and duration array...
	if (index == customSongPitchArray.length) {
		// By adding to the end of the array
		// if index isn't already there...
		customSongPitchArray.push(pitch);
		customSongDurationArray.push(duration);

	} else {
		// Or replacing old value if
		// index already exists!
		customSongPitchArray[index] = pitch;
		customSongDurationArray[index] = duration;
	}
}


// copyCodeToClipboard: copies code in codeForNES to clipboard
// Inspired by code from: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
function copyCodeToClipboard() {

	const copyText = codeForNES.innerHTML;

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
		entryPoint.appendChild(tempDiv);
	}
}




// updateCode: updates the code in codeforNES whenever 
// a note or the text in tempo is changed
function updateCode() {
	// Inform user of default changes that 
	// must be made to ASM6502 code:
	let codeUpdate = "; Add this to your code after the header: \n";
	codeUpdate += "rest equ $5E\n\n";
	codeUpdate += "Add this as the last line of the 'notes' table:\n";
	codeUpdate += "\t dw $0000 ; For rests!\n";
	
	codeUpdate += " ; Change the section birthday_notes to the following:\n\tdb "
	// Load in values from customSongPitchArray
	let currentIndex = 1;
	for (let i = 0; i < customSongPitchArray.length; i++) {
		// After 8th value, start a new line 
		// in ASM6502 code (for readability)
		if (currentIndex % 9 == 0) {
			codeUpdate += "\n\tdb ";
		}
		codeUpdate += customSongPitchArray[i]
		// Make sure not to add commas after last
		// note on any line:
		if (((i + 1) != customSongPitchArray.length)
			&& (currentIndex % 8 != 0)) {
			codeUpdate += ",";

		}
		currentIndex += 1;
	}

	codeUpdate += "\n\tdb 0 ; Zero indicates the song is over!\n";

	codeUpdate += "\n; Change the section birthday_length to the following:\n\tdb ";
	// Load in values from customSongDurationArray
	currentIndex = 1;
	for (let i = 0; i < customSongDurationArray.length; i++) {
		// After 8th value, start a new line 
		// in ASM6502 code (for readability)
		if (currentIndex % 9 == 0) {
			codeUpdate += "\n\tdb ";
		}
		// Items stored in customSongDurationArray are not always
		// int. This is so user can modify tempo and expect 
		// consistent calculated values based on that 
		// modification. However, ASM6502 only deals with
		// integers, so we parse whatever current values
		// are in the array into a form that the NES can use:
		codeUpdate += parseInt(customSongDurationArray[i]);
		if (((i + 1) != customSongDurationArray.length)
			&& (currentIndex % 8 != 0)) {
			codeUpdate += ",";
		}
		currentIndex += 1;
	}
	// Update textarea's innerHTML:
	codeForNES.innerHTML = codeUpdate;
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

	
	// If user confirmed, proceed with reset
	if (confirm == true) {
		let mainSong = document.getElementById("customSong");
		
		// temporarily remove app elements
		// from screen (to reinsert Song without
		// items being out of order)
		entryPoint.removeChild(mainSong);
		entryPoint.removeChild(codeForNES);
		entryPoint.removeChild(resetButton);
		entryPoint.removeChild(clipboardCopy);
		


		// If text div (from copying to clipboard)
		// exists, remove it from the screen:
		const textCopy = document.getElementById("text-copied");
		if (textCopy != null) textCopy.remove();

		// Re-create customSong
		customSong = new Song("customSong", [], null, canHighlight, 
		noteSpace, canModifyNotes, maxSongLength);
		

		// Re-append musicStaff, textarea, 
		// resetbutton, and clipboard button:
		entryPoint.appendChild(customSong.musicStaff);
		entryPoint.appendChild(codeForNES);
		entryPoint.appendChild(resetButton);
		entryPoint.appendChild(clipboardCopy);
		
		
	
		// Reset array lists for ASM6502 code:
		customSongDurationArray = [];
		customSongPitchArray = [];
			
		// Update code so textbox is up to date:
		updateCode();
	} // end of if condition
}
// End -->