let size, length, piece, box, columns, rows, color, boxInterval,
    time = 0,
    submit = document.getElementById("submit"),
    form = document.getElementById("form"),
    fields = document.getElementById("user-input"),
    middleRow = document.getElementById("middle-row"),
    topRow = document.getElementById("top-row"),
    bottomRow = document.getElementById("bottom-row"),
    words = ["Loud", "Soft", "Fast", "Slow", "Grow", "Shrink", "Short", "Long", "Sing", "Speak", "Sweet", "Sour", "Even", "Odd", "Mimic", "Compliment"];
    colors = [
        "F0FFFF",
        "FFEBCD",
        "DEB887",
        "7FFF00",
        "7FFFD4",
        "6495ED",
        "FF7F50",
        "00FFFF",
        "BDB76B",
        "FF8C00",
        "9932CC",
        "FF1493",
        "FFD700",
        "CD5C5C",
        "90EE90",
        "DB7093"
    ];

//removes user input fields and top row
formRemoval = () => {
    topRow.style.cssText = `-webkit-animation: fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                            animation: fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;`;
    fields.style.cssText = `-webkit-animation: fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                            animation: fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;`;
    
                            //form remove - 1000ms delay
    setTimeout(() => {
        form.remove();
        console.log("%cdelay 1000ms\nForm removed", 'background-color: yellow; color: black; font-weight: bold;');
    }, 1000);
}

//generates random color
randomColor = () => {
    color = colors[Math.floor(Math.random() * (colors.length - 1))];
    colors.splice(colors.indexOf(color), 1);
    return color
}

//makes grid based on value
gridMaker = (val) => {
    columns = [], rows = ["1fr"];
    for (let i = 1; i <= val; i++) {
        if (i <= 4) { columns.push("1fr"); }

        if (i % 5 === 0) { rows.push("1fr"); }
    }

    //grid foundation - 1500ms delay
    setTimeout(() => {
        console.log("%cdelay 2000ms\nColumns: %s\nRows: %s", "background-color: green; color: white; font-weight: bold", columns.join(" "), rows.join(" "));
    }, 2000);
}

//makes div with grid 
pieceGrid = () => {
    piece = document.createElement("div");
    piece.setAttribute("id", "piece");
    piece.setAttribute("class", "col");

    //grid to div - 2000ms delay
    setTimeout(() => {
        piece.style.cssText = `display: grid;
                               grid-template-columns: ${columns.join(" ")};
                               grid-template-rows: ${rows.join(" ")};
                               grid-gap: 5px;`;
        middleRow.append(piece);
    }, 2000);
}

//fills grid with boxes
boxMaker = (val) => {
    //fill grid - 2500ms delay
    setTimeout(() => {
        for (let i = 1; i <= val; i++) {
            if (i > 16) { document.getElementById(`box${i -16}`).innerHTML = i - 16 + ", " + i; }
            else {
                box = document.createElement("div");
                boxText = document.createElement("p");
                box.setAttribute("id", `box${i}`);
                boxText.setAttribute("id", `boxText${i}`);
                boxText.setAttribute("class", "h1 text-center");
                box.style.cssText = `display: flex;
                                     justify-content: center;
                                     align-items: center;
                                     background-color: #${randomColor()};
                                     opacity: 1;
                                     border: 3px solid black;
                                     visibility: visible;
                                     border-radius: 5%;
                                     padding-top: 10%;
                                     padding-bottom: 10%;
                                     -webkit-animation: fade-in-bck 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                                     animation: fade-in-bck 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;`;
                document.getElementById("piece").append(box)
                document.getElementById(`box${i}`).append(boxText);
                boxText.innerHTML = i;
            }
        }
    }, 2500);
}

