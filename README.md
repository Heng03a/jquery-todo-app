# jQuery To-Do List App - built with **HTML, CSS, jQuery**, and **localStorage**

## 🔍 Project Overview

- A modern, interactive To-Do List web app built with **HTML, CSS, jQuery**, and **localStorage**.  
- Fully functional with **Add, Delete, Mark Complete**, and **tasks persist after page refresh**.  
- Implements mobile-first responsive design with flexible layout containers, breakpoint-aware CSS,
  and viewport testing across 320px–1440px."

### This application provides a complete Todo management system featuring:
* Task creation, editing, deletion
* Completion / undo functionality
* Sorting & filtering logic
* Responsive UI (mobile → desktop)
* GitHub Cloud deployment with 24/7 availability

---
## 🌐 Live Demo

* 🔗 **Frontend :** https://heng03a.github.io/jquery-todo-app/

## 📂 GitHub Repository
* 🔗 **GitHub Repository :** https://github.com/Heng03a/jquery-todo-app/blob/main/README.md

## 🛠 Tech Stack
- HTML5
- CSS3
- JavaScript
- jQuery
---

## ✨ Key Functional Features
* Add new tasks
* Mark tasks complete / undo
* Clear completed Task
* Sort by: 
* Newest
* Oldest
* Completed First
* Active First
* Tasks persist after page refresh using `localStorage`  
* Modern UI with hover effects and responsive design  


## 📸 Screenshots - ✨ Key Functional Features

**Add Task**  
![Add Task](screenshots/add-task.png)

**Task Completed**  
![Task Completed](screenshots/task-complete.png)


**Sort Completed Task First**  
![Clear Completed Task](screenshots/sort_completed_first.png)

**Clear completed task**  
![Clear Completed Task](screenshots/clear_completed_task.png)

---

## 🧠 Architecture / Logic Design
- Mobile-first UI with polished interactions, persistent state, and recruiter-ready screenshots.
- Deployment: GitHub Page - Public URL - Local Storage Persistence
- Responsive UI which enable for Anytime, Anywhere, Any Device, Any Browser.

## Architecture Overview

```
User Browser
      │
      ▼
HTML / CSS Interface
      │
      ▼
jQuery Application Logic
      │
      ▼
Local Storage Persistence
```

### Architectural Principles
### Design Characteristics

* Lightweight front-end application
* Client-side data persistence
* Responsive layout design
* Cross-browser UI behaviour validation

## Reusable Application Template Architecture
### Reusable Prototype-Oriented Architecture
- The projects in this portfolio were intentionally structured to serve not only as standalone applications
- but also as reusable templates for rapid application development.

- By designing the applications with modular architecture and clear separation of concerns,
- the codebase can be reused as a foundation for building new systems quickly while
- maintaining architectural consistency.

- This approach is commonly used in enterprise environments to accelerate the
- development of new products and prototypes.

### Why Reusable Templates Matter
    - In real-world software development, new projects often require similar foundational components such as:
      • Authentication mechanisms
      • Database access layers
      • API service structures
      • UI layout frameworks
      • Deployment configurations
           
      - Instead of rebuilding these components repeatedly, reusable templates enable developers
      - to <b>bootstrap new applications rapidly while preserving engineering best practices.
      - Benefits include:
      -
        • Faster prototype development</br>
        • Consistent architectural standards</br>
        • Reduced technical debt</br>
        • Easier onboarding of development teams</br>
      </p>
 

## 🚀 Engineering Challenges & Solutions
   - Engineering Challenges & Solutions
   - During development and deployment of the applications, 
   - several real-world engineering challenges were encountered and resolved. 
   - These challenges reflect common issues faced when building modern distributed web systems.

   ### Challenge 1 — Cross-Origin Resource Sharing (CORS)
     - Problem

     - The Angular frontend and Node.js backend were deployed on separate cloud platforms. Because the services were hosted on different domains, browser security policies blocked API requests due to cross-origin restrictions.

       - Example Deployment Architecture

         - Frontend: Vercel
         - Backend: Railway
         - Without proper configuration, browser requests from the frontend application could not reach the backend API.

    - Solution

      - Explicit CORS configuration was implemented on the backend server to allow trusted origins while preserving browser security enforcement.

      - app.use(cors({
      - origin: [
      - "https://your-vercel-app.vercel.app"
      - ],
      - credentials: true
      - }));

      - Engineering Outcome

      - Secure communication between distributed frontend and backend services 
      - was successfully established while maintaining strict browser security controls.

   ### Challenge 2 — Cross-Browser Rendering Consistency
       - Problem

       - Different browsers implement layout engines differently, which can lead to subtle inconsistencies in CSS rendering and UI behaviour.

       - Solution

         - The applications were tested across multiple browser engines to verify layout consistency and interaction reliability.

           - Google Chrome (Blink)
           - Microsoft Edge (Blink)
           - Mozilla Firefox (Gecko)
           - Validation included:

             - Authentication flows
             - Task management UI
             - Sorting and filtering behaviour
             - Responsive layout scaling

        - Engineering Outcome

        - The application UI renders consistently across major browser engines, ensuring a stable user experience across platforms.

   ### Challenge 3 — Responsive Layout Stability
      - Problem
  
       - Modern web applications must remain usable across a wide range of device screen sizes. Without responsive design strategies, layouts can break on smaller devices.

       - Solution

         - Responsive design techniques were applied to ensure adaptive layouts across desktop, tablet, and mobile devices.

         - Flexible layout containers
         - Media query breakpoints
         - Relative sizing units
         - Mobile-first layout testing
         - Layout behaviour was validated across screen widths ranging from 320px to 1440px 
         - using browser developer tools and responsive testing.

      - Engineering Outcome

      - The interface remains fully functional and visually consistent across multiple device 
      - categories and screen resolutions



