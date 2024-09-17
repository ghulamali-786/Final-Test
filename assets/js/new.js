// Get task completion status from localStorage
const taskCompleted = localStorage.getItem('taskCompleted');
const checkmark = document.getElementById('checkmark');
//const completionMessage = document.getElementById('completionMessage');

// Array of button IDs
const buttonIds = [
  'turboButton',
  'turboButton1',
  'turboButton2',
  'turboButton3',
  'turboButton4',
  'turboButton5',
  'turboButton6',
  'turboButton7',
  'turboButton8',
  'turboButton9',
  'turboButton10'
];

// Function to set button state to 'Completed' if task is already done
function setButtonCompleted(button) {
  button.innerText = 'Completed';
  button.disabled = true;
  checkmark.style.display = 'inline';
  //completionMessage.style.display = 'block'; // Show message at the bottom
}

// Add click event listener and timeout function to each button
function addButtonClickListener(button) {
  button.addEventListener('click', function () {
    button.disabled = true;
    button.innerText = 'Processing...';
    
    // Simulate processing for 5 seconds before marking as completed
    setTimeout(function () {
      checkmark.style.display = 'inline';
      button.innerText = 'Completed';
      localStorage.setItem('taskCompleted', 'true');
    }, 10000);
  });
}

// Iterate over each button and apply the logic
buttonIds.forEach(function (id) {
  const button = document.getElementById(id);
  if (taskCompleted) {
    setButtonCompleted(button);
  } else {
    addButtonClickListener(button);
  }
});
