<h1 align="center">
  <div align="center">
    <img alt="MunchMatch Logo" src="./app/favicon.ico" height="150px" width="auto"/>
  </div>
  <br/>
  MuchMatch
</h1>

<p align="center">
    A simple and straightforward recipe finder app.
    <br />
    Enter ingredients, discover matching recipes.
    <br />
    Developed by <a href="https://github.com/jomkv">Jom</a>
    <br />
    <a href="https://www.muchmatch-theta.vercel.app">Go to website</a>&nbsp;
</p>
<br/>

## 🥘 Notable Features

* Search recipes by ingredient list (inclusive matching)
* Clickable recipe results with modal display
* Recipe modal includes:
  - Overview
  - Nutritional facts/values
  - Ingredients
  - Step-by-step cooking instructions

## 🛠 Technologies Used

### Frontend
* **Next.js**
* **Redux Toolkit**
* **shadcn/ui**
* **Tailwind CSS**
* **TypeScript**

### Data
* **Go (Golang)** for data scraping
* **Colly** - a fast and elegant scraping framework for Go
* **BBC Good Food** (source dataset)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jomkv/munchmatch.git
cd munchmatch

# Install dependencies
npm install

# Run development server
npm run dev
