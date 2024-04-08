import React, { useEffect, useState } from "react";
import './contacts.css'
import linkedinLogo from './images/icons8-linkedin.svg';

const ContactUs = () => {
    const [user1, setUser1] = useState({});
    const [user2, setUser2] = useState({});
    const [user3, setUser3] = useState({});
    const [user4, setUser4] = useState({});

    useEffect(() => {
        const getDetails1 = async () => {
            try {
                const url = `/api/user/65f1f14d8004f96cbd47dc4f`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                // console.log(data)
                setUser1(data.data[0]);
                console.log(user1)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails2 = async () => {
            try {
                const url = `/api/user/66137583befd265f6d516515`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser2(data.data[0]);
                console.log(user2)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails3 = async () => {
            try {
                const url = `/api/user/6613762a48c7053a80577d55`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser3(data.data[0]);
                console.log(user3)
            } catch (err) {
                console.log(err);
            }
        };

        const getDetails4 = async () => {
            try {
                const url = `/api/user/6612dfa3dab80ee9151c24dd`;
                const res = await fetch(url);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                setUser4(data.data[0]);
                console.log(user4)
            } catch (err) {
                console.log(err);
            }
        };

        getDetails1();
        getDetails2();
        getDetails3();
        getDetails4();
    }, []);

    return (
        <div className="user-container mb-36 pt-20"> {/* Apply a container class */}
            <div className="user-info">
                {user1.profilePicture && <img src={user1.profilePicture} alt="User 1" className="user-img" />} {/* Apply class to img */}
                <p className="user-name">Prathamesh Khanna</p> {/* Apply class to name */}
                <a href="https://www.linkedin.com/in/prathamesh-khanna-1ba320258/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon ml-7" style={{ width: '50px', height: '50px' }} />
                </a>
            </div>
            <div className="user-info">
                {user2.profilePicture && <img src={user2.profilePicture} alt="User 2" className="user-img" />}
                <p className="user-name">Digambar Jail</p>
                <a href="https://www.linkedin.com/in/digambar-jail-114b20254/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon ml-7" style={{ width: '50px', height: '50px' }} />
                </a>
            </div>
            <div className="user-info">
                {user3.profilePicture && <img src={user3.profilePicture} alt="User 3" className="user-img" />}
                <p className="user-name">Nikunj Kadu</p>
                <a href="https://www.linkedin.com/in/nikunj-kadu-45a3b7292/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon ml-7" style={{ width: '50px', height: '50px' }} />
                </a>
            </div>
            <div className="user-info">
                {user4.profilePicture && <img src={user4.profilePicture} alt="User 4" className="user-img" />}
                <p className="user-name">Aarya Joshi</p>
                <a href="https://www.linkedin.com/in/aarya-joshi-4912b2293/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="linkedin-icon ml-7" style={{ width: '50px', height: '50px' }} />
                </a>
            </div>
        </div>
    );
};

export default ContactUs;