### Responsive Design Strategy

- This application uses a **mobile-first responsive CSS architecture**.

* Base styles are designed for small screens without relying on media queries.
* Layouts use flexible units (`rem`, `%`) and modern layout systems (`flexbox`) to adapt naturally across screen sizes.
* Media queries are applied using `min-width` breakpoints to progressively enhance the interface for larger viewports.

## Key design decisions include:

* A global reset using `box-sizing: border-box` to ensure consistent layout calculations.
* A responsive page wrapper with fluid width and controlled maximum width for desktop readability.
* Vertical stacking for form controls on mobile, enhanced to horizontal layouts on larger screens.
* Touch-friendly spacing and scalable typography to support usability on all devices.

- This approach ensures the application works **anytime, anywhere, on any device**, - without duplicating layout logic or relying on device-specific assumptions.

---
## 📱 Responsive & Cross-Browser Validation
* Mobile-first  UI design layout

## 📱 Responsive Design Strategy and Implementation
- This application was built using a mobile-first design philosophy.
- Core Responsive Characteristics
* Flexible layout containers
* Centered content wrapper
* Adaptive button stacking on smaller screens
* Touch-friendly controls
* Consistent spacing & alignment
* No layout shift across breakpoints

## Breakpoint Strategy
* Mobile: 360px+
* Tablet: 768px+
* Desktop: 1024px+
The layout maintains structural integrity across device sizes.

## 🎯 Feature Set
### Functional Features
* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark complete / undo
* Sort by: 
* Newest
* Oldest
* Completed First
* Active First

### UX Enhancements
* Status indicator legend
* Stable button alignment
* Clear visual hierarchy
* Clean typography and spacing

## 📱 Responsive Design Proof
- Tested on Chrome, Edge, Firefox
- Flexbox-based layout
- Overcome Responsive container constraints

### Desktop View
![Desktop Screenshot](docs/proof/Responsive/Desktop.png)

### Tablet View
![Tablet Screenshot](docs/proof/Responsive/Tablet.png)

### Mobile View
![Mobile Screenshot](docs/proof/Responsive/Mobile.png)

## 📱 Responsive Design Implementation
- This application was built using a mobile-first design philosophy.
- Core Responsive Characteristics
* Flexible layout containers
* Centered content wrapper
* Adaptive button stacking on smaller screens
* Touch-friendly controls
* Consistent spacing & alignment
* No layout shift across breakpoints

## Breakpoint Strategy
* Mobile: 360px+
* Tablet: 768px+
* Desktop: 1024px+
The layout maintains structural integrity across device sizes.

### UX Enhancements
* Status indicator legend
* Stable button alignment
* Clear visual hierarchy
* Clean typography and spacing

## 🌐 Cross-Browser Compatibility

-Tested on:

- Google Chrome (latest)
- Microsoft Edge (latest)
- Firefox (latest)

-All layout and interactive functionality are working consistently across modern browsers.

## 📱 Cross-browser Reliability Proof

| Google Chrome | Microsoft Edge | Firefox |
|---------------|----------------|---------|
| ![Google Chrome Screenshot](docs/proof/cross-browser/Google_chrome.png) | ![Microsoft Edge Screenshot](docs/proof/cross-browser/Microsoft_edge.png) | ![Firefox Screenshot](docs/proof/cross-browser/Firefox.png) |


## Deployment Details - ☁️ GitHub Deployment & CI/CD
Deployment Flow
* Local development
* git add, git commit, git push
* Live Production URL updated at GitHub
- No manual server management required.
* Production Characteristics
* Always available (24/7)

### ▶️ Access GitHub URL
* Access:
* https://heng03a.github.io/jquery-todo-app/


## 📈 Improvements / Future Enhancements
* Log in Authentication
* Role-based authorization

## Application Built and maintained by :-

Jialumen (Phua Kia Heng)

Full Stack Web Developer
Singapore

GitHub: https://github.com/Heng03a

