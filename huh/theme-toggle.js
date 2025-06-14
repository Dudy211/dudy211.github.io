class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.themeToggle = null;
    this.moonIcon = null;
    this.sunIcon = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 5px;
          padding: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        body.dark-mode .theme-toggle {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .theme-toggle i {
          color: inherit;
        }
        body.dark-mode .theme-toggle i.fa-sun {
          color: white;
        }
        body.light-mode .theme-toggle i.fa-moon {
          color: black;
        }
      </style>
      <button class="theme-toggle">
        <i class="fas fa-moon" id="moon-icon"></i>
        <i class="fas fa-sun" id="sun-icon" style="display: none;"></i>
      </button>
    `;

    this.themeToggle = this.shadowRoot.querySelector(".theme-toggle");
    this.moonIcon = this.shadowRoot.getElementById("moon-icon");
    this.sunIcon = this.shadowRoot.getElementById("sun-icon");
  }

  setupEventListeners() {
    const prefersDarkMode = window.localStorage.getItem("prefersDarkMode") === "true";

    if (prefersDarkMode) {
      document.body.classList.add("dark-mode");
      this.moonIcon.style.display = "none";
      this.sunIcon.style.display = "inline";
    } else {
      document.body.classList.add("light-mode");
    }

    this.themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("dark-mode")) {
        this.moonIcon.style.display = "none";
        this.sunIcon.style.display = "inline";
      } else {
        this.moonIcon.style.display = "inline";
        this.sunIcon.style.display = "none";
      }

      window.localStorage.setItem(
        "prefersDarkMode",
        document.body.classList.contains("dark-mode")
      );
    });
  }
}

customElements.define("theme-toggle", ThemeToggle);