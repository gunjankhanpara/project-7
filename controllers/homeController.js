const crudtbl = require('../models/crudmodal');

const blogtbl = require('../models/blogmodel');
const fs = require('fs');

const nodemailer = require('nodemailer');

const login = async (req, res) => {
    if (res.locals.users) {
        return res.redirect('dashboard');
    }
    return res.render('loging');
}


const index = async (req, res) => {
    return res.render('dashboard');
}

const register = async (req, res) => {
    return res.render('register')
}

const registerData = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            console.log("plz enter the details");
        }
        else {
            let data = await crudtbl.create({
                name: name,
                email: email,
                password: password
            })
            if (data) {
                console.log("regiter seccesfully");
                return res.redirect('back');
            }
            else {
                console.log("data is not add");
                return res.redirect('back')
            }
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back')
    }

}

const logdata = async (req, res) => {
    return res.redirect('dashboard')
}

const logout = async (req, res) => {
    req.logout((err) => {
        console.log(err);
        return false
    })
    return res.redirect('/');
}

const AddBlog = async (req, res) => {
    return res.render('addblog', {
        single: ""
    });
}

const blogadd = async (req, res) => {
    try {
        const { editid, title, discription, avatar } = req.body;
        if (editid) {
            if (req.file) {
                if (!title || !discription) {
                    console.log("Enter All data");
                    return res.redirect('back')
                }
                let deleterecord = await crudtbl.findById(editid);
                if (deleterecord) {
                    fs.unlinkSync(deleterecord.avatar)
                }
                else {
                    console.log("data not deleted");
                }
                let img = "";
                if (req.file) {
                    img = req.file.path;
                }
                let data = await blogtbl.findByIdAndUpdate(editid, {
                    title: title,
                    discription: discription,
                    avatar: img
                })
                if (data) {
                    console.log("Data Successfully edit");
                    return res.redirect('back');
                }
                else {
                    console.log(err);
                    return res.redirect('back');
                }
            }
            else {
                let img = "";

                let nochange = await blogtbl.findById(editid);
                if (nochange) {
                    img = nochange.avatar
                }
                let data = await blogtbl.findByIdAndUpdate(editid, {
                    title: title,
                    discription: discription,
                    avatar: img
                })
                if (data) {
                    console.log("Data Successfully edit");
                    req.flash('success', 'Record Successfully updated');
                    return res.redirect('back');
                }
                else {
                    console.log(err);
                    return res.redirect('back');
                }
            }
        }
        else {
            let img = "";
            if (req.file) {
                img = req.file.path
            }
            if (!title || !discription) {
                console.log("Enter All data");
                return res.redirect('back')
            }
            let data = await blogtbl.create({
                title: title,
                discription: discription,
                avatar: img
            })
            if (data) {
                console.log("Data Successfully Add");
                req.flash('success', 'Record Successfully Add');
                return res.redirect('back');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }

        }
    }
    catch (err) {
        console.log(err);
        return false
    }

}

const viewblog = async (req, res) => {
    try {
        let viewdata = await blogtbl.find({})
        if (viewdata) {
            return res.render('viewblog', {
                viewdata
            });
        }
        else {
            console.log("record not found");
            return false
        }
    }
    catch (err) {
        console.log(err);
        return false
    }
}

const deletedata = async (req, res) => {
    try {

        let id = req.query.id;
        let deletedata = await blogtbl.findByIdAndDelete(id);
        let deleterecord = await crudtbl.findById(id);
        if (deleterecord) {
            fs.unlinkSync(deleterecord.avatar)
        }
        else {
            console.log("data not deleted");
        }
        if (deletedata) {
            console.log("data delete sucsefully");
            req.flash('danger', 'Data delete sucsefully');
            return res.redirect('back');
        }
        else {
            console.log("data not found");
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err);
        return false
    }

}
const editdata = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await blogtbl.findById(id);
        if (single) {
            return res.render('addblog', {
                single
            });
        }
    }
    catch (err) {
        console.log(err);
        return false
    }
}

const profile = async (req, res) => {
    return res.render('profile')
}

const profiledata = async (req, res) => {
    const { editid, name, password } = req.body;
    if (!name || !password) {
        console.log("data reqired compullsery");
        return res.redirect('back')
    }
    let profile = await crudtbl.findByIdAndUpdate(editid, {
        name: name,
        password: password,
    });
    if (profile) {
        console.log("profile updata");
        req.flash('success', 'profile Updated succesfully');
        return res.redirect('back');
    }
    else {
        console.log("data not found");
        return res.redirect('back');
    }
}

const forgot = (req, res) => {
    return res.render('forgot')
}

const forgotemail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const useremail = req.body.email;
        let chekEmail = await crudtbl.findOne({ email: email });
        if (chekEmail) {
            // Create a transporter using your email service provider's SMTP settings
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'rwngunjan8308@gmail.com',
                    pass: 'izdizjkslbwsfwak'
                }
            });
            // Generate a random OTP
            const generateOTP = () => {
                const digits = '0123456789';
                let otp = '';
                for (let i = 0; i < 6; i++) {
                    otp += digits[Math.floor(Math.random() * 10)];
                }
                return otp;
            };
            // Send OTP via email
            const sendOTP = (email, otp) => {
                const mailOptions = {
                    from: 'rwngunjan8308@gmail.com',
                    to: useremail,
                    subject: 'One-Time Password (OTP) verification',
                    text: `Your OTP is: ${otp}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                    } else {
                        let obj = {
                            otp: otp,
                            email: useremail
                        }
                        res.cookie('Userotp', obj);
                        // console.log('Email sent: ' + info.response);
                        return res.redirect('/otp');
                    }
                });
            };

            // Example usage
            const email = useremail;
            const otp = generateOTP();
            sendOTP(email, otp);
        } else {
            req.flash('danger', 'Email not found');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const otp = (req, res) => {
    return res.render('otp')
}

const postotp = async (req, res) => {
    if (req.cookies.Userotp.otp == req.body.otp) {
        return res.redirect('/newpass');
    } else {
        req.flash('danger', "Otp is wrong");
        return res.redirect('back');
    }
}

const newpass = (req, res) => {
    return res.render('newpass');
}

const postnew = async (req, res) => {
    try {
        let email = req.cookies.Userotp.email
        const { pass, cpass } = req.body;
        if (cpass == pass) {
            let editPassword = await crudtbl.findOneAndUpdate({ email }, {
                password: pass
            })
            console.log(editPassword);
            if (editPassword) {
                res.clearCookie('Userotp');
                return res.redirect('/');

            } else {
                console.log("password not update");
                return res.redirect('back');
            }
        } else {
            console.log("confirm and newpassword not match");
            return res.redirect('back');
        }
    }
    catch (err) {
        return res.redirect('back');
    }
}
module.exports = {
    login,
    register,
    registerData,
    logdata,
    index,
    logout,
    AddBlog,
    viewblog,
    blogadd,
    deletedata,
    editdata,
    profile,
    profiledata,
    forgot,
    forgotemail,
    otp,
    postotp,
    newpass,
    postnew

}