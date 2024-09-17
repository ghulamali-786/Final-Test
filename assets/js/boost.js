document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]; 
    let coins = Number(localStorage.getItem('coins')) || 0;
    const balanceElement = document.querySelector('#balance');
    const chargeButton = document.querySelector('#charge');

    // Update balance on page load
    balanceElement.textContent = coins.toLocaleString();

    // Function to check if a reward can be claimed for a specific button
    function canClaimReward(buttonId) {
        const lastClaimDate = localStorage.getItem(`lastClaimDate_${buttonId}`);
        return lastClaimDate !== today;
    }

    // Reusable function for adding coins with a 10-second delay
    function addCoinsWithDelay(button, amount, buttonId) {
        button.addEventListener('click', () => {
            if (canClaimReward(buttonId)) {
                // Set a 10-second delay before updating coins
                setTimeout(() => {
                    coins += amount;
                    localStorage.setItem('coins', coins); 
                    balanceElement.textContent = coins.toLocaleString(); 
                    localStorage.setItem(`lastClaimDate_${buttonId}`, today); // Save claim status for this button
                    button.textContent = 'Completed'; // Update button text to show completed
                }, 10000); // 10 seconds delay
            }
        });
    }

    // All turbo buttons with their respective coin rewards and button IDs
    const turboButtons = [
        { button: document.querySelector('#turboButton'), amount: 500, id: 'turboButton' },
        { button: document.querySelector('#turboButton1'), amount: 300, id: 'turboButton1' },
        { button: document.querySelector('#turboButton2'), amount: 300, id: 'turboButton2' },
        { button: document.querySelector('#turboButton3'), amount: 500, id: 'turboButton3' },
        { button: document.querySelector('#turboButton4'), amount: 300, id: 'turboButton4' },
        { button: document.querySelector('#turboButton5'), amount: 500, id: 'turboButton5' },
        { button: document.querySelector('#turboButton6'), amount: 500, id: 'turboButton6' },
        { button: document.querySelector('#turboButton7'), amount: 500, id: 'turboButton7' },
        { button: document.querySelector('#turboButton8'), amount: 500, id: 'turboButton8' },
        { button: document.querySelector('#turboButton9'), amount: 500, id: 'turboButton9' },
        { button: document.querySelector('#turboButton10'), amount: 500, id: 'turboButton10' }
    ];

    // Add event listeners to all turbo buttons with delay
    turboButtons.forEach(item => addCoinsWithDelay(item.button, item.amount, item.id));

    // Charge reward button logic with a 10-second delay
    chargeButton.addEventListener('click', () => {
        if (canClaimReward('chargeButton')) {
            setTimeout(() => {
                coins += 3; 
                localStorage.setItem('coins', coins); 
                balanceElement.textContent = coins.toLocaleString(); 
                localStorage.setItem('lastClaimDate_chargeButton', today); // Save claim status for charge button
                chargeButton.textContent = 'Completed'; // Update button text to show completed
            }, 10000); // 10 seconds delay
        }
    });
});
