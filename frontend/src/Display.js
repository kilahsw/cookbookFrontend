import React from "react";
//??? THE ONLY THING THAT WORKS IS THE FORM DATA. I DON'T KNOW WHY IT'S NOT MAPPING
const Display = (props) => {

    const { authors } = props;
    const loaded = () => (
        <div style={{ textAlign: "center" }}>
            {authors.map((author) =>(
               <article>
                   <h1>{author.firstName}</h1>
                   <h1>{author.lastName}</h1>
                   <h2>{author.title}</h2>
                   <button onClick={() => {
                       props.selectAuthor(author)
                       props.history.push('/api/authors/edit')
                   }}>Edit</button>
               </article> 
            ))}
        </div>
    );
    return authors.length > 0 ? loaded() : <h1>Loading...</h1>
}

export default Display;