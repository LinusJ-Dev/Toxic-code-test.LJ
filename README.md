
  

# Code test

  

This is my take on the code test that Toxic has tasked me to complete.

  

## Instructions

  

1.  **Clone the repository:**

```sh

git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name

```

  

2.  **Install dependencies:**

```sh

npm install

```

  

3.  **Run the development server:**

```sh

npm run dev

```

  

4.  **Open your browser and navigate to:**

```

http://localhost:3000

```

  5.  **If you see Unknown language (..):**
I tried to implement a bunch of common languages. But if you find one missing, you can add it in  
```
/app/utils/languageNames.tsx
```


## Estimate

I estimate this project to take about 5-6 hours in total to complete.

  

### Breakdown

  

- 2-3 hours for the functionality.

  

- 1 hour for security and error-handling

  

- 1-2 hour for styling and layout

  

## Final notes

  

This project took me just below 6 hours to complete.

I had some issues with the grid layout.
The API is not designed for more advanced filtering and searching. In the beginning I tried to implement a search feature against the API, and not for the gathered data. Lost some time to that.

### Feature improvements
 - The filtering is not the best when it comes to accessibility, I'd remove the live filtering and have users manually filter the shows if this was a real site.
 - The API used is not really the best when it comes to searching and filtering I noticed. I don't believe you can for example do a query that only returns English shows.
 - Pagination would be fairly easy to implement.
 - Right now you cant navigate back to a search, or save a search as bookmark. Implementing URL parameters for the search would be a nice improvement.
