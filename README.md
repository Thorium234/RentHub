

# RentHub

> **A simple marketplace for finding and renting things near you.**

RentHub is a mobile rental marketplace designed to connect **people who have items available for hire with people looking for those items**.

Instead of searching through scattered WhatsApp groups, Facebook posts, phone contacts, or asking around, users can discover rental items in one place, view their details, and communicate directly with the owner.

RentHub is designed with the Kenyan market in mind, while remaining flexible enough to support expansion into other markets.

## 🎯 The Problem

Finding something to rent can be surprisingly difficult.

Someone looking for:

* Chairs
* Tents
* Cars
* Generators
* PA systems
* Cameras
* Furniture
* Construction equipment
* Tools
* Event equipment
* Machinery

may have to rely on personal contacts, WhatsApp groups, social media posts, or physical searching.

At the same time, people who own rental equipment often have no simple way to make their inventory discoverable to potential customers.

**RentHub connects both sides.**

```text
                RENTHUB

        ┌─────────────────────┐
        │                     │
        │     RENTAL OWNER    │
        │                     │
        └──────────┬──────────┘
                   │
             Lists an item
                   │
                   ▼
              ┌─────────┐
              │ RentHub │
              └────┬────┘
                   │
             Customer finds it
                   │
                   ▼
        ┌─────────────────────┐
        │                     │
        │      CUSTOMER       │
        │                     │
        └──────────┬──────────┘
                   │
              Starts chat
                   │
                   ▼
              Owner + Customer
              arrange the rental
```

## 🚀 V1 Goal

The first version focuses on **discovery and communication**.

RentHub V1 allows users to:

1. Create an account.
2. Create rental listings.
3. Upload listing information.
4. Browse available items.
5. Search for items.
6. Filter listings by category and location.
7. View rental details.
8. Contact the owner through in-app chat.
9. Manage their own listings.
10. Save interesting listings.
11. Report inappropriate listings.

### V1 intentionally does NOT include

Payment processing, automated booking confirmation, M-Pesa integration, commissions, delivery management, identity verification, advanced reviews, or complex rental contracts.

These are potential V2/V3 features.

The purpose of V1 is to answer one question:

> **Can RentHub successfully connect people who have things to rent with people looking for things to rent?**

---

# 🛠️ Technology Stack

RentHub is designed to keep infrastructure requirements extremely low during development.

### Mobile Application

**React Native (Expo)**

Used for building the Android/iOS mobile application.

The app is built with **Expo** (managed workflow) using **Expo Development Builds** for native modules. Firebase is integrated through the official `@react-native-firebase` packages, which are wired up via Expo Config Plugins during prebuild.

### Backend Services

**Firebase**

Firebase provides the core backend services required by V1.

Planned Firebase services include:

* Firebase Authentication
* Cloud Firestore
* Firebase Cloud Messaging
* Firebase App Check
* Firebase Analytics
* Firebase Crashlytics

The application is intentionally designed around Firebase's client SDK capabilities so that the V1 prototype can operate without maintaining a traditional VPS or custom backend server.

> Firebase pricing and product availability can change. Check the current Firebase pricing documentation before deploying production workloads.

### Development

* Node.js
* npm
* React Native (Expo SDK)
* Expo Go app (for quick testing on a physical device)
* Git
* GitHub
* Android Studio (only if building a local development build for Android)
* Firebase CLI

---

# 🏗️ Architecture

The initial architecture is intentionally simple:

```text
                    ┌─────────────────┐
                    │  React Native   │
                    │     Mobile      │
                    │   Application   │
                    └────────┬────────┘
                             │
                             │ Firebase SDK
                             ▼
                    ┌─────────────────┐
                    │     Firebase    │
                    │                 │
                    │ Authentication  │
                    │    Firestore    │
                    │      FCM        │
                    │    Analytics    │
                    │   Crashlytics   │
                    └─────────────────┘
```

## Data Model

The initial Firestore structure is expected to contain collections such as:

```text
users
categories
listings
conversations
messages
favorites
reports
```

### User

