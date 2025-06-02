document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});

function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            showMainLayout(user);
        } else {
            showLoginScreen();
        }
    });
}

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    if (!email || !password) {
        errorElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    try {
        errorElement.textContent = '';
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error('Erro de login:', error);
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorElement.textContent = 'E-mail ou senha incorretos.';
                break;
            case 'auth/invalid-email':
                errorElement.textContent = 'E-mail inválido.';
                break;
            default:
                errorElement.textContent = 'Erro ao fazer login. Tente novamente.';
        }
    }
}

function handleLogout() {
    firebase.auth().signOut().catch(error => {
        console.error('Erro ao fazer logout:', error);
        showToast('Erro ao fazer logout. Tente novamente.', 'error');
    });
}

function showLoginScreen() {
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('main-layout').classList.remove('active');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-error').textContent = '';
}

function showMainLayout(user) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-layout').classList.add('active');
    const userName = user.email.includes('conrado') ? 'Conrado' : 'Kavi';
    document.getElementById('user-name').textContent = userName;
    loadInitialData();
}

function loadInitialData() {
    loadMapTypes();
    loadOrders();
    loadClients();
    loadVideoCalls();
    loadFinancialData();
}
