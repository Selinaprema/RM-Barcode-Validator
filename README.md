### Setup and Run Instructions

#### Prerequisites
- Node.js (v18 or higher recommended)
- npm
  
#### Install dependencies
```bash
npm install
```

#### Run locally
npm run dev

#### Open in browser
http://localhost:3000

#### Technical decisions and why
Local component state (useState) is used to manage input, API status, and validation history. As this was a small task, I didn't feel the need to use g global state or external libraries.

#### Structure Overview

```text
rm-barcode-validator/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── BarcodeInput.tsx
│   ├── HistoryList.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Spinner.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── Barcode.ts
│   └── mockApi.ts
│
├── tests/
│   └── barcode.test.ts
│
├── types/
│   └── history.ts
│
├── public/
│
├── .gitignore
├── eslint.config.mjs
├── jest.config.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

#### Known Limitations / Trade-offs
- Validation history is stored in memory and resets on page refresh

#### Improvements
- I'm not familiar with Aria so didn't inlude it

#### Test instructions
This project uses **Jest** for unit testing for barcode validation logic and check digit calculation.

To run the tests:

```bash
npm test


