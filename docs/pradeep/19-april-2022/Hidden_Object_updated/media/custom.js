/*-- Document Ready Starts --*/
$(document).ready(function () {

    // Declare all var and call functions and listeners
    var quesPopupTimer;
    var currentQuestCtr = 0;
    var levelBarCtr = 0;
    var foundElementCtr = 0;
    var currentQuesTotalElm = 0;
    var prevLevel = 0;
    var nextLevel = 1;
    var objectAnsArr = [];
    var wrongAttempCtr = 0;
    var hideObjIdArry = [];
    var hideObjIdArryCtr = 0;
    var tenaTabFlag = false;
    shuffleArray(hiddenObjData["hiddenObjQues"]);
    createGameNonHiddenElemnts();
    createGameElemnts();
    createNewQuestion();
    GetZoomIn();
    $('#teenabuttonmdpi').bind('click', function () {

        if(tenaTabFlag == false){
            $("#teenabuttonmdpi_slide").show();
            levelBarCtr = 0;
            var mybar = setInterval(function () {
                levelBarCtr++;
                if (levelBarCtr == 112) {
                    clearInterval(mybar);
                    $("#homeblack").animate({ "opacity": "1" }, 300, function () { });
                    $("#castblack").animate({ "opacity": "1" }, 300, function () { });
                }
                $("#teenabuttonmdpi_slide").css("width", (3 * levelBarCtr) + "px");
    
            }, 1);
            tenaTabFlag = true;
        }else{
            $("#homeblack").animate({ "opacity": "0" }, 100, function () { });
            $("#castblack").animate({ "opacity": "0" }, 100, function () { });
            levelBarCtr = 112;
            var mybar = setInterval(function () {
                levelBarCtr--;
                if (levelBarCtr == 0) {
                    clearInterval(mybar);
                    $("#teenabuttonmdpi_slide").hide();
                }
                $("#teenabuttonmdpi_slide").css("width", (3 * levelBarCtr) + "px");
    
            }, 1);
            tenaTabFlag = false;
        }
        
    });
    $('#teenamdpi').bind('click', function () {
        playbgm();
        letbeginaudio();
        clearTimeout(quesPopupTimer);
        $("#questionBox").show();
        $("#questionBox").removeClass('animated zoomIn').addClass('animated zoomIn');
        displayQuestions();
    });



    function createGameNonHiddenElemnts() {
        for (var i = 0; i < hiddenObjData["nonHiddenObjQues"].length; i++) {
            $("<div/>", {
                'id': hiddenObjData["nonHiddenObjQues"][i],
                'class': 'nonHidden'
            }).appendTo('#game_container');
        }
    }

    // function for createNewQuestion
    function createNewQuestion() {
        $("#questionText").html(hiddenObjData["hiddenObjQues"][currentQuestCtr]["question"]);

        currentQuesTotalElm = hiddenObjData["hiddenObjQues"][currentQuestCtr]["elements"].length;
        if (hiddenObjData["hiddenObjQues"][currentQuestCtr]["type"] == "objects") {
            window_obj_IN();
            currentQuesTotalElm = objectAnsArr.length;
        }

        for (var i = 0; i < hiddenObjData["hiddenObjQues"][currentQuestCtr]["elements"].length; i++) {
            $('#' + hiddenObjData["hiddenObjQues"][currentQuestCtr]["elements"][i]).removeClass("stopClick");
        }

        setTimeout(function () {
            $("#questionBox").show();
            displayQuestions();
        }, 1000);
    }
    // function for displayQuestions
    function displayQuestions() {
        $("#questionBox").removeClass('animated zoomIn').addClass('animated zoomIn');
        quesPopupTimer = setTimeout(function () {
            $("#questionBox").hide();
            clearTimeout(quesPopupTimer);
        }, 2000);
    }
    // function for createGameElemnts all correct 3 star, 1mis 3star, 2mis 2star 3or more 3star
    function createGameElemnts() {

        for (var i = 0; i < hiddenObjData["hiddenObjQues"].length; i++) {
            for (var j = 0; j < hiddenObjData["hiddenObjQues"][i]["elements"].length; j++) {
                $("<div/>", {
                    'id': hiddenObjData["hiddenObjQues"][i]["elements"][j],
                    'class': 'hiddenElements'
                }).appendTo('#game_container');

                $("<div/>", {
                    'class': "selected"
                }).appendTo('#' + hiddenObjData["hiddenObjQues"][i]["elements"][j]);

                hideObjIdArry[hideObjIdArryCtr] = hiddenObjData["hiddenObjQues"][i]["elements"][j];
                hideObjIdArryCtr++;

                $('#' + hiddenObjData["hiddenObjQues"][i]["elements"][j]).bind('click', function () {
                    
                    if (hiddenObjData["hiddenObjQues"][currentQuestCtr]["type"] == "objects") {
                        var myresult = false;

                        for (var z = 0; z < objectAnsArr.length; z++) {
                            if ($(this).attr("id") == objectAnsArr[z]) {
                                $(this).addClass("myselected");
                                foundElementCtr++;
                                mycorrectaudio();
                                myresult = true;
                                $(this).addClass("stopClick");
                                if (foundElementCtr == currentQuesTotalElm) {
                                    if (foundElementCtr == currentQuesTotalElm) {
                                        window_obj_Out();
                                        if ((currentQuestCtr + 1) == hiddenObjData["hiddenObjQues"].length) {
                                            showGameEndScreen();
                                        } else {
                                            setTimeout(function () {
                                                levelprogressbar();
                                            }, 500)
                                        }

                                    }

                                }
                            }
                        }
                        if (myresult == false) {
                            wrongAttempCtr++;
                            if(wrongAttempCtr == 1){
                                tryagainaudio();
                            }
                            if(wrongAttempCtr >= 2){
                                tryagainaudio2();
                            }
                        }

                    } else {
                        foundElementCtr++;
                        mycorrectaudio();
                        $(this).addClass("stopClick");
                        $(this).addClass("myselected");
                        if (foundElementCtr == currentQuesTotalElm) {
                            if ((currentQuestCtr + 1) == hiddenObjData["hiddenObjQues"].length) {
                                showGameEndScreen();
                            } else {
                                setTimeout(function () {
                                    levelprogressbar();
                                }, 500)
                            }

                        }
                    }

                });
                $('#' + hiddenObjData["hiddenObjQues"][i]["elements"][j]).addClass("stopClick");

                if (hiddenObjData["hiddenObjQues"][i]["type"] == "objects") {
                    // console.log(hiddenObjData["hiddenObjQues"][i]["elements"][j]);

                    // if(j < 6){
                    //     objectAnsArr[j] = hiddenObjData["hiddenObjQues"][i]["elements"][j];
                    //     $("<div/>", {
                    //         'class': "object " + hiddenObjData["hiddenObjQues"][i]["elements"][j]
                    //     }).appendTo('#hiddenShapesBox');
                    // }


                    $("<div/>", {
                        'class': "object " + hiddenObjData["hiddenObjQues"][i]["elements"][j]
                    }).appendTo('#hiddenShapesBox');

                }


            }

        }

        var parent = $("#hiddenShapesBox");
        var divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

        $(".object").each(function (i) {
            if (i <= 5) {
                const myArray = $(this).attr("class").split(" ", 3);
                objectAnsArr[i] = myArray[1];
            } else {
                $(this).hide();
            }


        });


        shuffleArray(hideObjIdArry);
        addAmination();
    }

    function showGameEndScreen() {
        endScreeAudio();
        $("#endScreen").show();
        if (wrongAttempCtr <= 1) {
            console.log("star3")
            $("#star3").show();
        }
        if (wrongAttempCtr == 2) {
            console.log("star2")
            $("#star2").show();
        }
        if (wrongAttempCtr >= 3) {
            console.log("star1")
            $("#star1").show();
        }
    }

    function addAmination() {
        for (var i = 0; i < hideObjIdArry.length; i++) {
            $("#" + hideObjIdArry[i]).removeClass('animated bounceIn');
        }
        var myAnimCtr = 0;
        var myInterVal = setInterval(function () {
            $("#" + hideObjIdArry[myAnimCtr]).removeClass('animated bounceIn').addClass('animated bounceIn');
            myAnimCtr++;
            if (myAnimCtr == hideObjIdArry.length) {
                clearInterval(myInterVal);
                addAmination();
            }
        }, 1000);

    }
    function levelprogressbar() {

        $(".hiddenElements").each(function () {
            $(this).removeClass("myselected");
        });

        prevLevel++;
        nextLevel++;
        $("#prevNo").html(prevLevel);
        $("#nextNo").html(nextLevel);
        foundElementCtr = 0;
        levelBarCtr = 0;
        $("#levelProgressBarbg").css("opacity", "1");
        $("#levelProgressBarbg").show();
        $("#levelProgressBarStat").animate({ "top": "40px" }, 500, function () {

        });
        $("#levelProgressBar").animate({ "top": "40px" }, 500, function () {

        });

        setTimeout(function () {
            $("#maskdiv").addClass("maskdiv");
            $("#maskdiv").addClass("myzidex");
            setTimeout(function () {
                $("#maskdiv").removeClass("maskdiv");
                $("#maskdiv").removeClass("myzidex");
            }, 1000)
        }, 1000)

        $("#levelProgressBar").animate({ "top": "40px" }, 500, function () {
            var mybar = setInterval(function () {
                levelBarCtr++;
                if (levelBarCtr == 40) {
                    clearInterval(mybar);
                    setTimeout(function () {
                        $("#levelProgressBarStat").animate({ "top": "-40px" }, 500, function () {

                        });
                        $("#levelProgressBar").animate({ "top": "-40px" }, 500, function () {
                            $("#levelProgressBarbg").hide();
                            currentQuestCtr++;
                            createNewQuestion();
                        })
                        
                        // console.log(currentQuestCtr+"-----"+hiddenObjData["hiddenObjQues"].length);
                    }, 500)

                }
                // $("#levelProgressBar").css("width", (1.93 * levelBarCtr) + "px");

                if (prevLevel == 1) {
                    $("#levelProgressBar").css("width", (2.05 * levelBarCtr) + "px");
                }
                if (prevLevel == 2) {
                    $("#levelProgressBar").css("width", (96 + (2.05 * levelBarCtr)) + "px");
                }
                if (prevLevel == 3) {
                    $("#levelProgressBar").css("width", ((96 * 2) + (2.05 * levelBarCtr)) + "px");
                }
                if (prevLevel == 4) {
                    $("#levelProgressBar").css("width", ((96 * 3) + (2.05 * levelBarCtr)) + "px");
                }
                if (prevLevel == 5) {
                    $("#levelProgressBar").css("width", ((96 * 4) + (2.05 * levelBarCtr)) + "px");
                }
                if (prevLevel == 6) {
                    $("#levelProgressBar").css("width", ((96 * 5) + (2.05 * levelBarCtr)) + "px");
                }
                if (prevLevel == 7) {
                    $("#levelProgressBar").css("width", ((96 * 6) + (2.05 * levelBarCtr)) + "px");
                }
                
                

            }, 3);
        });

    }
   
    function window_obj_IN(){
        $("#hiddenShapesBox").animate({
            right: '0px'
        }, 1000);
    }
    function window_obj_Out(){
        $("#hiddenShapesBox").animate({
            right: '-310px'
        }, 1000);
    }

    $('#replayBtn').bind('click', function () {
        location.reload();
    });
    $('#exitBtn').bind('click', function () {
        window.close();
    });

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    var objPlayPauseMusic = document.createElement("audio");
    objPlayPauseMusic.src = "media/audio/bgm.mp3";
    objPlayPauseMusic.addEventListener('ended', playbgm);

    var endScreeAudio = document.createElement("audio");
    endScreeAudio.src = "media/audio/correct_celebration.mp3";

    var correctinput = document.createElement("audio");
    correctinput.src = "media/audio/correct_input.mp3";

    var letaudio = document.createElement("audio");
    letaudio.src = "media/audio/LetBeginInteraction.mp3";

    var tryagainoptionaudio = document.createElement("audio");
    tryagainoptionaudio.src = "media/audio/tryagainoption.mp3";

    var tryagainoptionaudio2 = document.createElement("audio");
    tryagainoptionaudio2.src = "media/audio/tryagainoption2.mp3";

    


    function playbgm() {
        objPlayPauseMusic.play();
    }
    function endScreeAudio() {
        endScreeAudio.play();
    }
    function mycorrectaudio() {
        correctinput.play();
    }
    function letbeginaudio() {
        LetBeginInteraction.play();
    }
    function tryagainaudio() {
        tryagainoptionaudio.play();
    }
    function tryagainaudio2() {
        tryagainoptionaudio2.play();
    }
    
    
    

});


/*-- Document Ready End --*/







