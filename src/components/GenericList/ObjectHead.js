import React from "react";

const ObjectHead = ({ data }) => {
    return (
        <div className="table-head">
            <div className="table-head-row">
                {
                    data &&
                    data.map((item, index) => {
                        if(item.oculto == undefined && !item.oculto){
                            return (
                                <div className="table-cell" key={index}>
                                    <span>{item.column}</span>
                                </div>
                            )    
                        }
                    })
                }
            </div>
        </div>
    );
};

export default ObjectHead;
