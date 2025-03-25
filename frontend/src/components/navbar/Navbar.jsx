import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useTasks } from "../../contexts/TaskContexts";
import MusicPlayer from "../musicPlayer/MusicPlayer";
defineElement(lottie.loadAnimation);

const NavBar = () => {
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState(0);
    const username = "NewUser";
    const [studentCorner, setStudentCorner] = useState(false);
    const [profCorner, setProfCorner] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const { tasks } = useTasks();


    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    useEffect(() => {
        const countUncompletedTasks = tasks.filter(
            (task) => !task.isCompleted
        ).length;
        setUncompletedTasksCount(countUncompletedTasks);
    }, [tasks]);

    const letterColors = (letter) => {
        const colors = {
            A: "#D3C047",
            B: "#D99228",
            C: "#C67947",
            D: "#D94A28",
            E: "#D94337",
            F: "#CD3F66",
            G: "#E2597D",
            H: "#D36576",
            I: "#EDA29B",
            J: "#C84F8B",
            K: "#A659C9",
            L: "#822436",
            M: "#632838",
            N: "#6CD2DF",
            O: "#27A1C4",
            P: "#2F83DB",
            Q: "#2C44BE",
            R: "#27455F",
            S: "#57311C",
            T: "#121212",
            U: "#8ED029",
            V: "#2DAF27",
            W: "#279479",
            X: "#2F8347",
            Y: "#6B7C46",
            Z: "#324317"
        };

        return colors[letter?.toUpperCase()] || "#888";
    };

    return (
        <div id="menu" style={{ flex: isNavbarOpen ? 0.7 : 0.1, cursor: "pointer" }}>
            <div id="openClose" onClick={toggleNavbar}>
                <box-icon name='menu'></box-icon>
                <span style={{ display: isNavbarOpen ? "block" : "none" }}>Menu</span>
            </div>

            <div>
                <div className="tasks" style={{ marginTop: "20px", display: !isNavbarOpen ? "block" : "none" }}><box-icon name='music' type='solid'></box-icon></div>
                <div style={{ display: isNavbarOpen ? "block" : "none" }}>
                    <MusicPlayer />
                </div>
            </div>

            <div id="tasks">
                <ul>
                    <div className="tasks">
                        <box-icon name="dashboard" type="solid"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            Dashboard
                        </li>
                    </div>
                    <NavLink to="/todo" className="nav-link" activeClassName="active">
                        <div className="tasks">
                            <box-icon name='task'></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }} onClick={() => { setProfCorner(false); setStudentCorner(false) }}>
                                To Do
                            </li>
                            <div
                                className="number"
                                style={{ display: isNavbarOpen ? "block" : "none" }}
                            >
                                <span>{uncompletedTasksCount}</span>
                            </div>
                        </div>
                    </NavLink>
                    {/* <div className="tasks">
                        <box-icon name="calendar"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            Calendar
                        </li>
                    </div> */}
                    <NavLink to="/community" className="nav-link" activeClassName="active" onClick={() => { setProfCorner(false); setStudentCorner(false) }}>
                        <div className="tasks">
                            <box-icon name="message-rounded-detail"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Community
                            </li>
                        </div>
                    </NavLink>
                    {/* </ul> */}

                    {/* Student Corner */}
                    {/* <br /> */}
                    {/* <div
                    style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
                    onClick={() => {
                        setStudentCorner(!studentCorner);
                        setProfCorner(false);
                    }}
                >
                    <box-icon
                        name="chevrons-right"
                        style={{
                            transform: `rotate(${studentCorner ? "90deg" : "0"})`,
                            transition: "0.3s ease"
                        }}
                    ></box-icon>
                    <p style={{ display: isNavbarOpen ? "block" : "none" }}>Student Corner</p>
                </div> */}

                    <NavLink to="/notes" className="nav-link" activeClassName="active">
                    <div className="tasks">
                        <box-icon name="note"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            Notes
                        </li>
                    </div>
                    </NavLink>
                    <div className="tasks">
                        <box-icon name="image-add"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            SnapSolver
                        </li>
                    </div>
                    <div className="tasks">
                        <box-icon name="brain"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            B.R.A.I.N.
                        </li>
                    </div>
                    {/* </ul> */}

                    {/* Professional Corner */}
                    {/* <br /> */}
                    {/* <div
                    style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
                    onClick={() => {
                        setProfCorner(!profCorner);
                        setStudentCorner(false);
                    }}
                >
                    <box-icon
                        name="chevrons-right"
                        style={{
                            transform: `rotate(${profCorner ? "90deg" : "0"})`,
                            transition: "0.3s ease"
                        }}
                    ></box-icon>
                    <p style={{ display: isNavbarOpen ? "block" : "none" }}>Professional Corner</p>
                </div> */}

                    {/* <ul> */}
                    <NavLink to="/interview" className="nav-link" activeClassName="active">
                        <div className="tasks">
                            <box-icon name="laptop"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Interview Preparation
                            </li>
                        </div>
                    </NavLink>
                    <NavLink to="/resume" className="nav-link" activeClassName="active">
                        <div className="tasks">
                            <box-icon name="file"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Resume Scorer
                            </li>
                        </div>
                    </NavLink>
                </ul>
            </div>

            {/* Logout Button */}
            <div id="logoutButton" style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto"}}>
                <div id="userprofile" style={{ display: "flex", alignItems: "center" }}>
                    <div
                        id="profileLogo"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            backgroundColor: letterColors(username?.charAt(0)), // Get color based on first letter
                            color: "#fff", // White text for contrast
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        {username?.charAt(0)}
                    </div>
                    <div
                        id="username"
                        style={{
                            display: isNavbarOpen ? "flex" : "none",
                        }}
                    >
                        {username}
                    </div>
                </div>
                {isNavbarOpen && (<div style={{display:"flex", gap:"5px" ,alignItems:"center"}}>
                    <box-icon name="power-off" color="#aaa" size="20px"></box-icon>
                    <p>Logout</p>
                </div>)}
            </div>
        </div>

    );
};

export default NavBar;
