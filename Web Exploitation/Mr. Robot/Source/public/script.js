// ==================== KONFIGURASI API ====================
// Ganti dengan URL backend API kamu nanti
const API_CONFIG = {
  baseURL: "http://localhost:5000/api", // Ganti dengan URL API backend kamu
  endpoints: {
    login: "/login",
    logout: "/logout",
    profile: "/profile",
  },
};

// ==================== CREDENTIALS KHUSUS ====================
const SPECIAL_CREDENTIALS = {
  username: "admin",
  password: "supersecretpassword",
};

// ==================== UTILITY FUNCTIONS ====================

// Fungsi untuk menampilkan notifikasi
function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// Fungsi untuk menampilkan loading
function showLoading(show) {
  let overlay = document.getElementById("loadingOverlay");

  if (!overlay && show) {
    overlay = document.createElement("div");
    overlay.id = "loadingOverlay";
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
  }

  if (overlay) {
    overlay.style.display = show ? "flex" : "none";
  }
}

// Fungsi untuk membersihkan error pada input
function clearInputError(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.classList.remove("error");
    const errorMsg = input.parentElement?.querySelector(".error-message");
    if (errorMsg) errorMsg.remove();
  }
}

// Fungsi untuk menampilkan error pada input
function showInputError(inputId, message) {
  const input = document.getElementById(inputId);
  if (input) {
    input.classList.add("error");

    const oldError = input.parentElement?.querySelector(".error-message");
    if (oldError) oldError.remove();

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "#f44336";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";
    input.parentElement?.appendChild(errorDiv);
  }
}

// Fungsi toggle password visibility
function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  if (!passwordInput) return;

  const toggleBtn = event?.target;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    if (toggleBtn) toggleBtn.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    if (toggleBtn) toggleBtn.textContent = "👁️";
  }
}

// ==================== VALIDATION FUNCTIONS ====================

// Validasi email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ==================== API CALLS ====================

// Fungsi untuk login
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username")?.value.trim();
  const password = document.getElementById("login-password")?.value;
  const remember = document.getElementById("remember-me")?.checked || false;

  // Validasi
  if (!username) {
    showToast("Harap masukkan username atau email!", "error");
    showInputError("login-username", "Username/Email wajib diisi");
    return;
  }

  if (!password) {
    showToast("Harap masukkan password!", "error");
    showInputError("login-password", "Password wajib diisi");
    return;
  }

  clearInputError("login-username");
  clearInputError("login-password");

  showLoading(true);

  try {
    // ========== CEK CREDENTIALS KHUSUS UNTUK FLAG ==========
    if (username === SPECIAL_CREDENTIALS.username && password === SPECIAL_CREDENTIALS.password) {
      showToast("Login berhasil! Mengalihkan ke halaman flag...", "success");

      // Simpan flag ke sessionStorage (opsional)
      sessionStorage.setItem("flag", "CTF{robots-txt-000}");
      sessionStorage.setItem("flagAccessed", "true");

      // Redirect ke page.html setelah 1 detik
      setTimeout(() => {
        window.location.href = "/ddggdcee55656c5c5cfjj7j7j7v/";
      }, 1000);

      showLoading(false);
      return;
    }

    // ========== SIMULASI LOGIN UNTUK USER BIASA (HAPUS INI SAAT SUDAH CONNECT KE BACKEND) ==========
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulasi validasi untuk user biasa
    if (username === "user" && password === "user123") {
      showToast("Login berhasil! Selamat datang.", "success");

      const userData = {
        id: 2,
        name: "Regular User",
        username: username,
        email: "user@example.com",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");

      if (remember) {
        localStorage.setItem("rememberedUser", username);
      }

      setTimeout(() => {
        showToast("Mengalihkan ke dashboard...", "info");
        // window.location.href = '/dashboard';
      }, 1500);
    } else {
      showToast("Username/Email atau password salah!", "error");
    }
    // ========== AKHIR SIMULASI ==========
  } catch (error) {
    console.error("Login error:", error);
    showToast("Terjadi kesalahan. Silakan coba lagi.", "error");
  } finally {
    showLoading(false);
  }
}

// Fungsi untuk logout
async function handleLogout() {
  showLoading(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("flag");
    sessionStorage.removeItem("flagAccessed");

    showToast("Logout berhasil!", "success");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.error("Logout error:", error);
    showToast("Terjadi kesalahan", "error");
  } finally {
    showLoading(false);
  }
}

// ==================== AUTO-FILL REMEMBERED USER ====================

function loadRememberedUser() {
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
    const usernameInput = document.getElementById("login-username");
    const rememberCheckbox = document.getElementById("remember-me");
    if (usernameInput) {
      usernameInput.value = rememberedUser;
    }
    if (rememberCheckbox) {
      rememberCheckbox.checked = true;
    }
  }
}

// ==================== CHECK AUTHENTICATION STATUS ====================

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (isLoggedIn && user) {
    console.log("User sudah login:", user);
    return true;
  }
  return false;
}

// ==================== INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  checkAuthStatus();
  loadRememberedUser();

  // Tambahkan efek focus pada input
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement?.classList.add("focused");
    });
    input.addEventListener("blur", function () {
      this.parentElement?.classList.remove("focused");
    });
  });

  // Clear errors saat typing
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  if (usernameInput) {
    usernameInput.addEventListener("input", () => clearInputError("login-username"));
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", () => clearInputError("login-password"));
  }
});

// ==================== EXPORT FUNCTIONS ====================
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
