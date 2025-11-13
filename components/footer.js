class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .footer {
          background-color: #f9fafb;
        }
        .footer-link:hover {
          color: #4f46e5;
        }
      </style>
      <footer class="footer border-t border-gray-200 py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p class="text-gray-600">&copy; 2023 VocabVoyager. All rights reserved.</p>
            </div>
            <div class="flex space-x-6">
              <a href="#" class="footer-link text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" class="footer-link text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" class="footer-link text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);