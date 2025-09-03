import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
var offset = 0
var limit = 12
var start_date = ""
var end_date = ""
var category_name = ""
var formData = []
export default function DFrom() {
    let navigate = useNavigate();
    const [allCategoryList, setAllCategoryList] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_EN_API_URL}category`)
            .then(({ data }) => {
                setAllCategoryList(data.categories);
            });
    }, []);

    const resultSubmit = (e) => {
        e.preventDefault()
        start_date = e.target.start_date.value;
        end_date = e.target.end_date.value;
        category_name = parseInt(e.target.category_name.value);
        offset = 0
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_name': category_name, 'limit': limit, 'offset': offset }
        console.log(formData);
        navigate('/archives', { state: formData })
    }
    return (
        <>
            <form className="DetailsTop-Form" onSubmit={resultSubmit}>
                <div className="row">
                    <div className="col-lg-4 col-12 pb-3  ">
                        <select defaultValue={'0'} name="category_name" className="form-control searchNews MLeftMargin">
                            <option value="0" disabled>Search All news Here</option>
                            {allCategoryList.map((nc) => {
                                return (
                                    <option key={nc.CategoryID} value={nc.CategoryID}>{nc.CategoryName}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-lg-3 col-12 pb-3  Tcenter">
                        <label htmlFor="start_date"> Date </label>
                        <input type="date" className="form-control hasDatepicker" id="datepicker"
                            name="start_date" />
                    </div>
                    <div className="col-lg-3 col-12 pb-3  Tcenter2">
                        <label htmlFor="end_date"> To </label>
                        <input type="date" id="datepickerto" name="end_date"
                            className="form-control hasDatepicker" />
                    </div>
                    <div className="col-lg-2 col-12  pb-3 ">
                        <div id="btnDiv" className="text-center">
                            <button type="submit" name="btnSubmit"
                                className="btn btn-danger ButtonBG">Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
