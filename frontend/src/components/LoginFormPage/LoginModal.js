import React from "react";
import LoginFormPage from ".";
import './modal.css'


function Modal({setModalOpen}){
    // function disableScroll (){
    //     const topS = window.pageYOffset || document.documentElement.scrollTop;
    //     window.onscroll = function () {
    //         window.scrollTo(topS)
    //     }
    // }
    // function allowScroll (){
    //     window.onscroll = function (){}
    // }



    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="exitLogin">
                <button className="xbutt" onClick={() => setModalOpen(false)} to='/'><i class="fa-solid fa-circle-xmark"></i></button>
                </div>
                <div className="loginInfo">
                    <LoginFormPage setModalOpen={setModalOpen} />
                </div>
            </div>
        </div>
    )
}
export default Modal
