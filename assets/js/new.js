// Get checkmark element
const checkmark = document.getElementById('checkmark');

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

// Function to set button state to 'Completed'
function setButtonCompleted(button) {
  button.innerText = 'Completed';
  button.disabled = true;
  checkmark.style.display = 'inline';
}

// Add click event listener and timeout function to each button
function addButtonClickListener(button, buttonId) {
  button.addEventListener('click', function () {
    button.disabled = true;
    button.innerText = 'Processing...';
    
    // Simulate processing for 10 seconds before marking as completed
    setTimeout(function () {
      button.innerText = 'Completed';
      button.disabled = true;
      checkmark.style.display = 'inline';
      localStorage.setItem(`taskCompleted_${buttonId}`, 'true'); // Store completion status for this specific button
    }, 10000);
  });
}

// Iterate over each button and apply the logic
buttonIds.forEach(function (id) {
  const button = document.getElementById(id);
  const taskCompleted = localStorage.getItem(`taskCompleted_${id}`); // Get task completion for this specific button
  
  if (taskCompleted) {
    setButtonCompleted(button); // If this button's task was already completed
  } else {
    addButtonClickListener(button, id); // Otherwise, add event listener to the button
  }
});
