My Rick and Morty App (https://rick-morty-task-dun.vercel.app/)

This is a Next.js project that interacts with the Rick and Morty API, providing pages for characters, episodes, and locations with features like pagination, search, and filtering.

1. Project Setup

Initialize Next.js

To set up the project, run the following command:

`npx create-next-app@latest my-rick-morty-app --ts`

Install Dependencies

Install the necessary dependencies:

`npm install @reduxjs/toolkit react-redux react-hook-form zod tailwindcss`

Configure Tailwind CSS

Follow the official Tailwind CSS installation guide to set it up in your Next.js project.

Create Redux Store

Set up the Redux store and connect it to your app by following the Redux Toolkit documentation for configuration.

2. Main Page (Characters)

Fetch Character Data

Fetch Character Details with Redux

Instead of using getServerSideProps, we fetch the detailed information about the character from the API using Redux and Redux Toolkit.

1.	Create a Redux slice for character details:
 
•	A Redux slice is created to manage the character data, including the loading and error states.
	
 2.	Add the slice to your Redux store:
	
 •	The slice is added to the Redux store configuration to manage state across the app.
	
 3.	Dispatch the action in the Character page:
	
 •	In the Character page component, we use the useDispatch hook to dispatch the fetchCharacterDetails action and useSelector to retrieve the character data from the Redux store.
	
 4.	Display Character Info:
	
 •	Render the character details, including the image, status, species, gender, and episodes they appear in.

Display Characters

•	Render the list of characters with relevant information like name, image, status, etc.

Pagination

•	Implement pagination using the useRouter hook to manage URL parameters and navigate between character pages.

Search by Name

•	Implement a search feature to filter characters by name using the zod schema validation.

Filter by Status, Species, and Gender

•	Add multi-select filters to allow users to filter characters by status, species, and gender, if supported by the API.

3. Character Page

nstead of using getServerSideProps, we fetch the detailed information about the character from the API using Redux and Redux Toolkit.
	1.	Create a Redux slice for character details:
	•	A Redux slice is created to manage the character data, including the loading and error states.
	2.	Add the slice to your Redux store:
	•	The slice is added to the Redux store configuration to manage state across the app.
	3.	Dispatch the action in the Character page:
	•	In the Character page component, we use the useDispatch hook to dispatch the fetchCharacterDetails action and useSelector to retrieve the character data from the Redux store.
	4.	Display Character Info:
	•	Render the character details, including the image, status, species, gender, and episodes they appear in.

Display Character Info

•	Show character details such as image, status, species, gender, origin, and episodes they appear in.

Episode List

•	Display a list of episodes the character appears in, with links to individual episode pages.

4. Episodes Page

Fetch Episode Data

•	Fetch the list of episodes from the API.

Episode Filtering

•	Add a reusable Zod form to filter episodes by name or episode code.

Navigate to Episode Page

•	Allow users to click on an episode to navigate to its detailed page.

5. Locations Page

Fetch Location Data

•	Fetch the list of locations from the API.

Location Filtering

•	Allow filtering locations by name or type.

Navigate to Location Page

•	Enable navigation to a specific location page by clicking on a location.

6. Additional Enhancements

Responsive Design

•	Ensure the app is fully responsive and works well on mobile devices using Tailwind CSS.

Deployment on Vercel

•	Deploy your application to Vercel by following the Vercel deployment guide.

Enjoy exploring the world of Rick and Morty!
