// Main Function
// ========================================================
/**
 * Main wallet connection interaction
 */
const connect = async () => {
    console.group('connect');

    // Hide errors when trying to connect
    const devErrorConnect = document.getElementById('div-error-connect');
    devErrorConnect.innerHTML = '';
    devErrorConnect.classList = devErrorConnect.classList.value.includes('hidden')
        ? devErrorConnect.classList.value
        : `${devErrorConnect.classList.value} hidden`;

    // Attempt to connect to wallet with JSON-RPC request
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await ethereum.request({ method: 'eth_chainId' });

        // Disable connect button
        const buttonConnect = document.getElementById('button-connect');
        buttonConnect.setAttribute('disabled', true);
        buttonConnect.innerHTML = 'Connected';

        // Show connected section
        const sectionConnected = document.getElementById('section-connected');
        sectionConnected.classList = '';

        // Display wallet connected
        const preWalletAddress = document.getElementById('pre-wallet-address');
        preWalletAddress.innerHTML = accounts[0];

        // Display current network connected
        const preWalletNetwork = document.getElementById('pre-wallet-network');
        preWalletNetwork.innerHTML = `${chainId}`;
    } catch (error) {
        console.log({ error });
        devErrorConnect.innerHTML = error?.message ?? 'Unknown wallet connection error.'
        devErrorConnect.classList = devErrorConnect.classList.value.replaceAll('hidden', '');
    }
    console.groupEnd();
};

/**
 * Main function that disconnects from the browser
 */
const disconnect = () => {
    console.group('disconnect');
  
    // Hide connected section
    const sectionConnected = document.getElementById('section-connected');
    sectionConnected.classList = 'hidden';

    // Enabled connect button
    const buttonConnect = document.getElementById('button-connect');
    buttonConnect.removeAttribute('disabled');
    buttonConnect.innerHTML = 'Connect Wallet';
  
    console.groupEnd();
};

/**
 * Main function that handles the form request for a read JSON-RPC request
 * @param {*} event 
 */
const onSubmitEthBlockNumber = async (event) => {
    event.preventDefault();
    console.group('onSubmitEthBlockNumber');

  // Reset & Set Loading State
  const preEthBlockNumber = document.getElementById('pre-eth-blocknumber');
  const button = document.querySelector(`#${event.currentTarget.id} button`);
  button.setAttribute('disabled', true);
  button.innerHTML = `${button.innerHTML} (Loading...)`;

  // Attempt request for block number
  try {
    const result = await window.ethereum.request({
      method: 'eth_blockNumber'
    });

    console.log({ result });

    preEthBlockNumber.innerHTML = `${result}\n\n// Block Number:\n// ${parseInt(result, 16)}`;
  } catch (error) {
    console.log({ error });
    preEthBlockNumber.innerHTML = error?.message ?? 'Unknown JSON-RPC error.';
  }

  button.removeAttribute('disabled');
  button.innerHTML = "Get Block Number";
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init
 */
window.onload = async () => {
    console.log('WINDOW ONLOAD!');

    // Get All Elements
    const buttonConnect = document.getElementById('button-connect');
    const buttonDisconnect = document.getElementById('button-disconnect');
    const formEthBlockNumber = document.getElementById('form-eth-blocknumber');

    // Add Interactions
    buttonConnect.addEventListener('click', connect);
    buttonDisconnect.addEventListener('click', disconnect);
    formEthBlockNumber.addEventListener('submit', onSubmitEthBlockNumber);

    // Check if browser has wallet integration
    if (typeof window?.ethereum !== "undefined") {
        // Activate elements
        buttonConnect.removeAttribute('disabled');
        buttonConnect.innerHTML = "Connect Wallet";
    }
};

/**
 * Main function for the dice rolling game
 */

// Arrow buttons to toggle game sections
// Arrow buttons to toggle game sections
const arrowButtons = document.querySelectorAll('.arrow-button');

arrowButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked');
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        // Remove 'active-game-section' class from all sections
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.remove('active-game-section');
        });

        // Toggle 'active-game-section' class for the target section
        if (targetSection) {
            targetSection.classList.toggle('active-game-section');
        }
    });
});


const rollDice = () => {
    console.group('rollDice');

    const betAmount = parseInt(document.getElementById('betAmount').value);
    const preDiceResult = document.getElementById('pre-dice-result');

    if (betAmount <= 0) {
        preDiceResult.innerHTML = 'Please enter a valid bet amount.';
        console.groupEnd();
        return;
    }

    // Simulate rolling a six-sided dice
    const diceResult = Math.floor(Math.random() * 6) + 1;

    // Display the result
    preDiceResult.innerHTML = `You rolled: ${diceResult}`;

    // Check for win conditions
    if (diceResult === 6) {
        preDiceResult.innerHTML += `<br>Congratulations! You won ${betAmount * 2} coins! 🎉`;
    } else {
        preDiceResult.innerHTML += `<br>Sorry, you lost. Try again!`;
    }

    console.groupEnd();
};

/**
 * Main function for the coin flip game
 */
// Add event listener for coin flip button
const buttonFlipCoin = document.getElementById('button-flip-coin');
buttonFlipCoin.addEventListener('click', flipCoin);

// Function to flip the coin
function flipCoin() {
    const coinElement = document.getElementById('coin');
    const coinResultElement = document.getElementById('coin-result');

    // Simulate a random coin flip (0 for heads, 1 for tails)
    const result = Math.round(Math.random());

    // Add flip animation class
    coinElement.classList.add('flip');

    // After animation, update the result and remove the animation class
    setTimeout(() => {
        coinElement.classList.remove('flip');
        updateCoinResult(result);
    }, 600);
}

// Function to update the coin flip result
function updateCoinResult(result) {
    const coinResultElement = document.getElementById('coin-result');

    // Update the result text
    coinResultElement.textContent = result === 0 ? 'Heads!' : 'Tails!';
    coinResultElement.classList.add(result === 0 ? 'text-yellow-400' : 'text-green-400');
}

// Include the Flappy Bird game code below your existing code in scripts.js

/**
 * Flappy Bird Game
 */
const canvas = document.getElementById('flappy-bird-canvas');
const ctx = canvas.getContext('2d');

let birdY = canvas.height / 2;
let velocity = 0;
const gravity = 0.5;
const jumpStrength = 6;

function drawBird() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(50, birdY, 50, 30); // Adjusted the height of the bird for better visibility
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();

    birdY += velocity;
    velocity += gravity;

    // Collision detection with the ground
    if (birdY > canvas.height - 50) {
        birdY = canvas.height - 50;
        velocity = 0;
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        velocity = -jumpStrength;
    }
});

draw();
// ... (existing code) ...


// ... (existing code) ...
