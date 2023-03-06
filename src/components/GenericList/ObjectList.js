import React from 'react'
import ObjectControllers from './ObjectControllers';
import ObjectHead from './ObjectHead';
import ObjectRow from './ObjectRow';
import './GenericList.css';
import ObjectPagination from './ObjectPagination';

const ObjectList = ({ objectArray, objectHeader, objectPagination, searchEnabled, addNewEnabled, redirect }) => {

    return (
        <div className="table">
            <ObjectControllers 
                searchEnabled={searchEnabled}
                addNewEnabled={addNewEnabled}
                objectSearch={objectPagination}
            />
            <ObjectHead 
                data={objectHeader}
            />
            <div className={redirect ? "table-body clickable" : "table-body"}>
                {
                    objectArray.content && objectArray.content.length > 0 &&
                    <>
                        {
                            objectArray.content.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <ObjectRow data={item} headerReference={objectHeader} redirect={redirect}/>
                                    </React.Fragment>
                                )
                            })
                        }
                    </>
                }
            </div>
            {
                objectArray.totalPages != undefined &&
                    <ObjectPagination 
                        currentPage={objectArray.number}
                        totalPages={objectArray.totalPages}
                        lastPage={objectArray.last}
                        firstPage={objectArray.first}
                        pagination={objectPagination}
                    />
            }
        </div>
    )
}


export default ObjectList