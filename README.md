##Installation & Setup

Clone the repository
```bash
git clone https://github.com/your-username/buyer-crm.git
cd buyer-crm
```

Install dependencies
```bash
npm install
# or
yarn install
```

Configure Environment Variables
Create a .env file:
```bash
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

Run the development server
```bash
npm run dev
```
##  Features

- 📊 **Dashboard** – Overview of buyers  
- ➕ **Create Buyer** – Add new buyer profiles  
- 👤 **View Buyer** – See buyer details with notes  
- ✏️ **Edit Buyer** – Update details with automatic history tracking  
- 📝 **Change History** – View who updated what and when
---

- Validation is done through next auth
- Provided with search filtering and url based filtering and deboucing
- Couldn't provide CSV Import/Export and pagination as didn't got enough time 
---
