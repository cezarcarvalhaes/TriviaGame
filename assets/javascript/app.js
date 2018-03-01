$(document).ready (function() {

var questionArr = [
    {question:"When was the war of 1812?", 
      a:"1912",
      b:"1763",
      c:"1941",
      answer:"1812"
    },
    {question:"What is Genghis Khan's real name?", 
    a: "Xi Jinping",
    b:"Chinggis",
    c:"Babar",
    answer:"Temujin"
    },
    
]


//Start Game
    $(".start").on("click",function(){
        $(".start").remove();
    //Prints random question and answer choices
    var r = Math.floor(Math.random() * (questionArr.length));
    
    //Display Question:
    $(".interface").append('<div class="question"><p>'+ questionArr[r].question+'</p></div>');
    
    //Array shuffler (Fisher-Yates algorithm):
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }
    //Array of functions so we can randomize answer choices
    var answerChoices=[choice1(),choice2(),choice3(),choice4()];
    answerChoices = shuffle(answerChoices);
    console.log(answerChoices)

    function choice1(){
    $(".interface").append('<div class="choices"><p>'+ questionArr[r].a +'</p></div>')
    };
    function choice2(){
    $(".interface").append('<div class="choices"><p>'+ questionArr[r].b +'</p></div>')  
    };
    function choice3(){
    $(".interface").append('<div class="choices"><p>'+ questionArr[r].c +'</p></div>')
    };
    function choice4(){
    $(".interface").append('<div class="choices"><p>'+ questionArr[r].answer +'</p></div>')
    };
    
    //User selects answer
        $(".choices").on("click",function(){
            if ($(this).text() === questionArr[r].answer) {
                $(this).addClass('correct');
                var newScore = parseInt($("#score").text());
                $("#score").html(newScore+10);
                console.log("Correct!");
            }
            else {
                $(this).addClass('wrong');
                var newScore = parseInt($("#score").text());
                $("#score").html(newScore-10);
                console.log(this.text)
            }
        });

    })

});