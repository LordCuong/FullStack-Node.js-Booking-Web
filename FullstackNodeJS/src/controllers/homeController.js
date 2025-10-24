import db from "../models/index";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log("----------------");
        // console.log(data);
        // console.log("----------------");
        return res.render('homepage.ejs', { data: JSON.stringify(data) });

    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = async (req, res) => {
    // return res.send('get CRUD')
    return res.render('crud.ejs');

}
let postCRUD = async (req, res) => {
    let messages = await CRUDServices.createNewUser(req.body)
    console.log(messages);
    return res.send("post");
}
let displayCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser()
    console.log('----');
    console.log(data);
    console.log('----');
    console.log("display crud");
    return res.render('displayCRUD.ejs', {dataTable:data});
}

// object: { 1 obj phai co key va value
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}