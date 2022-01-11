import React from "react";

export default function Form(){

    /* Objeto con useState */
    const [memeObject, setMemeObject] = React.useState(
        {
            topText: "",
            bottomText: "",
            memeImage: "http://i.imgflip.com/1bij.jpg",
        }
    );

    /* Variable que va a cambiar su estado y va a guardar la api */
    const [memeData, setMemeData] = React.useState([]);

    /* Llamado a la API */
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
            setMemeData(data.data.memes);
        });
    }, []);

    /* Funcion que cambia el estado de la variable */
    function getMemeImage(){
        /* generar una url random */
        const randomNumber = Math.floor(Math.random() * memeData.length);
        const url = memeData[randomNumber].url;
        /* le indicamos que agarre el objeto y cambie
        su estado en la memeImage */
        setMemeObject(
        prevObjet => (
            {
                ...prevObjet,
                memeImage: url
            }
                   
        ));
    }

    /* Funcion que captura los datos de los input del form */

    function handleChange(event) {
        setMemeObject(prevMemeObject => {
            return {
                ...prevMemeObject,
                [event.target.name]: event.target.value
            }
        })
    }
    
    /* retorna la url pero como está declarada dentro de la funcion no
    puedo llamarla en el div de abajo */

    return(
        <div className="form">
            <div className="form--input">
                <input type="text"
                placeholder="Top Text"
                onChange={handleChange}
                name="topText"
                value={memeObject.topText} />
                <input type="text"
                placeholder="Bottom Text"
                onChange={handleChange}
                name="bottomText"
                value={memeObject.bottomText} />
            </div>
            <button type="submit" className="submit" onClick={getMemeImage}>Get a new meme image 🖼️ </button>
            <div className="meme">
                <img src={memeObject.memeImage} className="meme--image" />
                <h2 className="meme--text top">{memeObject.topText}</h2>
                <h2 className="meme--text bottom">{memeObject.bottomText}</h2>
            </div>
        </div>
    )
}