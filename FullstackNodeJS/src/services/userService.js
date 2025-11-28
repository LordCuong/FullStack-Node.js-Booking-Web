import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) { //check user email
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password','firstName','lastName'],
                    where: { email: email },
                    raw: true,
                }
                );
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password); /// kierm tra password 
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok passw";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "wrong passw";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "user Not not found";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `not exist email or wrong passw`;
            }
            resolve(userData);

        }
        catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {  //check user email
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {  // khong cho lay password
                        exclude: ["password"]
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {  // khong cho lay password
                        exclude: ["password"]
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email co ton tai ko?
            let check = await checkUserEmail(data.email);
            if (check) {
               return resolve({
                    errCode: 1,
                    message: "your email is exits! try another email",
                });

            }
            let hashPasswordFromBrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                // image: data.image,
                roleId: data.roleId,
                // positionId: data.positionId,

            })
            resolve({
                errCode: 0,
                message: "ok",
            });
        }
        catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false,
            })
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: `user not exist`,
                });
            }
            await user.destroy();
            resolve({
                errCode: 0,
                errMessage: `user deleted`,
            });
        } catch (e) {
            reject(e);
        }
    });

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 1,
                    errMessage: 'not found id to edit'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: "update succcess",
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage:" user not found",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput)=>{
    return new Promise (async(resolve,reject)=>{
        try{
            if(! typeInput){
                resolve({
                    errCode: 1,
                    errMessage: "missing input type Allcode",
                })
            }else{
            let res={};
            let allcode=await db.Allcode.findAll({
                where: {type: typeInput}
            });
            res.errCode=0;
            res.data=allcode;
            resolve(res);
        }
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}