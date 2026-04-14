let isLogin = true;

// AUTO LOGIN
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    window.location.href = "dashboard.html";
}

function toggleMode() {
    isLogin = !isLogin;

    document.getElementById("title").innerText =
        isLogin ? "Login" : "Register";

    document.querySelector(".switch").innerText =
        isLogin
        ? "Don't have an account? Register"
        : "Already have an account? Login";

    document.getElementById("message").innerText = "";
}

function submitForm() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    if (!username || !password) {
        message.innerText = "Fill all fields";
        message.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            message.innerText = "Invalid credentials ❌";
            message.style.color = "red";
        }

    } else {
        let exists = users.find(u => u.username === username);

        if (exists) {
            message.innerText = "User already exists ⚠️";
            message.style.color = "orange";
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        message.innerText = "Registered successfully ✅";
        message.style.color = "green";
    }
}