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
    // console.log('----');
    // console.log(data);
    // console.log('----');
    console.log("display crud");
    return res.render('displayCRUD.ejs', { dataTable: data });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        // console.log(userData);
        return res.render("editCRUD.ejs", {
            user: userData,
        });
    }
    else {
        console.log("not found");
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDServices.updateUserData(data);
    return res.render('displayCRUD.ejs', { dataTable: allUser });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.send("delete user successed");
    }
    else{
        return res.send("user not found");
    }
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
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}