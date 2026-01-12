import { reject } from "lodash";
import db from "../models";
require('dotenv').config();
import emailService from '../services/emailService';
import { v4 as uuidv4 } from 'uuid';
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. Validate input
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            }

            // 2. Find or create patient
            let [user] = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    roleId: 'R3'
                }
            });
            let token = uuidv4();
            // 3. Create booking (DB sẽ tự chặn trùng)
            await db.Booking.create({
                statusId: 'S1',
                doctorId: data.doctorId,
                patientId: user.id,
                date: data.date,
                timeType: data.timeType,
                token: token
            });
            await emailService.sendSimpleEmail({
                reciverEmail: data.email,
                patientName: data.fullName,
                time: data.timeString,
                doctorName: data.doctorName,
                language: data.language,
                redirectLink: buildUrlEmail(data.doctorId, token),
            });
            return resolve({
                errCode: 0,
                errMessage: 'Booking created successfully'
            });

        } catch (e) {
            // 4. BẮT LỖI TRÙNG LỊCH
            if (e.name === 'SequelizeUniqueConstraintError') {
                return resolve({
                    errCode: 2,
                    errMessage: 'This schedule has been booked'
                });
            }

            // lỗi khác
            reject(e);
        }
    });
}
let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succeed!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
}

// return new Promise(async (resolve, reject) => {
//     try {
//         if (!data.email || !data.doctorId || !data.timeType || !data.date) {
//             resolve({
//                 errCode: 1,
//                 errMessage: 'Missing parameter'
//             })
//         } else {
//             // upsert patient
//             let user = await db.User.findOrCreate({
//                 where: { email: data.email },
//                 defaults: {
//                     email: data.email,
//                     roleId: 'R3'
//                 },
//             });
//             //create a booking record
//             if (user && user[0]) {
//                 await db.Booking.findOrCreate({
//                     where: { patientId: user[0].id },
//                     defaults: {
//                         statusId: 'S1',
//                         doctorId: data.doctorId,
//                         patientId: user[0].id,
//                         date: data.date,
//                         timeType: data.timeType
//                     }
//                 })
//             }
//             resolve({
//                 errCode: 0,
//                 errMessage: 'save infor patient succeed!'
//             })
//         }
//     }
//     catch (e) {
//         reject(e);
//     }
// })