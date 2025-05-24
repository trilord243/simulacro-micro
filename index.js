let currentUser = {
  username: "Camila",
  fullname: "",
  rooms: 0,
  destination: "",
  days: 0,
};

const screens = {
  mainScreen: document.getElementById("main-screen"),
  usernameScreen: document.getElementById("username-screen"),
  fullnameScreen: document.getElementById("fullname-screen"),
  roomsScreen: document.getElementById("rooms-screen"),
  destinationScreen: document.getElementById("destination-screen"),
  daysScreen: document.getElementById("days-screen"),
  confirmationScreen: document.getElementById("confirmation-screen"),
  userList: document.getElementById("users-list"),
};

const forms = {
  usernameForm: document.getElementById("username-form"),
  fullnameForm: document.getElementById("fullname-form"),
  roomsForm: document.getElementById("rooms-form"),
  destinationForm: document.getElementById("destination-form"),
  daysForm: document.getElementById("days-form"),
  confirmationForm: document.getElementById("confirmation-form"),
};

const buttons = {
  newRegistration: document.getElementById("new-registration-btn"),
  viewUsers: document.getElementById("view-users-btn"),
  backToMain: document.getElementById("back-to-main-btn"),
  backToMainMenu: document.getElementById("back-to-main-menu-btn"),
};

//Funcion nueva para iniciar un nuevo registro
function showScreen(screenName) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });
  screens[screenName].classList.add("active");
}

function startNewRegistration() {
  currentUser = {
    username: "",
    fullname: "",
    rooms: 0,
    destination: "",
    days: 0,
  };
  showScreen("usernameScreen");
}
username.addEventListener("invalid", () => {
  username.setCustomValidity("El nombre de usuario no puede estar vacío");
});

function handleSubmitUsername(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  currentUser.username = username;
  showScreen("fullnameScreen");
}

function handleSubmitFullname(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value.trim();
  currentUser.fullname = fullname;
  showScreen("roomsScreen");
}

function handleRoomsSubmit(event) {
  event.preventDefault();
  const rooms = parseInt(document.getElementById("rooms").value);
  currentUser.rooms = rooms;

  showScreen("destinationScreen");
}

function handleDestinationSubmit(event) {
  event.preventDefault();
  const destination = document.getElementById("destination").value.trim();
  currentUser.destination = destination;

  showScreen("daysScreen");
}

function handleDaysSubmit(event) {
  event.preventDefault();
  const days = parseInt(document.getElementById("days").value);
  currentUser.days = days;
  saveUser(currentUser);
  handleConfirmationScreen();
  showScreen("confirmationScreen");
}

function handleConfirmationScreen() {
  const tripSummary = document.getElementById("trip-summary");

  tripSummary.innerHTML = `
  <div class = "summary-item">
    <span class = "summary-label">Nombre de usuario:</span>
    <span class = "summary-value">${currentUser.username}</span>
  </div>
    <div class = "summary-item">
    <span class = "summary-label">Nombre de COmpleto :</span>
    <span class = "summary-value">${currentUser.fullname}</span>
  </div>

    <div class = "summary-item">
    <span class = "summary-label">Habitaciones:</span>
    <span class = "summary-value">${currentUser.rooms}</span>
  </div>
  
    <div class = "summary-item">
    <span class = "summary-label">DEstino:</span>
    <span class = "summary-value">${currentUser.destination}</span>
  </div>
  
 
  

  
  
  

  
  
  `;
}

function backToMainMenu() {
  showScreen("mainScreen");
}

function gotToUserList() {
  displayUsers();
  showScreen("userList");
}
//Todos los event listeners

document.addEventListener("DOMContentLoaded", () => {
  //Formularios

  forms.usernameForm.addEventListener("submit", handleSubmitUsername);
  forms.fullnameForm.addEventListener("submit", handleSubmitFullname);
  forms.roomsForm.addEventListener("submit", handleRoomsSubmit);
  forms.destinationForm.addEventListener("submit", handleDestinationSubmit);
  forms.daysForm.addEventListener("submit", handleDaysSubmit);

  //Butones
  buttons.newRegistration.addEventListener("click", startNewRegistration);
  buttons.backToMain.addEventListener("click", backToMainMenu);
  buttons.viewUsers.addEventListener("click", gotToUserList);
  buttons.backToMainMenu.addEventListener("click", backToMainMenu);
});

function saveUser(userData) {
  let users = getUsers();

  //Verigicar si el usuario existe

  const existingUserIndex = users.findIndex(
    (user) => user.username === userData.username
  );

  if (existingUserIndex !== -1) {
    users[existingUserIndex] = userData; // Actualizar el usuario existente
  } else {
    users.push(userData);
  }

  localStorage.setItem("travelUser", JSON.stringify(users));
  return userData;
}

function getUsers() {
  const users = localStorage.getItem("travelUser");

  return JSON.parse(users) || [];
}

function displayUsers() {
  const users = getUsers();
  [{}, {}];

  const userContent = document.getElementById("users-content");
  if (users.length === 0) {
    userContent.innerHTML = "<p>No hay usuarios registrados.</p>";
  } else {
    userContent.innerHTML = ""; // Limpiar el contenido anterior
    users.forEach((user) => {
      const userItem = document.createElement("div");
      userItem.innerHTML = `
      <div class="user-card">
                    <h3> ${user.fullname} (@${user.username})</h3>
                    <p><strong>📅 Fecha de registro:</strong> ${user.registrationDate}</p>
                    <div class="trip-info">
                        <p><strong>📍 Destino:</strong> <span> ${user.destination}</span></p>
                        <p><strong>🏨 Habitaciones:</strong> <span>${user.rooms}</span></p>
                        <p><strong>⏰ Duración:</strong> <span>${user.days} días</span></p>
                        <p><strong>🎉 Estado:</strong> <span>¡Listo para la aventura!</span></p>
                    </div>
                </div>
      `;
      userContent.appendChild(userItem);
    });
  }
}
