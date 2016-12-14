import React, {Component} from 'react';

var MyFavouritesComics = React.createClass({
    render: function() {
        return (
            <div className="wrap__aside">
                <div className="aside__nav">
                    <img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt="btn-search"/>
                    <h2 className="textFavourites"> My Favourites</h2>
                </div>
                <div className="aside__wrapImgNameBtn">
                    <div className="btnDeleteComic"> <img src="/icons/btn-delete.png"  width="35px" height="35px" alt="btn-deleteComic"/> </div>
                    <img className="imgFovoriteComic" src= "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg"/>
                    <h3>
                        A-Bomb (HAS)
                    </h3>
                </div>
            </div>
        )
    }
});

export default MyFavouritesComics
