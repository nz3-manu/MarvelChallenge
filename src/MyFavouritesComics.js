import React from 'react';

var MyFavouritesComics = React.createClass({
    getInitialState: function() {
        return {}
    },
    render: function() {
        return (
            <div className="aside__allFavoriteComics">
                <div className="aside__wrapImgNameBtn">
                    <div className="btnDeleteComic" onClick={this.props.deleteComic}>
                        <img src="/icons/btn-delete.png" width="35px" height="35px" alt="btn-deleteComic"/>
                    </div>
                    <img className="imgFovoriteComic" src={this.props.imgFavoriteComic} alt={`img-${this.props.nameFavoriteComic}`}/>
                    <h3>
                        {this.props.nameFavoriteComic}
                    </h3>
                </div>
            </div>

        )
    }
});

export default MyFavouritesComics
