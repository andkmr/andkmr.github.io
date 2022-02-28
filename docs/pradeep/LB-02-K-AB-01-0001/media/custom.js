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
   
    var currentDragId, prevdragId;

    createGameElemnts();
   
   
    $('#teenabuttonmdpi').bind('click', function () {

        if (tenaTabFlag == false) {
            $("#teenabuttonmdpi").addClass("teenabuttonmdpi_back");
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
        } else {
            $("#teenabuttonmdpi").removeClass("teenabuttonmdpi_back");
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
        
    });
    // function for createGameElemnts
    function createGameElemnts() {

        $("#game_container").html("");

        // console.log(gamedata["gamedataQues"][currentQuestCtr]["bg"]);
        var myimageUrl = "media/assets/" + gamedata["gamedataQues"][currentQuestCtr]["bg"];
        $("#game_container").css('background-image', 'url(' + myimageUrl + ')');

        for (var i = 0; i < gamedata["gamedataQues"][currentQuestCtr]["dragItems"].length; i++) {
            $("<div/>", {
                'id': gamedata["gamedataQues"][currentQuestCtr]["dragItems"][i],
                'class': gamedata["gamedataQues"][currentQuestCtr]["drag_type"]
            }).appendTo('#game_container');

        }

        for (var j = 0; j < gamedata["gamedataQues"][currentQuestCtr]["dropItems"].length; j++) {
            $("<div/>", {
                'id': gamedata["gamedataQues"][currentQuestCtr]["dropItems"][j],
                'class': gamedata["gamedataQues"][currentQuestCtr]["drop_type"]
            }).appendTo('#game_container');
        }

        currentQuesTotalElm = gamedata["gamedataQues"][currentQuestCtr]["dropItems"].length;

        $("." + gamedata["gamedataQues"][currentQuestCtr]["drag_type"]).each(function (i) {
            $(this).attr('original-top', $(this).css('top'));
            $(this).attr('original-left', $(this).css('left'));
        });


        addDragEvents();

    }


    function addDragEvents() {
        // drag code start type1
        for (var i = 0; i < gamedata["gamedataQues"][currentQuestCtr]["dragItems"].length; i++) {
            $('#' + gamedata["gamedataQues"][currentQuestCtr]["dragItems"][i]).draggable({
                scroll: false,
                zIndex: 100,
                revert: function (p_bDropped) {
                    
                    if (!p_bDropped) {
                        // console.log("ccc")
                        tryagainaudio();
                        mascottryaudio();
                        wrongAttempCtr++;
                        $(this).animate({ top: parseFloat($(this).attr('original-top')), left: parseFloat($(this).attr('original-left')) }, 0, function () {
                        });
                    } else {
                        // console.log("vvv")
                    }
                },
                create: function (event, ui) {

                },
                start: function (event, ui) {
                    currentDragId = $(this).attr("id");
                },
                drag: function (event, ui) {
                    // console.log(DragDropScale.split(',')[0])
                    var changeLeft = ui.position.left;
                    var newLeft = changeLeft / DragDropScale.split(',')[0]; //newScale u can get jquery
                    var changeTop = ui.position.top;
                    var newTop = changeTop / DragDropScale.split(',')[0]; //newScale u can get jquery
                    ui.position.left = newLeft;
                    ui.position.top = newTop;
                    $('body').mouseleave(function () {
                        $('body').mouseup();
                    });

                },
                stop: function (event, ui) {
                    //console.log("draggable stop");
                }
            });
        }
        // close drag code type1

        // drop start type1
        // console.log(gamedata["gamedataQues"][currentQuestCtr]["dropItems"].length)
        for (var j = 0; j < gamedata["gamedataQues"][currentQuestCtr]["dropItems"].length; j++) {

            $('#' + gamedata["gamedataQues"][currentQuestCtr]["dropItems"][j]).droppable({
                accept: '#' + gamedata["gamedataQues"][currentQuestCtr]["dragItems"][j],
                activate: function (event, ui) {
                    //console.log("droppable activate");
                },
                deactivate: function (event, ui) {
                    //console.log("droppable deactivate");
                },
                out: function (event, ui) {
                    //console.log("droppable out");

                },
                over: function (event, ui) {
                    //console.log("droppable over" + $(this).attr('id'));
                },
                drop: function (ev, ui) {

                    if (prevdragId == currentDragId) {
                        // console.log("pre post")
                    } else {
                        // console.log("else pre post");
                        // console.log($(this).attr("id").split('_')[0] + "---" + currentDragId.split('_')[0]);

                        if ($(this).attr("id").split('_')[0] == currentDragId.split('_')[0]) {
                            $(this).droppable("disable");
                            $("#" + currentDragId).hide();
                            
                            var imageUrl = "media/assets/" + $(this).attr("id").split('_')[0] + ".png";
                            // console.log(imageUrl)
                            $(this).css('background-image', 'url(' + imageUrl + ')');
                            $(this).removeClass('animated zoomIn').addClass('animated zoomIn');
                            mycorrectaudio();
                            foundElementCtr++;
                            if(currentQuesTotalElm == foundElementCtr){
                                levelprogressbar();
                            }

                            $("#" + currentDragId).animate({ top: parseFloat($("#" + currentDragId).attr('original-top')), left: parseFloat($("#" + currentDragId).attr('original-left')) }, 0, function () {

                            });
                            $("#" + currentDragId).addClass("stopdrag");

                        } else {
                            tryagainaudio();
                            mascottryaudio();
                            wrongAttempCtr++;
                            // console.log("false..");
                            // $("#"+currentDragId).animate({ top: parseFloat($("#"+currentDragId).attr('original-top')), left: parseFloat($("#"+currentDragId).attr('original-left')) }, 0, function () {
                            // });
                            $("#" + currentDragId).addClass("stopdrag");
                        }
                    }
                    prevdragId = currentDragId;

                }
            });
        }
        // close drop code type1
    }

    function showGameEndScreen() {
        endScreeAudioFn();
        proudofYouAudioFn();
        $("#endScreen").show();
        if (wrongAttempCtr <= 1) {
            // console.log("star3")
            $("#star3").show();
        }
        if (wrongAttempCtr == 2) {
            // console.log("star2")
            $("#star2").show();
        }
        if (wrongAttempCtr >= 3) {
            // console.log("star1")
            $("#star1").show();
        }
    }

    function levelprogressbar() {
        
        if(currentQuestCtr == (gamedata["gamedataQues"].length - 1)){
        // if(currentQuestCtr == 0){
            showGameEndScreen();
        }else{
            supersoundfn();
            prevLevel++;
            nextLevel++;
            $("#prevNo").html(prevLevel);
            $("#nextNo").html(nextLevel);
            foundElementCtr = 0;
            levelBarCtr = 0;
            $("#levelProgressBar").css("width", "0px");
            $("#levelProgressBarbg").show();
            $("#levelProgressBarbg").animate({ "opacity": "1" }, 1000, function () {
                var mybar = setInterval(function () {
                    levelBarCtr++;
                    if (levelBarCtr == 335) {
                        clearInterval(mybar);
                        setTimeout(function () {
                            $("#levelProgressBarbg").hide();
                            currentQuestCtr++;
                            createGameElemnts();
                            // console.log(currentQuestCtr+"-----"+hiddenObjData["hiddenObjQues"].length);
                        }, 500)
    
                    }
                    $("#levelProgressBar").css("width", (1.93 * levelBarCtr) + "px");
                    // console.log(levelBarCtr);
    
                }, 3);
            });

        }
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

    var proudofyouaudio = document.createElement("audio");
    proudofyouaudio.src = "media/audio/i_am_so_proud_of_you.mp3";
    
    var correctinput = document.createElement("audio");
    correctinput.src = "media/audio/correct_input.mp3";

    var supersound = document.createElement("audio");
    supersound.src = "media/audio/super.mp3";
    

    var letaudio = document.createElement("audio");
    letaudio.src = "media/audio/" + gamedata["gamedataQues"][currentQuestCtr]["mascot_audio"] + ".mp3";

    var mascot_try_audio = document.createElement("audio");
    mascot_try_audio.src = "media/audio/" + gamedata["gamedataQues"][currentQuestCtr]["mascot_audio_try"] + ".mp3";

    var tryagainoptionaudio = document.createElement("audio");
    tryagainoptionaudio.src = "media/audio/tryagainoption.mp3";

    var tryagainoptionaudio2 = document.createElement("audio");
    tryagainoptionaudio2.src = "media/audio/tryagainoption2.mp3";


    function mascottryaudio(){
        mascot_try_audio.play();
    }

    function supersoundfn(){
        supersound.play();
    }

    function playbgm() {
        objPlayPauseMusic.play();
    }
    function endScreeAudioFn() {
        endScreeAudio.play();
    }
    function proudofYouAudioFn() {
        proudofyouaudio.play();
    }
    
    function mycorrectaudio() {
        correctinput.play();
    }
    function letbeginaudio() {
        letaudio.play();
    }
    function tryagainaudio() {
        tryagainoptionaudio.play();
    }
    function tryagainaudio2() {
        tryagainoptionaudio2.play();
    }




});


/*-- Document Ready End --*/







