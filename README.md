<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Humburger Menu</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
      integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />
      
   <style>
      .hamBody {
         margin: 0;
         overflow-x: hidden;
      }

      .nav-open .nav {
         transform: translateX(0);
      }

      .nav-open .hamMain {
         transform: translateX(350px);
      }

      .nav {
         width: 350px;
         height: 100vh;
         position: fixed;
         top: 0;
         left: 0;
         background: #F5F5DC;
         transform: translateX(-350px);
         transition: transform 0.2s;
         overflow: hidden;
      }

      .nav-close {
         background: none;
         display: flex;
         align-items: center;
         border: none;
         padding: 15px 25px;
         color: #dddddd;
         margin-left: auto;
         cursor: pointer;
      }

      .nav-close:hover {
         background: #5A5A5A;
      }

      .nav-links-container {
         box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.15);
      }

      .nav__link {
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 15px 25px;
         text-decoration: none;
         color: #5A5A5A;
      }

      .nav__text {
         font-size: 22px;
         font-family: "Assistant", sans-serif;
         font-weight: 500;
      }

      .nav__link:hover {
         background: rgba(255, 255, 255, 0.05);
      }

      .hamMain {
         transition: transform 0.2s;
      }

      .sub-buttons {
         display: none;
         position: absolute;
         top: 100%;
         left: 0;
      }

      .sub-button {
         display: block;
         width: 100%;
         padding: 15px 25px;
         text-decoration: none;
         color: #5A5A5A;
         background: rgba(255, 255, 255, 0.05);
      }

      .sub-button:hover {
         background: rgba(255, 255, 255, 0.1);
      }
   </style>
</head>

<body>

   <div class="hamBody">
      <nav class="nav">
         <div class="nav-links-container">
            <a href="welcome.html" class="nav__link">
               <span class="nav__text">Welcome</span>
               <ion-icon name="welcome-outline" size="large"></ion-icon>
            </a>
            <a href="students.html" class="nav__link">
               <span class="nav__text">Students</span>
               <ion-icon name="location-outline" size="large"></ion-icon>
            </a>
            <a href="events.html" class="nav__link">
               <span class="nav__text">Events</span>
               <ion-icon name="events-outline" size="large"></ion-icon>
            </a>
            <a href="prizes.html" class="nav__link">
               <span class="nav__text">Prizes</span>
               <ion-icon name="prizes-outline" size="large"></ion-icon>
            </a>
            <a href="report.html" class="nav__link">
               <span class="nav__text">Reports</span>
               <ion-icon name="reports-outline" size="large"></ion-icon>
            </a>
            <a href="settings.html" class="nav__link">
               <span class="nav__text">Settings</span>
               <ion-icon name="settings-outline" size="large"></ion-icon>
            </a>
            
         </div>
      </nav>
      <main class="hamMain">
         <i onmouseover="toggleNav()" data-state="closed" class="fas fa-bars"></i>
         <!-- <i onclick="toggleNav()" data-state="closed" class="fas fa-bars"></i> -->
      </main>
   </div>

   <script>
      function toggleIcon() {
         const icon = document.querySelector('i');
         const state = icon.getAttribute('data-state');
         if (state === 'closed') {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            icon.setAttribute('data-state', 'open');
         } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.setAttribute('data-state', 'closed');
         }
      }

      function toggleNav() {
         document.body.classList.toggle("nav-open");
         toggleIcon();
      }
   </script>

</body>

</html>




function toggleIcon() {
   const icon = document.querySelector('i');
   const state = icon.getAttribute('data-state');
   if (state === 'closed') {
     icon.classList.remove('fa-bars');
     icon.classList.add('fa-times');
     icon.setAttribute('data-state', 'open');
   } else {
     icon.classList.remove('fa-times');
     icon.classList.add('fa-bars');
     icon.setAttribute('data-state', 'closed');
   }
 }

 function toggleNav() {
   document.body.classList.toggle("nav-open");
   toggleIcon();
 }