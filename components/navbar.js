class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }
        .navbar-link:hover {
          color: #4f46e5;
        }
      </style>
      <nav class="navbar py-4">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold text-gray-800">VocabVoyager</h1>
            <div class="flex space-x-6">
              <a href="#" class="navbar-link text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
              <a href="#" class="navbar-link text-gray-600 hover:text-indigo-600 transition-colors">Deck</a>
              <a href="#" class="navbar-link text-gray-600 hover:text-indigo-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);