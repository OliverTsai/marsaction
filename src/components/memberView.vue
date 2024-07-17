<template>
    <div class="headerBd p-3">
      <div v-if="token" class="headerBox1">
        <div id="create_txt"></div>
        <div id="user_name"></div>
        <div id="logout"></div>
      </div>
      <div v-else class="headerBox1">
        <div id="register"></div>
        <div id="login"></div>
      </div>
  
      <!-- Login Modal -->
      <div class="modal" id="login_set">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">登入</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <input type="text" id="login_name" placeholder="帳號" />
              <input type="password" id="login_password" placeholder="密碼" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="save_login" @click="login">登入</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Register Modal -->
      <div class="modal" id="register_set">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">註冊</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <input type="text" id="register_username" placeholder="帳號" />
              <input type="email" id="register_email" placeholder="電子郵件" />
              <input type="password" id="register_password" placeholder="密碼" />
              <select id="user_role">
                <option value="subscriber">管理者</option>
                <option value="vendor">成員</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="save_register" @click="register">註冊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const apiUrl = 'https://oliver0502api.com/';
  
  export default {
    name: 'AuthComponent',
    setup() {
        const router = useRouter();
        const token = ref(localStorage.getItem('token'));
        const userName = ref(localStorage.getItem('user_Name'));
        const userRoles = ref(localStorage.getItem('user_Roles'));
  
        const fetchUserInfo = async (token) => {
            try {
            const response = await axios.post(`${apiUrl}wp-json/jwt-auth/v1/token/validate`, {}, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.data.data) {
                alert('時間太久 重新登入');
                handleInit();
            }
            } catch (error) {
            console.error('Error:', error);
            handleInit();
            }
        };
  
        const displayUserInfo = () => {
            const userEmail = document.createElement('text');
            userEmail.textContent = 'Hi, ' + userName.value;
            document.getElementById('user_name').appendChild(userEmail);
        };
  
        const setupUserButtons = () => {
            if (userRoles.value !== 'subscriber') {
            const createTXT = document.createElement('button');
            createTXT.textContent = '管理發帖';
            createTXT.classList.add('btn', 'titleBtn01', 'me-2', 'd-md-block');
            createTXT.addEventListener('click', () => {
                router.push({ name: 'seller' });
            });
            document.getElementById('create_txt').appendChild(createTXT);
            } else {
            const carButton = document.createElement('button');
            carButton.textContent = '購物車：';
            carButton.classList.add('btn', 'btn-primary');
            carButton.appendChild(document.createElement('span')).classList.add('total-count');
            document.getElementById('shoppingCar').appendChild(carButton);
            }
    
            const outButton = document.createElement('button');
            outButton.textContent = '登出';
            outButton.classList.add('btn', 'titleBtn02', 'me-2', 'd-md-block');
            outButton.addEventListener('click', handleInit);
            document.getElementById('logout').appendChild(outButton);
        };
  
        const setupLoginRegisterButtons = () => {
            const loginButton = document.createElement('button');
            loginButton.textContent = '登入';
            loginButton.classList.add('btn', 'titleBtn01', 'me-2', 'd-md-block');
            loginButton.setAttribute('data-bs-toggle', 'modal');
            loginButton.setAttribute('data-bs-target', '#login_set');
            document.getElementById('login').appendChild(loginButton);
    
            const registerButton = document.createElement('button');
            registerButton.textContent = '註冊';
            registerButton.classList.add('btn', 'titleBtn02', 'me-2', 'd-md-block');
            registerButton.setAttribute('data-bs-toggle', 'modal');
            registerButton.setAttribute('data-bs-target', '#register_set');
            document.getElementById('register').appendChild(registerButton);
        };
  
        const handleInit = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user_ID');
            localStorage.removeItem('user_Name');
            localStorage.removeItem('user_Mail');
            localStorage.removeItem('user_Roles');
            router.push({ name: 'home' });
        };
  
        const login = async () => {
            const loginName = document.getElementById('login_name').value;
            const loginPassword = document.getElementById('login_password').value;
            try {
            const response = await axios.post(`${apiUrl}wp-json/jwt-auth/v1/token`, {
                username: loginName,
                password: loginPassword,
            }, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const userResponse = await axios.post(`${apiUrl}wp-json/wp/v2/rae/user/login`, {
                username: loginName,
                password: loginPassword,
                }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                });
    
                localStorage.setItem('user_ID', userResponse.data.user.ID);
                localStorage.setItem('user_Name', userResponse.data.user.data.user_nicename);
                localStorage.setItem('user_Mail', userResponse.data.user.data.user_email);
                localStorage.setItem('user_Roles', userResponse.data.user.roles);
                alert('登入成功!');
                window.location.reload();
            } else {
                alert('帳密錯誤!');
                window.location.reload();
            }
            } catch (error) {
            console.error('Login error:', error);
            alert('沒有憑證!');
            window.location.reload();
            }
        };
  
        const register = async () => {
            const registerName = document.getElementById('register_username').value;
            const registerEmail = document.getElementById('register_email').value;
            const registerPassword = document.getElementById('register_password').value;
            const userRole = document.getElementById('user_role').value;
    
            try {
            const response = await fetch(apiUrl + 'wp-json/register-apis/finalrope/register-call', {
                method: 'POST',
                body: new URLSearchParams({
                username: registerName,
                email: registerEmail,
                password: registerPassword,
                role: userRole,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                alert('註冊成功！');
                router.push({ name: 'home' });
            }
            } catch (error) {
            alert('已經有這個帳號!');
            console.error('Error:', error);
            document.getElementById('result').textContent = "Error: Registration Failed";
            }
        };
  
        onMounted(() => {
            if (token.value) {
            fetchUserInfo(token.value);
            displayUserInfo();
            setupUserButtons();
            } else {
            setupLoginRegisterButtons();
            }
        });
  
        return {
            token,
            login,
            register,
        };
    },
  };
  </script>
  
  <style scoped>
  .webBd{
    background: #fff12b;
    .webBox{
        display: flex;
        justify-content: space-between;
    }
  }
  </style>