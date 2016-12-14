import React, {Component} from 'react';
import md5 from 'md5';
import './App.css';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(106, 102, 103, 0.85)'
    },
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: 'white',
        marginRight: '-50%',
        transform: 'translate(-40%, -40%)'
    }
};

var WrapComics = React.createClass({
    getInitialState: function() {
        return {
            modal: {
                modalIsOpen: false
            }
        }
    },
    openModal: function() {
        this.setState({
            modal: {
                modalIsOpen: true,
                currentComics: this.props
            }
        });
    },
    closeModal: function() {
        console.log("cerrando");
        this.setState({
            modal: {
                modalIsOpen: false
            }
        })
    },
    render: function() {
        return (
            <div className="wrapPrincipal">
                <Modal isOpen={this.state.modal.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                    <div className="fullScreenColor">
                        <div className="fullScreenColor__BtnImgDescription">
                            <div className="wrap__fullScreenColor">
                                <button className="closeFullScreen" onClick={this.closeModal}>X</button>
                                <div className="fullScreenColor__ImgDescription">
                                    <img className="fullScreen__Img" src ={(this.state.modal.currentComics)
                                        ? this.state.modal.currentComics.img
                                        : ""}/>
                                    <div className="tittleDescription__wrap">
                                        <h3>
                                            {(this.state.modal.currentComics)
                                                ? this.state.modal.currentComics.name
                                                : ""}
                                        </h3>
                                        <p>
                                            {(this.state.modal.currentComics)
                                                ? this.state.modal.currentComics.description
                                                : ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="fullScreenColor__btn">
                                <div className="btnC"><img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt=""/>
                                    <p className="btnF_text">ADDED TO FAVOURITES</p>
                                </div>
                                <div className="btnC"><img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt=""/>
                                    <p className="btnF_text">BUY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="wrapPrincipal__img">
                    <img height="200px" width="200px" className="img-circle" src={this.props.img}/>
                    <h3>
                        Related comics
                    </h3>
                    <p>
                        Related comics
                    </p>
                    <p>
                        Related comics
                    </p>
                </div>
                <div className="wrapPrincipal__title">
                    <h1>
                        {this.props.name}
                    </h1>
                    <p>
                        {this.props.description}
                    </p>
                    <button type="button" onClick={this.openModal} className="btn btn-danger">
                        View more</button>
                    <p>
                        Related comics
                    </p>
                    <p>
                        Related comics
                    </p>
                </div>
            </div>
        )
    }
});
export default WrapComics