//checks user input - assigns to variables if inputs are valid
sizeAndLength = () => {
    let regex = /(?<=-)\d|[a-z]|[.,\/#!$%\^&\*;:{}=\-_`~()]/gi;
    size = document.getElementById("players").value;
    length = document.getElementById("length").value;

    if (size.length === 0 || length.length === 0) { alert("Fill in both fields."); }
    else if (size > 16) { alert("ensemble size should be no larger than 16.")}
    else if (regex.test(size) || regex.test(length)) { alert("Both values should be positive numbers."); }
    else { 
        formRemoval(); 
        gridMaker(size); 
        pieceGrid(); 
        boxMaker(size); 
        boxStartTime(size);
        boxTimeChecker(size, length);
    }

    console.log("%cdelay 0ms\nUser inputs:\nSize: %s players\nLength: %s minutes", "background-color: gray; font-weight: bold;", size, length);
}


let randTime,
    timeArrayRand = [],
    timeArrayCounter = [],
boxStartTime = (val) => {
    setTimeout(() => {
        for (let i = 0; i <= val - 1; i++) {
            randTime = Math.floor(Math.random() * (12000 - 5000) + 5000);
            timeArrayRand.push(randTime);
            timeArrayCounter.push(0);
        }
        console.log(`%cdelay 3000ms\n${timeArrayRand}`, "background-color: orange; font-weight: bold; color: black;")
    }, 3000) 
} 

let timeCheckInterval, timeCounter = 0, totalTimeCounter = 0;
boxTimeChecker = (val, val2) => {
    setTimeout(() => {
        timeCheckInterval = setInterval(() => {
            boxTimeCheckerEnd(val2);
            boxVisibility();
            boxWordContents();
            timerFeed();

            for (let i = 0; i <= val - 1; i++) {
                timeArrayCounter.splice(i, 1, timeArrayCounter[i] + 1000);

                if(timeArrayCounter[i] >= timeArrayRand[i]) {
                    timeArrayCounter.splice(i, 1, 0);
                    timeArrayRand.splice(i, 1, Math.floor(Math.random() * (20000 - 12000) + 12000));
                } 
            }

            timeCounter += 1000;
            totalTimeCounter += 1000;

            console.log(timeArrayRand);
            console.log(timeArrayCounter);
        }, 1000);
        console.log("%cdelay 4000ms\nTimer started", "background-color: turquoise; color: black; font-weight: bold;")
    }, 4000);
}

let timerText, secondsTracker = 0;
timerFeed = () => {
    setTimeout(() => {
        if (totalTimeCounter === 0) {
            document.getElementById("bottom-row").animate([
                {
                    visibility: "hidden",
                    opacity: 0
                },
                {
                    visibility: "visible",
                    opacity: 1
                }], {
                    duration: 1000,
                    iterations: 1,
                    fill: "forwards"
            });
        }
    
        let minutes = Math.floor(totalTimeCounter / 60000);
        
        if(totalTimeCounter % 60000 === 0) {
            secondsTracker = 0;
        } else {
            secondsTracker += 1000;
        }
        
        let seconds = secondsTracker / 1000;

        if (seconds < 10) {
            timerText = minutes + ":0" + seconds;
        } else {
            timerText = minutes + ":" + seconds;
        }
        document.getElementById("timer").innerHTML = timerText;
    }, 5000);
}

//fades box out of view
fadeOut = (val, dur) => {
    if (val.style.visibility !== "hidden") {
        val.animate([
            { 
                visibility: "visible",
                opacity:  1 
            },
            { 
                visibility: "hidden",
                opacity: 0
            }
        ], {
            duration: dur,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in"
            
        });
        setTimeout(() => { 
            val.style.visibility = "hidden" 
        }, dur);
    }
}

//fades box into view
fadeIn = (val, dur) => {
    if (val.style.visibility !== "visible") {
        val.animate([
            {
                visibility: "hidden",
                opacity: 0
            },
            {
                visibility: "visible",
                opacity: 1
            }
        ], {
            duration: dur,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in"
        });
        setTimeout(()=> { val.style.visibility = "visible" }, dur);
    }
}

//visibility logic. Determines whether or not a box is visible.
boxVisibility = () => {
    console.log(time);
    for (let i = 0; i <= timeArrayCounter.length - 1; i++) {
        let box = document.getElementById(`box${i + 1}`);
        let rand = Math.random();
        if (totalTimeCounter < 4000) {
            box.style.visibility = "visible";
        }
        if (timeArrayCounter[i] === 5000 && totalTimeCounter > 4000) {
            if (rand >= 0.3) {
                fadeOut(box, 1000);
            } else {
                fadeIn(box, 1000);
            }
        }
    }
}

boxWordContents = () => {
    for (let i = 0; i <= timeArrayCounter.length - 1; i++) {
        let boxText = document.getElementById(`boxText${i + 1}`);
        let rand = Math.random();
        if (totalTimeCounter === 0) {
            boxText.animate([
                {
                    opacity: 1,
                    visibility: "visible"
                },
                {
                    opacity: 0,
                    visibility: "hidden"
                },
                {
                    opacity: 1,
                    visibility: "visible"
                }
            ], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",
            });
            setTimeout(() => { boxText.innerHTML = i + 1 + " - " + words[Math.floor(Math.random() * (words.length - 1))] }, 500);
        }
        if (totalTimeCounter > 4000) {
            if (timeArrayCounter[i] === 5000) {
                if (rand <= 0.35) {
                    boxText.animate([
                        {
                            opacity: 1,
                            visibility: "visible"
                        },
                        {
                            opacity: 0,
                            visibility: "hidden"
                        },
                        {
                            opacity: 1,
                            visibility: "visible"
                        }
                        ], {
                        duration: 1000,
                        iterations: 1,
                        fill: "forwards",
                    });
                    setTimeout(() => { boxText.innerHTML = i + 1 + " - " + words[Math.floor(Math.random() * (words.length - 1))] }, 500);
                }
            } else {
                boxText.innerHTML = boxText.innerHTML;
            }
        } else {
            boxText.innerHTML = boxText.innerHTML;
        }                  
    }
}

boxTimeCheckerEnd = (val) => {
    if (timeCounter >= val * 60000) {
        middleRow.animate([
            {
                visibility: "visible",
                opacity: 1
            },
            {
                visibility: "hidden",
                opacity: 0
            }
        ], {
            duration: 6000,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in"
        });
        setTimeout(() => { document.getElementById("piece").remove() }, 6000);
        setTimeout(() => {
            let ending = document.createElement("h1");
            ending.setAttribute("class", "display-1 text-center text-light");
            ending.setAttribute("style", "visiblity: hidden");
            ending.innerHTML = "Signals";
            middleRow.append(ending);
            middleRow.animate([
                {
                    visibility: "hidden",
                    opacity: 0
                },
                {
                    visibility: "visible",
                    opacity: 1
                }], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",
                easing: "ease-in"
            });
        }, 10000);
        setTimeout(() => {
            middleRow.animate([
                {
                    visibility: "visible",
                    opacity: 1
                },
                {
                    visibility: "hidden",
                    opacity: 0
                }
            ], {
                duration: 3000,
                iterations: 1,
                fill: "forwards",
                easing: "ease-in"
            });
        }, 13000);
        clearInterval(timeCheckInterval);
        console.log("%cPiece complete", "background-color: purple; font-weight; bold");
    }
}

submit.onclick = sizeAndLength;
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})