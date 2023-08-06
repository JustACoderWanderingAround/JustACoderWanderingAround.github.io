alert("remove me before submission, remember to enable hideall and show for pages");

// set up constants
var currentPage = 0;

// find all pages and save them
var allPages = document.querySelectorAll(".page");
console.log(allPages);

// find the buttons to display the pages
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page0btn = document.querySelector("#page0btn");
const usesPlaceholder = document.querySelector("#placeholder");
const partsPlaceholder = document.querySelector("#pplaceholder")
console.log("#page1btn");
console.log("#page2btn");
console.log("#page3btn");
console.log("#page4btn");

hideall();
show(0);

// functions for main menu page buttons
//hideall();
//show(0);
function hideall() { //function to hide all pages
    for (let onePage of allPages) { //go through all subtopic pages
        onePage.style.display = "none"; //hide it
    }
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    onepage.style.display = "block";
}
// Event listeners for buttons
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
  show(4);
});
page0btn.addEventListener("click", function() {
    show(0);
});


// For uses page
// Adopted from W3Schools.com
function openTab(evt, TabName) {

    closeAllTabs();
    
    // Show the current tab and set style visibility to "visible" so that placeholder text stays still, set placeholder to none.
    document.getElementById(TabName).style.display = "flex";
    document.getElementById(TabName).style.visibility = "visible";
    usesPlaceholder.style.display = "none";
    partsPlaceholder.style.display = "none";
}

function closeAllTabs() {

    // Declare all variables
    var i, tabcontent, tablinks;
    // // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].style.visibility = "hidden";
    }
     // Get all elements with class="tablinks" and remove the class "active"
     tablinks = document.getElementsByClassName("tablinks");
    //  for (i = 0; i < tablinks.length; i++) {
    //    tablinks[i].className = tablinks[i].className.replace(" active", "");
    //  }
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList += ".visuallyHidden";
    }
    usesPlaceholder.style.display = "flex";
    partsPlaceholder.style.display = "flex";
}

// For history page
// Intersection observer for scroll animation (tutorial from: https://www.youtube.com/watch?v=T33NN_pPeNI (I <3 fireship)) 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }

    });
});

// Pass relevant elements to intersection observer
const hiddenElement = document.querySelectorAll(".hidden");
hiddenElement.forEach(el => { observer.observe(el)});

class Accordion {
    constructor(el) {
      // Store the <details> element
      this.el = el;
      // Store the <summary> element
      this.summary = el.querySelector('summary');
      // Store the <div class="content"> element
      this.content = el.querySelector('.content');
  
      // Store the animation object (so we can cancel it if needed)
      this.animation = null;
      // Store if the element is closing
      this.isClosing = false;
      // Store if the element is expanding
      this.isExpanding = false;
      // Detect user clicks on the summary element
      this.summary.addEventListener('click', (e) => this.onClick(e));
    }
  
    onClick(e) {
      // Stop default behaviour from the browser
      e.preventDefault();
      // Add an overflow on the <details> to avoid content overflowing
      this.el.style.overflow = 'hidden';
      // Check if the element is being closed or is already closed
      if (this.isClosing || !this.el.open) {
        this.open();
      // Check if the element is being openned or is already open
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }
  
    shrink() {
      // Set the element as "being closed"
      this.isClosing = true;
      
      // Store the current height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the height of the summary
      const endHeight = `${this.summary.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(false);
      // If the animation is cancelled, isClosing variable is set to false
      this.animation.oncancel = () => this.isClosing = false;
    }
  
    open() {
      // Apply a fixed height on the element
      this.el.style.height = `${this.el.offsetHeight}px`;
      // Force the [open] attribute on the details element
      this.el.open = true;
      // Wait for the next frame to call the expand function
      window.requestAnimationFrame(() => this.expand());
    }
  
    expand() {
      // Set the element as "being expanding"
      this.isExpanding = true;
      // Get the current fixed height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the open height of the element (summary height + content height)
      const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(true);
      // If the animation is cancelled, isExpanding variable is set to false
      this.animation.oncancel = () => this.isExpanding = false;
    }
  
    onAnimationFinish(open) {
      // Set the open attribute based on the parameter
      this.el.open = open;
      // Clear the stored animation
      this.animation = null;
      // Reset isClosing & isExpanding
      this.isClosing = false;
      this.isExpanding = false;
      // Remove the overflow hidden and the fixed height
      this.el.style.height = this.el.style.overflow = '';
    }
  }
  
  document.querySelectorAll('details').forEach((el) => {
    new Accordion(el);
  });
// Get the HAMBORGAR BUTTON
const hamBtn = document.querySelector("#hamIcon");
// Event listener!!
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("#navbar");
// When toggle pressed menu do the slideyyyy
function toggleMenus() { /*open and close menu*/
    console.log("click");
    menuItemsList.classList.toggle("menuShow");
}


// ITS QUIZ TIME
// Questions
var quizQuestions = [
  //JSON Format questions
  // Contains attributes for questions asked, list of answers, and correct answer
  {
    question: "In what year were the earliest known descriptions of railways written?",
    answers: {
      a: "1515",
      b: "1642",
      c: "2123"
    },
    correctAnswer: 'a'
  },
  {
    question: "What kind of power system does NOT exist?",
    answers: {
      a: "Diesel Hydraulic",
      b: "Diesel Electric",
      c: "Steam Diesel"
    },
    correctAnswer: 'c'
  },
  {
    question: "What is the mechanism that connects train cars together called?",
    answers: {
      a: "Linker",
      b: "Coupler",
      c: "Connector"
    },
    correctAnswer: 'b'
  },
]



// Function gets elements required
function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// Store input and output
    var output = [];
    var answers;

    for (var i = 0; i<questions.length; i++) {
      answers = [];
      for (letter in questions[i].answers) {
        answers.push(
          '<label>'
					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ questions[i].answers[letter]
				+ '</label>'
        );
      }
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>' 
      );
    };
    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
	}

	function showResults(questions, quizContainer, resultsContainer){
	// gather answer containers from our quiz
	var answerContainers = quizContainer.querySelectorAll('.answers');
	
	// keep track of user's answers
	var userAnswer = '';
	var numCorrect = 0;
	
	// for each question...
    for (var i = 0; i < questions.length; i++) {

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // if answer is correct
      if (userAnswer === questions[i].correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

// get respective CSS elements for quiz.
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(quizQuestions, quizContainer, resultsContainer, submitButton);