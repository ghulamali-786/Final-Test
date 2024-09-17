document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]; 
    let coins = Number(localStorage.getItem('coins')) || 0;
    const lastClaimDate = localStorage.getItem('lastClaimDate');
    const balanceElement = document.querySelector('#balance');
    const chargeButton = document.querySelector('#charge');

    // Update balance on page load
    balanceElement.textContent = coins.toLocaleString();

    // Function to check if a reward can be claimed
    function canClaimReward() {
        return lastClaimDate !== today;
    }

    // Reusable function for adding coins with a 10-second delay
    function addCoinsWithDelay(button, amount) {
        button.addEventListener('click', () => {
            if (canClaimReward()) {
                // Set a 10-second delay before updating coins
                setTimeout(() => {
                    coins += amount;
                    localStorage.setItem('coins', coins); 
                    balanceElement.textContent = coins.toLocaleString(); 
                    localStorage.setItem('lastClaimDate', today); 
                }, 10000); // 10 seconds delay
            }
        });
    }

    // All turbo buttons with their respective coin rewards
    const turboButtons = [
        { button: document.querySelector('#turboButton'), amount: 500 },
        { button: document.querySelector('#turboButton1'), amount: 300 },
        { button: document.querySelector('#turboButton2'), amount: 300 },
        { button: document.querySelector('#turboButton3'), amount: 500 },
        { button: document.querySelector('#turboButton4'), amount: 300 },
        { button: document.querySelector('#turboButton5'), amount: 500 },
        { button: document.querySelector('#turboButton6'), amount: 500 },
        { button: document.querySelector('#turboButton7'), amount: 500 },
        { button: document.querySelector('#turboButton8'), amount: 500 },
        { button: document.querySelector('#turboButton9'), amount: 500 },
        { button: document.querySelector('#turboButton10'), amount: 500 }
    ];

    // Add event listeners to all turbo buttons with delay
    turboButtons.forEach(item => addCoinsWithDelay(item.button, item.amount));

    // Charge reward button logic with a 10-second delay
    chargeButton.addEventListener('click', () => {
        if (canClaimReward()) {
            setTimeout(() => {
                coins += 3; 
                localStorage.setItem('coins', coins); 
                balanceElement.textContent = coins.toLocaleString(); 
                localStorage.setItem('lastClaimDate', today); 
            }, 10000); // 10 seconds delay
        }
    });
});
