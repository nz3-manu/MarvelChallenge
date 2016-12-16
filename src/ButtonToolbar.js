import React from 'react';

var ButtonToolbar=React.createClass({
    paginationBtn: function() {
        var paginationBtn=[];
        for (let i=0; i < 100; i= i+10) {
            paginationBtn.push(
              <button type="button" className="btnToolbar" key={i}>
                  {i}
              </button>
            );
        }
        return paginationBtn;
    },
    render: function() {
        return (
            <div className="wrap__toolbar">
              <button type="button" className="btnToolbar">
                  &#60;
              </button>
                {this.paginationBtn()}
              <button type="button" className="btnToolbar">
                  &#62;
              </button>
            </div>
        )
    }

})

export default ButtonToolbar
