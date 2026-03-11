const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Message endpoints
  async sendMessage(receiverId, message) {
    return this.request('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, message }),
    });
  }

  async getConversation(userId) {
    return this.request(`/messages/conversation/${userId}`);
  }

  async getConversations() {
    return this.request('/messages/conversations');
  }

  async markAsRead(senderId) {
    return this.request('/messages/read', {
      method: 'PUT',
      body: JSON.stringify({ senderId }),
    });
  }
}

export default new ApiService();

