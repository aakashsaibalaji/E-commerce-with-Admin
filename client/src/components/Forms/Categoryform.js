import React from 'react';
function CategoryForm({handlesubmit,value,setValue}) {
    return (<>
    <form onSubmit={handlesubmit}>
        <div className="mb-3 mt-2">
            <input type="text" className="form-control" placeholder='New Category' value={value} onChange={(e)=>setValue(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">submit</button>
    </form>
    </>);
}

export default CategoryForm;