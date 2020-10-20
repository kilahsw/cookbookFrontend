////????? I used the today's lecture and wrote all of this (app, display, index, form) to have something for homework. I'm not sure why parts of it work and parts of it don't. I've spent hours fixing the backend and trying to get the deploy to stop throwing an app error. I combed through the heroku help docs after downloading the cli. i don't know what else to do. 

import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //url var
  const url = "http://localhost:4000"
  //state for authors
  const [authors, setAuthors] = React.useState([])

  //empty author form -- starting point

  const emptyAuthor = {
    firstName: "",
    lastName: "",
    title: ""
  }

  const [selectedAuthor, setSelectedAuthor] = React.useState(emptyAuthor) //initial value of state

  const getAuthors = () => {
    fetch(url + "/api/authors")
      .then(response => response.json())
      .then(data => {
        setAuthors(data)
      })
  }

///???????i'm not sure why this won't make the authors appear on the page. i don't know what else to pull to make it work.?????

  //get authors to load on page
  React.useEffect(() => {
    getAuthors()
  }, [])

  const handleCreate = (newAuthor) => {
    fetch(url + "/api/authors", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAuthor)
    })
      .then(response => getAuthors())
  }

  //update an author when a form is clicked
  const handleUpdate = (author) => {
    fetch(url + "/api/authors" + author._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(author)
    })
      .then(response => getAuthors())
  }

  //select an author

  const selectAuthor = (author) => {
    setSelectedAuthor(author)
  }



  return (
    <div className="App">
      <h1>AUTHORS AND COOKBOOKS </h1>
      <hr />
      <Link to="/api/authors/create">
        <button>Add Author</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/api/authors"
            render={(rp) => (
              <Display
                {...rp}
                authors={authors}
                selectAuthor={selectAuthor}
              />
            )}
          />
          <Route
            exact
            path="/api/authors/create"
            render={(rp) => (
              <Form {...rp} label="create" author={emptyAuthor} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/api/authors/edit"
            render={(rp) => (
              <Form {...rp} label="update" author={selectedAuthor} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );

}
export default App;
