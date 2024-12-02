//import fivem from '/public/image/fivem.jpg';
//import datingApp from '/public/image/dating-app.jpg';
//import blogSite from '/public/image/blog-site.jpg';
//import weatherApp from '/public/image/weather-app.jpg';

export const projectsData = [
    {
        id: 1,
        name: 'Custom FiveM Server',
        description: "I built a custom FiveM server for a gaming community using Lua. This project involved configuring game scripts, managing server-side optimizations, and implementing custom game modes. Alongside coding, I gained experience in deploying and maintaining both Windows and Linux servers for hosting the server. Additional tasks included database integration for player statistics and creating custom mods to enhance user experience.",
        tools: ['Lua', 'Windows Server', 'Linux Server', 'MySQL', 'Git', 'SSH'],
        role: 'Server Developer',
        code: '',
        demo: '',
        image: fivem,
    },
    {
        id: 2,
        name: 'Swipe Dating App',
        description: "Developed a cross-platform dating app with functionality to match, chat, and swipe on profiles. Initially built with Flutter and MongoDB for real-time data handling, the app was later migrated to Firebase for enhanced scalability and simplicity in authentication and database management. The app included features such as user profiles, geolocation filtering, and media uploads.",
        tools: ['Flutter', 'Firebase', 'Firestore', 'Dart', 'Cloud Functions'],
        role: 'Mobile App Developer',
        code: '',
        demo: '',
        image: datingApp,
    },
    {
        id: 3,
        name: 'Personal Blog Platform',
        description: "Built a lightweight blog platform to showcase personal projects and share articles. The platform featured a custom-built API for blog post management, user authentication, and comments. The front-end was designed with React, while the back-end used Express and MongoDB. The project demonstrated skills in CRUD operations, RESTful APIs, and responsive design.",
        tools: ['React', 'Express', 'MongoDB', 'Bootstrap', 'JWT'],
        role: 'Full Stack Developer',
        code: '',
        demo: '',
        image: blogSite,
    },
    {
        id: 4,
        name: 'Weather Forecast App',
        description: "Created a simple yet functional weather app that displays current and future weather data based on the user's location or search input. Leveraged OpenWeather API for accurate forecasts and used React and TailwindCSS to create a user-friendly interface. The app included features like temperature toggles, a weather icon display, and a search history.",
        tools: ['React', 'OpenWeather API', 'TailwindCSS', 'Netlify'],
        role: 'Front-End Developer',
        code: '',
        demo: '',
        image: weatherApp,
    }
];
