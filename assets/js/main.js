const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

// Initialize local storage variables
let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

// Set initial values if they don't exist
if (coins === null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total === null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power === null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count === null) {
    localStorage.setItem('count', '1');
}

// Fetch user ID and username from your server
async function fetchUserData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_user_data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched user data:', data);  // Log the fetched user data
        return { userId: data.user_id, username: data.username };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { userId: null, username: null }; // Return nulls if fetching fails
    }
}

// Event listener for coin image click
image.addEventListener('click', async (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    // Check if power is available
    if (Number(power) > 0) {
        const updatedCoins = Number(coins) + 1;
        localStorage.setItem('coins', `${updatedCoins}`);
        h1.textContent = updatedCoins.toLocaleString();

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;

        // Fetch user data dynamically
        const { userId, username } = await fetchUserData();

        // Log user data
        console.log('Fetched user ID:', userId); // Log user ID
        console.log('Fetched username:', username); // Log username

        if (userId && username) {
            // Prepare coin data for the server
            const coinData = {
                user_id: userId,
                username: username,
                coins: updatedCoins
            };

            // Log coin data before sending
            console.log('Coin data to be sent:', coinData);

            // Send coin data to the Flask server
            fetch('http://127.0.0.1:5000/save_coins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(coinData)
            })
            .then(response => {
                console.log('Response from server:', response); // Log the server response
                return response.json();
            })
            .then(data => {
                console.log('Coin data saved:', data);
                alert("Coin data saved successfully!");
            })
            .catch((error) => {
                console.error('Error saving coin data:', error);
                alert("Error saving coin data! Please try again.");
            });
        } else {
            alert("Unable to fetch user data. Please reload the page.");
        }
    }

    // Visual feedback on click
    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    // Reset transformation after a delay
    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px) scale(1.1)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// Replenish power over time
setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    total = localStorage.getItem('total');

    if (Number(total) > Number(power)) {
        const newPower = Number(power) + Number(count);
        localStorage.setItem('power', `${newPower}`);
        body.querySelector('#power').textContent = `${newPower}`;
        body.querySelector('.progress').style.width = `${(100 * newPower) / total}%`;
    }
}, 1000);
