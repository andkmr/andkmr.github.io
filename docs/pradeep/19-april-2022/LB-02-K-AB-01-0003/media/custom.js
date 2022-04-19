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

    var animActQueCtr = 0;

    var animActivityStatus = true;
    var tabActivityStatus = false;
    var dragActivityStatus = false;
    var tabActQueCtr = 0;
    var tabActArrQueCtr = 0;
    var currentTabTotalQue = 0;
    var tabCorrectCtr = 0;


    var currentDragId, prevdragId;
    gamePlayAnimation();

    

    function gamePlayAnimation() {
        $("<div/>", {
            'id': "gameplayanim",
            'class': "gameplayanim"
        }).appendTo('#game_container');

        setTimeout(function () {
            animslid2();
        }, 12000)
    }
    function animslid2() {
        mydragitemaudio("they_present_our_hands_a2");
        $("#gameplayanim").addClass("gameplayanim2");
        $("#anim2").show();
        $("#anim3").show();
        $("#anim4").show();
        animActQueCtr++;
        setTimeout(function () {
            animslid3();
        }, 12000)
    }
    function animslid3() {
        mydragitemaudio("germs_can_enter_body_a3");
        $("#anim2").hide();
        $("#anim3").hide();
        $("#anim4").hide();
        $("#gameplayanim").removeClass("gameplayanim2").addClass("gameplayanim3");
        animActQueCtr++;
        setTimeout(function () {
            animslid4();
        }, 12000)
    }
    function animslid4() {
        mydragitemaudio("so_we_should_always_take_care_a4");
        $("#gameplayanim").removeClass("gameplayanim3").addClass("gameplayanim4");
        $("#anim5").show();
        animActQueCtr++;
        setTimeout(function () {
            $("#anim5").hide();
            createTabActivity();
            animActivityStatus = false;
            tabActivityStatus = true;
        }, 12000)
    }

    // createTabActivity();

    $('#teenabuttonmdpi').bind('click', function () {

        if (tenaTabFlag == false) {
            // $("#teenabuttonmdpi").addClass("teenabuttonmdpi_back");
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
            // $("#teenabuttonmdpi").removeClass("teenabuttonmdpi_back");
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
        // $('#teenamdpi').css("z-index", 0);

        playbgm();
        letbeginaudio();
        clearTimeout(quesPopupTimer);
        $("#questionBox").show();
        $("#questionBox").removeClass('animated zoomIn').addClass('animated zoomIn');

    });

    // function for createTabActivity
    function createTabActivity() {
        if(tabActQueCtr ==0){
            $("#wrapper").removeClass("background_1").addClass("background_2");
        }
        if(tabActQueCtr ==1){
            $("#wrapper").removeClass("background_2").addClass("background_3");
        }
        if(tabActQueCtr ==2){
            $("#wrapper").removeClass("background_3").addClass("background_4");
        }
        
        $("#game_container").html("");

        // console.log(gamedata["gamedataQues"][currentQuestCtr]["bg"]);

        try {
            var myimageUrl = "media/assets/" + gamedata["tabactivity"][tabActQueCtr]["bg"];
            $("#game_container").css('background-image', 'url(' + myimageUrl + ')');
        } catch (error) {

        }

        currentTabTotalQue = gamedata["tabactivity"][tabActQueCtr]["tabItems"].length;

        for (var i = 0; i < gamedata["tabactivity"][tabActQueCtr]["tabItems"].length; i++) {
            $("<div/>", {
                'id': gamedata["tabactivity"][tabActQueCtr]["tabItems"][i],
                'num': gamedata["tabactivity"][tabActQueCtr]["tabItemsHabbites"][i]
            }).appendTo('#game_container');

            $('#' + gamedata["tabactivity"][tabActQueCtr]["tabItems"][i]).bind('click', function () {
                tabActArrQueCtr++;
                $(this).removeClass('animated zoomIn').addClass('animated zoomIn');
                if ($(this).attr("num") == "yes") {
                    mycorrectaudio();
                    playtabaudio($(this).attr("id"));
                    tabCorrectCtr++;
                    $(this).addClass("correctAns");
                    if (currentTabTotalQue == tabActArrQueCtr || tabCorrectCtr == (gamedata["tabactivity"][tabActQueCtr]["totalCorrect"])) {
                        setTimeout(function () {
                            nextTabActivity();
                        }, 1000)
                        
                    }
                } else {
                    wrongAttempCtr++;
                    playwrongtabaudio(gamedata["tabactivity"][tabActQueCtr]["wrong_mascot_audio"]);
                    $(this).addClass("wrongAns");
                    if (currentTabTotalQue == tabActArrQueCtr) {
                        setTimeout(function () {
                            nextTabActivity();
                        }, 1000)
                    }
                }

            })

        }
    }

    function nextTabActivity() {
        allcorrecttabaudio(gamedata["tabactivity"][tabActQueCtr]["allcorrectaudio"]);
        if (tabActQueCtr == (gamedata["tabactivity"].length - 1)) {
            tabActivityStatus = false;
        }
        tabActArrQueCtr = 0;
        tabCorrectCtr = 0;
        levelprogressbar();
        
        
    }
    // function for createGameElemnts
    function createGameElemnts() {

        $("#game_container").html("");

        // console.log(gamedata["gamedataQues"][currentQuestCtr]["bg"]);
        
        $("#wrapper").removeClass("background_4").addClass("background_5");

        var myimageUrl = "media/assets/" + gamedata["gamedataQues"][currentQuestCtr]["bg"];
        $("#game_container").css('background-image', 'url(none)');

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
                        // tryagainaudio();
                        // mascottryaudio();
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

                        if ($(this).attr("id").split('_drop')[0] == currentDragId) {
                            $(this).droppable("disable");
                            $("#" + currentDragId).hide();

                            // var imageUrl = "media/assets/" + $(this).attr("id").split('_')[0] + ".png";
                            // $(this).css('background-image', 'url(' + imageUrl + ')');
                            $(this).css("opacity", 1);
                            $(this).removeClass('animated zoomIn').addClass('animated zoomIn');
                            mycorrectaudio();
                            mydragitemaudio(currentDragId);
                            foundElementCtr++;
                            if (currentQuesTotalElm == foundElementCtr) {
                                currentQuestCtr++;
                                levelprogressbar();
                            }

                            $("#" + currentDragId).animate({ top: parseFloat($("#" + currentDragId).attr('original-top')), left: parseFloat($("#" + currentDragId).attr('original-left')) }, 0, function () {

                            });
                            $("#" + currentDragId).addClass("stopdrag");

                        } else {
                            // tryagainaudio();
                            // mascottryaudio();

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
        $("#wrapper").removeClass("background_5");
        endScreeAudioFn();
        proudofYouAudioFn();
        $("#endScreen").show();
        if (wrongAttempCtr <= 1) {
            // console.log("star3")
            $("#star3").show();
            // window.location.href = window.location.href + "?gameEnd://score=3&ssetsCode=Code=LB-02-K-AB-01-0003"
        }
        if (wrongAttempCtr == 2) {
            // console.log("star2")
            $("#star2").show();
            // window.location.href = window.location.href + "?gameEnd://score=2&ssetsCode=Code=LB-02-K-AB-01-0003"
        }
        if (wrongAttempCtr >= 3) {
            // console.log("star1")
            $("#star1").show();
            // window.location.href = window.location.href + "?gameEnd://score=1&ssetsCode=Code=LB-02-K-AB-01-0003"
        }
    }

    function levelprogressbar() {

        // supersoundfn();
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
                        // tabActivityStatus = false;
                        $("#levelProgressBarStat").animate({ "top": "-40px" }, 500, function () {

                        });
                        $("#levelProgressBar").animate({ "top": "-40px" }, 500, function () {
                            
                            if (tabActivityStatus == true) {
                                // console.log("tab tab")
                                $("#levelProgressBarbg").hide();
                                tabActQueCtr++;
                                createTabActivity();
                            } else {
                                // console.log("drag drag");
                                $("#levelProgressBarbg").hide();
                                tabActivityStatus = false;
                                animActivityStatus = true;
                                createGameElemnts();
                            }
                        })

                    }, 500)

                }
                if (prevLevel == 1) {
                    $("#levelProgressBar").css("width", (1.71 * levelBarCtr) + "px");
                }
                if (prevLevel == 2) {
                    $("#levelProgressBar").css("width", (68.4 + (1.71 * levelBarCtr)) + "px");
                }
                if (prevLevel == 3) {
                    $("#levelProgressBar").css("width", ((68.4 * 2) + (1.71 * levelBarCtr)) + "px");
                }
                if (prevLevel == 4) {
                    $("#levelProgressBar").css("width", ((68.4 * 3) + (1.71 * levelBarCtr)) + "px");
                }
                if (prevLevel == 5) {
                    $("#levelProgressBar").css("width", ((68.4 * 4) + (1.71 * levelBarCtr)) + "px");
                }
                if (prevLevel == 6) {
                    $("#levelProgressBar").css("width", ((68.4 * 5) + (1.71 * levelBarCtr)) + "px");
                }
                if (prevLevel == 7) {
                    $("#levelProgressBar").css("width", ((68.4 * 6) + (1.71 * levelBarCtr)) + "px");
                }

                // console.log(levelBarCtr);

            }, 3);
        });

        if (currentQuestCtr == (gamedata["gamedataQues"].length)) {
            setTimeout(function () {
                showGameEndScreen();
            }, 1900)

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

    var mascot_try_audio = document.createElement("audio");
    mascot_try_audio.src = "media/audio/" + gamedata["gamedataQues"][currentQuestCtr]["mascot_audio_try"] + ".mp3";

    var tryagainoptionaudio = document.createElement("audio");
    tryagainoptionaudio.src = "media/audio/tryagainoption.mp3";

    var tryagainoptionaudio2 = document.createElement("audio");
    tryagainoptionaudio2.src = "media/audio/tryagainoption2.mp3";

    var tabaudio;
    var alltabcorrectaudio;
    var wrongtabaudio;
    var letdragaudio;
    var letaudio;

    function stopallaudio() {
        try {
            tabaudio.pause();
            alltabcorrectaudio.pause();
            wrongtabaudio.pause();
            letdragaudio.pause();
            letaudio.pause();
            tryagainoptionaudio2.pause();
            tryagainoptionaudio.pause();
            mascot_try_audio.pause();
            supersound.pause();
            proudofyouaudio.pause();
        } catch (error) {

        }

    }

    function playtabaudio(myid) {
        stopallaudio();
        tabaudio = document.createElement("audio");
        tabaudio.src = "media/audio/" + myid + ".mp3";
        tabaudio.play();
    }

    function allcorrecttabaudio(myid) {
        stopallaudio();
        alltabcorrectaudio = document.createElement("audio");
        alltabcorrectaudio.src = "media/audio/" + myid + ".mp3";
        alltabcorrectaudio.play();
    }

    function playwrongtabaudio(myid) {
        stopallaudio();
        wrongtabaudio = document.createElement("audio");
        wrongtabaudio.src = "media/audio/" + myid + ".mp3";
        wrongtabaudio.play();
    }

    function mascottryaudio() {
        stopallaudio();
        mascot_try_audio.play();
    }

    function supersoundfn() {
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
    function mydragitemaudio(myid) {
        stopallaudio();
        letdragaudio = document.createElement("audio");
        letdragaudio.src = "media/audio/" + myid + ".mp3";
        letdragaudio.play();
    }
    function letbeginaudio() {
        stopallaudio();
        if (animActivityStatus == true) {
            letaudio = document.createElement("audio");
            letaudio.src = "media/audio/" + gamedata["animationactivity"][animActQueCtr]["animaudio"] + ".mp3";
        }
        if (tabActivityStatus == true) {
            letaudio = document.createElement("audio");
            letaudio.src = "media/audio/" + gamedata["tabactivity"][tabActQueCtr]["mascot_audio"] + ".mp3";

        }
        if (dragActivityStatus == true) {
            letaudio = document.createElement("audio");
            letaudio.src = "media/audio/" + gamedata["gamedataQues"][currentQuestCtr]["mascot_audio"] + ".mp3";

        }
        letaudio.currentTime = 0;
        letaudio.pause();
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







