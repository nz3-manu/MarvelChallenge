import React from 'react';

var ButtonToolbar=React.createClass({
    paginationBtn: function() {
        var paginationBtn=[];
        for (let i=0; i < 100; i + 10) {
            paginationBtn.push(
                <div className="btn-group" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary">{i}</button>
                </div>
            );
        }
        console.log(paginationBtn);
        return paginationBtn;
    },
    render: function() {
        return (
            <div className="wrap__toolbar">
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" className="btn btn-secondary">
                            &#60;
                        </button>
                    </div>
                    {this.paginationBtn}
                    <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" className="btn btn-secondary">&#62;</button>
                    </div>
                </div>
            </div>
        )
    }

})

export default ButtonToolbar
