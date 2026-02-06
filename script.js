'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Ugo Francis',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-04-20T17:01:17.194Z',
    '2025-04-23T23:36:17.929Z',
    '2025-04-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Ayinda Mary',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Fortune Ankeli',
  movements: [4700, 7000, -1500, -290, -2210, -1040, 8500, -30],
  interestRate: 1.3,
  pin: 3333,

  movementsDates: [
    '2022-11-12T13:15:33.035Z',
    '2022-11-18T09:48:16.867Z',
    '2023-12-21T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2024-02-15T16:33:06.386Z',
    '2025-04-14T14:43:26.374Z',
    '2025-04-29T18:49:59.371Z',
    '2025-05-11T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Emmanuel Ankeli',
  movements: [800, 455.23, -406.5, 22000, -642.21, -1033.9, 79.97, 4300],
  interestRate: 1.2, // %
  pin: 4444,

  movementsDates: [
    '2019-11-28T21:31:17.178Z',
    '2019-12-07T07:42:02.383Z',
    '2024-01-30T09:15:04.904Z',
    '2024-04-30T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-07-20T17:01:17.194Z',
    '2025-04-18T23:36:17.929Z',
    '2025-05-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account5 = {
  owner: 'Elo-oghene Faith',
  movements: [7500, 6500, -3000, -190, 2910, -5040, 10500, -300],
  interestRate: 1.2,
  pin: 5555,

  movementsDates: [
    '2022-11-12T13:15:33.035Z',
    '2022-11-18T09:48:16.867Z',
    '2023-12-21T06:04:23.907Z',
    '2023-01-26T14:18:46.235Z',
    '2024-02-17T16:33:06.386Z',
    '2025-03-25T14:43:26.374Z',
    '2025-04-22T18:49:59.371Z',
    '2025-05-11T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////
// FUNCTIONS:
///////////////////////////////////

//REUSABLE FUNCTION FOR THE DATES OF THE MOVEMENTS:
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date); //returning the date in the movements in a localized way.
};

//REUSABLE FUNCTION TO FORMAT ANY VALUE, LOCALE, CURRENCY AND RETURN ANY VALUE TO THAT CURRENCY
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//FUNCTION FOR DISPLAYING THE TRANSACTION MOVEMENTS:
const displayMovements = function (acc, sort = false) {
  //emptying the entire container before we start adding new elements:
  containerMovements.innerHTML = ''; //innerHTML is similar to .textContent = 0;

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;

    //Tenary operator to Know if it is a deposit or a withdrawal:
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCurrency(movement, acc.locale, acc.currency);

    //Creating our HTML template
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
              <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    //adding/attaching the html into the movement container of the webpage:
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//FUNCTION FOR CALCULATING THE BALANCE OF THE MOVEMENTS AND PRINTING THE BALANCE TO OUR APPLICATION USER INTERFACE ON OUR APP:
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

//FUNCTION FOR CALCULATING THE INCOME, THE OUTCOME AND THE INTEREST THAT WILL BE PAID ACCORDING TO THEIR CONDITION:
const calcDisplaySummary = function (acc) {
  //Getting the INCOMES: (in)
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  //Getting the OUTCOMES: (out)
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  //Getting the INTERESTS: Lets say this bank pays different percentage of interests on each deposit if the interest is above 1€
  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //calculating the interest of at least 1€ before it can be added to the total interest:
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interests,
    acc.locale,
    acc.currency
  );
};

//FUNCTION FOR COMPUTING USERNAMES: when the usernames are the initials of each value of owner:
//This function helps us loop through the accounts array and gets the initials for each of the values:
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

//CREATING THE UNIVERSAL FUNCTION updateUI:
const updateUI = function (acc) {
  //DISPLAY MOVEMENTS:
  displayMovements(acc);

  //DISPLAY BALANCE:
  calcDisplayBalance(acc);

  //DISPLAY SUMMARY
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); //converting the seconds to minutes and seconds
    const sec = String(time % 60).padStart(2, 0); //take whatever remains by dividing the time by 60 with the remainder operator.

    //in each callback call, print the remaining time to the UI:
    labelTimer.textContent = `${min}:${sec}`;

    //When the timer is at 0s, stop timer and log out user:
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Decrease 1s i every function calls:
    time--;
  };

  //set time to 5mins:
  let time = 300;

  //call the timer every second:
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////
// EVENT HANDLERS:
//////////////////////////////

let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//EVENT HANDLER FOR LOG IN CREDENTIALS:
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from submitting

  //CHECKING THE CORRECTNESS OF THE USERNAME WITH THE find() method
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //CHECKING THE CORRECTNESS OF THE PIN/PASSWORD
  if (currentAccount?.pin === +inputLoginPin.value) {
    // currentAccountt?.pin is the same as currentAccountt && currentAccountt.pin. The one with the? is using optional chaining to see if it exists

    //iNCASE THE USERNAME AND PIN IS CORRECT, THEN:

    //DISPLAY UI AND A WELCOME MESSAGE:
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`; //This prints the first name of the owner of the account by using split(' ') at position [0] of the formed string.

    containerApp.style.opacity = 100; //Making the UI visible when logged in.

    //CREATE CURRENT DATE AND TIME:
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //CLEARING THE INPUT FIELDS:
    inputLoginUsername.value = inputLoginPin.value = ''; //Making the characters of the username and pin empty when logged in.
    inputLoginPin.blur(); //Removing the cursor focus in our log in input fields when logged in.

    //timer:
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount); //Calling the universal function updateUI to update the UI after every transaction
  }
});

//EVENT HANDLER FOR IMPLEMENTING TRANSFERS:
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //Preventing default behavior of auto reload

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //Clearing the input fields after doing a transaction:
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  //ADD TRANSFER DATE:
  currentAccount.movementsDates.push(new Date().toISOString());
  receiverAcc.movementsDates.push(new Date().toISOString());

  //Update the UI
  updateUI(currentAccount);

  //Reset the timer:
  clearInterval(timer);
  timer = startLogOutTimer();
});

//EVENT HANDLER FOR IMPLEMENTING THE LOAN REQUEST BTN: Only grants a loan if there is any deposit thats greater or equal 10% of the requested amount.
//Using the some() method in practice
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 0.1)) {
    setTimeout(function () {
      //Add the movement
      currentAccount.movements.push(amount);

      //ADD LOAN DATE:
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update the UI
      updateUI(currentAccount);

      //Reset the timer:
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }

  inputLoanAmount.value = ''; //Clearing the input field after every transaction:
});

//EVENT HANDLER FOR IMPLEMENTING THE BTN CLOSE ACCOUNT: with the findIndex() method and the splice() method
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    //Uisng the findIndex method to match the input for the account to be deleted:
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    //Delete Account:
    accounts.splice(index, 1);

    //Hide UI:
    containerApp.style.opacity = 0;
  }

  //Clearing the input field
  inputCloseUsername.value = inputClosePin.value = '';
});

//EVENT HANDLER FOR IMPLEMENTING THE SORT BTN

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