```text
users/{userId}

name
phone
email
profileImage
location
createdAt
```

### Listing

```text
listings/{listingId}

ownerId
title
description
category
price
pricingUnit
location
availability
images
createdAt
updatedAt
status
```

### Conversation

```text
conversations/{conversationId}

customerId
ownerId
listingId
lastMessage
lastMessageAt
createdAt
```

### Message

```text
messages/{messageId}

conversationId
senderId
message
createdAt
read
```

---

# 📱 Core User Flow

## Owner

```text
Create Account
      ↓
Create Listing
      ↓
Add Photos
      ↓
Add Price
      ↓
Add Location
      ↓
Publish
      ↓
Customer discovers listing
      ↓
Customer sends message
      ↓
Owner responds
```

## Customer

```text
Create Account
      ↓
Browse RentHub
      ↓
Search / Filter
      ↓
Open Listing
      ↓
View Details
      ↓
Chat With Owner
      ↓
Discuss Rental
```

---

# 📂 Example Categories

RentHub is designed to be category-independent.

Initial categories may include:

```text
Events
├── Tents
├── Chairs
├── Tables
├── Decorations
└── PA Systems

Vehicles
├── Cars
├── Vans
├── Motorcycles
└── Trucks

Equipment
├── Generators
├── Construction Equipment
├── Tools
└── Machinery

Technology
├── Cameras
├── Projectors
├── Speakers
└── Computers

Furniture
├── Sofas
├── Beds
├── Tables
└── Office Furniture
```

More categories can be added without changing the fundamental architecture.

---

# 🔐 Security

RentHub uses Firebase Authentication and Firestore Security Rules to control access to user data.

The application should enforce rules such as:

```text
Users can edit their own profiles.

Users can create their own listings.

Users can edit their own listings.

Users cannot modify another user's listings.

Users can participate only in conversations
they are members of.

Users cannot directly modify another user's
private information.
```

Security rules should be treated as part of the application's backend security model, not as an optional feature.

---

# 💬 Messaging

Messaging is a core V1 feature.

A customer should be able to open a listing and select:

```text
[ Chat With Owner ]
```

Example:

```text
Customer:
Hello, is this tent available on Saturday?

Owner:
Yes, it is available.

Customer:
How much for two days?

Owner:
KES 25,000.
```

The initial messaging system is intended for communication between the customer and listing owner.

Payment and booking confirmation are outside the V1 scope.

---

# 📍 Location

Listings should contain basic location information.

Example:

```text
County: Kakamega
Town: Kakamega
Area: Milimani
```

This allows customers to discover rental items within relevant areas.

A future version may introduce maps and distance-based search.

---

# 🔮 Future Roadmap

## V2

Potential V2 functionality:

* Booking requests
* Rental dates
* Availability calendar
* M-Pesa payments
* Deposits
* Payment confirmation
* Rental status
* Push notifications
* Ratings and reviews
* Owner dashboard
* Customer rental history

Example:

```text
Customer
    ↓
Select item
    ↓
Select rental dates
    ↓
Request booking
    ↓
Owner accepts
    ↓
Customer pays
    ↓
Booking confirmed
```

## V3

Potential advanced functionality:

* M-Pesa integration
* Automated payment reconciliation
* Identity verification
* Delivery services
* Location/maps
* Owner verification
* Business accounts
* Rental contracts
* Damage deposits
* Dispute management
* Recommendations
* Analytics
* Marketplace commissions

---

# 💰 Business Model

RentHub is initially focused on validating the marketplace.

Possible future revenue models include:

### Commission

Charge a percentage of completed rentals.

```text
Rental:
KES 10,000

RentHub commission:
5%

Revenue:
KES 500
```

### Featured Listings

Owners can pay to promote their listings.

### Business Accounts

Professional rental businesses could receive:

* Advanced analytics
* More listings
* Featured placement
* Business profiles
* Booking management
* Customer management

The monetization model will be determined after validating actual user behavior.

---

# 🧑‍💻 Getting Started

## Prerequisites

Install the following:

