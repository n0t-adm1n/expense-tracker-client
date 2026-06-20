# Personal Expense Tracker Dashboard & AI Consultant (Frontend)

A modern, responsive React application that helps users track personal finances, visualize income versus expenses, and receive personalized AI financial advice. 

This repository contains the client-side code. The backend API repository can be found at [expense-tracker-api](https://github.com/n0t-adm1n/expense-tracker-api).

## 🚀 Features
* **Interactive Dashboard:** Real-time calculation of total balance, income, and expenses.
* **Bulk Data Ingestion:** Users can upload raw Excel (`.xlsx`) bank statements (specifically tailored for Paytm exports) to instantly populate the dashboard.
* **AI Financial Consultant:** Integrates with Google's Gemini LLM to analyze spending habits and provide personalized, actionable financial advice.
* **Modern UI/UX:** Fully styled with Tailwind CSS for a clean, responsive, and professional interface.

## 🛠️ Tech Stack
* **Framework:** React.js
* **Styling:** Tailwind CSS
* **Data Parsing:** SheetJS (`xlsx`) for reading Excel files
* **Markdown Rendering:** `react-markdown` for styling AI responses

## 💻 Local Setup Instructions

1. Clone the repository:
```bash
   git clone https://github.com/n0t-adm1n/expense-tracker-client.git
   ```
2. Navigate into the directory and install dependencies:
```bash
   cd expense-tracker-api
   npm install
   ```
3. Start the development server:
```bash
   npm run dev
   ```
*(Note: Ensure the backend API is running concurrently on port 5000 for full functionality).*