# Interactive API Application - Weather Service Module

An interactive React web application featuring a dedicated weather service integration powered by the OpenWeather API.

---

## 🛠️ Tech Stack

* **Frontend:** React, JavaScript (ES6+), HTML5, CSS3
* **Build Tool:** Vite
* **Version Control:** Git, GitHub (Fork & Pull Request Workflow)
* **API Integration:** OpenWeather REST API

---

## 📁 Repository Structure

```text
InteractiveApiApplication/
├── src/
│   ├── hooks/
│   │   └── useWeather.js         # Custom React hook for state & fetch logic
│   ├── services/
│   │   └── weatherApi.js         # OpenWeather API service utility
│   ├── App.jsx                   # Main application entry component
│   └── main.jsx                  # Application root renderer
├── .env.example                  # Environment variable template
├── .gitignore                    # Git untracked files configuration
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
