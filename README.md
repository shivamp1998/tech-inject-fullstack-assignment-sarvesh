# Tech Inject Fullstack Assignment

This project is a fullstack web application built with Next.js, React, and MongoDB. The application allows users to manage recipes, including adding, editing, viewing, and deleting recipes. Users can also maintain a personal list of their favorite recipes.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shivamp1998/tech-inject-fullstack-assignment-sarvesh

2. **Replace .env-example with actual .env variables**
3. **Navigate to project directory**
   ```bash
    cd tech-inject-fullstack-assignment-sarvesh
4. **install dependencies**
    ```bash
    npm install --legacy-peer-deps

### Running the application
    npm run dev

## Features
- **Add New Recipes:**
  - Users can add new recipes with the following details:
    - Name
    - Category
    - Ingredients (with name and quantity)
    - Instructions
    - Image URL

- **Edit Existing Recipes:**
  - Users can edit the details of existing recipes.

- **View Recipe Details:**
  - Users can view detailed information about each recipe, including ingredients and instructions.

- **Delete Recipes:**
  - Users can delete recipes from the list.

### Personal Recipe List

- **Add to Personal List:**
  - Whatever recipe is ceated by User is visible in personal list.

- **View Personal List:**
  - Users can view and manage their personal collection of favorite recipes.

- **Remove from Personal List:**
  - Users can remove recipes from their personal list.

### User Authentication

- **Login:**
  - Users can log in to the application using their credentials.

- **Logout:**
  - Users can log out, which will clear the JWT token from cookies and redirect to the login page.