* Node.js
* npm
* Git
* Expo account
* Firebase account
* The **Expo Go** app on a physical device (or an Android emulator)

Android Studio and a JDK are **not** required for day-to-day development. They are only needed if you build a native development build locally with `npx expo run:android` instead of using Expo Go.

For Expo environment setup, follow the official Expo documentation for your operating system.

---

# 📥 Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/Thorium234/RentHub.git
```

Move into the project:

```bash
cd RentHub
```

---

# 📦 Install Dependencies

Install the project dependencies:

```bash
npm install
```

If the project uses Yarn instead:

```bash
yarn install
```

---

# 🔥 Firebase Setup

Create a Firebase project through the Firebase Console.

Then enable the required services:

```text
Authentication
Firestore
Cloud Messaging
Analytics
Crashlytics
```

Register the Android app with package ID `com.thorium234.renthub` and the iOS app with bundle ID `com.thorium234.renthub` inside Firebase.

Download the appropriate Firebase configuration files and place them in the **project root**:

```text
google-services.json        (Android)
GoogleService-Info.plist    (iOS)
```

The `@react-native-firebase/app` Expo Config Plugin (already declared in `app.json`) automatically links these files when a native build is generated with `npx expo prebuild`. You do not need to touch Gradle or Xcode settings manually.

Do **not** commit private credentials, service account keys, or secrets to GitHub.

Add sensitive files to `.gitignore`.

Example:

```gitignore
.env
.env.*
google-services.json
GoogleService-Info.plist
*.keystore
*.jks
```

If a Firebase configuration file is required by the mobile build process, follow the project's Firebase setup instructions rather than blindly adding secrets to the repository.

---

# ▶️ Run the Application

Start the Expo development server (Metro):

```bash
npm start
```

Or directly:

```bash
npx expo start
```

### Quick testing with Expo Go

Scan the QR code shown in the terminal with the Expo Go app on your device. This works for pure JavaScript features without any native build.

### Development builds (required for Firebase native modules)

Firebase Authentication and Firestore rely on native modules, so they require a **development build**, not Expo Go. Build one for Android:

```bash
npx expo run:android
```

For iOS (macOS only):

```bash
npx expo run:ios
```

The first run generates the native `android/` and `ios/` projects and links your `google-services.json` / `GoogleService-Info.plist` files through the Firebase config plugins.

---

# 🧪 Development Workflow

A typical development workflow:

```bash
git clone https://github.com/Thorium234/RentHub.git

cd RentHub

npm install

npm start
```

Then in another terminal (or press a key in the Expo terminal):

```bash
npm run android
```

This starts Metro, then opens the app on a connected Android device or emulator via a development build.

---

# 🌿 Git Workflow

Create a feature branch:

```bash
git checkout -b feature/listing-search
```

Make your changes.

Check the changes:

```bash
git status
```

Commit:

```bash
git add .
git commit -m "feat: add listing search"
```

Push:

```bash
git push origin feature/listing-search
```

Then create a Pull Request on GitHub.

---

# ⚠️ Current Project Status

RentHub is currently in **early development**.

The repository should be considered a prototype and not a production rental platform.

Current priority:

```text
Authentication
      ↓
User Profiles
      ↓
Create Listings
      ↓
Browse Listings
      ↓
Search / Filter
      ↓
Listing Details
      ↓
Messaging
```

Do not implement V2 payment functionality before the core marketplace has been validated.

---

# 🎯 Product Philosophy

RentHub is built around a simple principle:

> **If someone has something they are willing to rent, someone else should be able to find it.**

The first objective is not to build the most complicated rental platform.

The first objective is to make **discovery and communication** extremely simple.

```text
Have something to rent?
        ↓
List it.

Need something?
        ↓
Find it.

Interested?
        ↓
Chat.
```

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature suggestions are welcome.

Before implementing a large feature, open an issue to discuss the proposed change.

---

# 📄 License

RentHub is released under the **MIT License**.

See the `LICENSE` file for details.

---

## Repository

**GitHub:** [Thorium234/RentHub](https://github.com/Thorium234/RentHub)

