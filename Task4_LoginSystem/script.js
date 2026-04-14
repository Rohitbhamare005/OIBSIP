let isLogin = true;

function toggleMode() {
    isLogin = !isLogin;

    document.getElementById("title").innerText = isLogin ? "Login" : "Register";

    document.querySelector(".switch span").innerText =
        isLogin ? "Register" : "Login";

    document.querySelector(".switch").innerHTML =
        isLogin
        ? `Don't have an account? <span onclick="toggleMode()">Register</span>`
        : `Already have an account? <span onclick="toggleMode()">Login</span>`;

    document.getElementById("message").innerText = "";
}

function submitForm() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    if (!username || !password) {
        message.innerText = "Please fill all fields";
        message.style.color = "red";
        return;
    }

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (isLogin) {
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            message.innerText = "Login successful ✅";
            message.style.color = "green";
        } else {
            message.innerText = "Invalid credentials ❌";
            message.style.color = "red";
        }
    } else {
        localStorage.setItem("user", JSON.stringify({ username, password }));
        message.innerText = "Registered successfully ✅";
        message.style.color = "green";
    }
}