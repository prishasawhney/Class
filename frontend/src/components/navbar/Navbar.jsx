import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useTasks } from "../../contexts/TaskContexts";
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

    return (
        <div id="menu" style={{ flex: isNavbarOpen ? 0.7 : 0.1 }}>
            <div id="userprofile">
                <lord-icon
                    src="https://cdn.lordicon.com/zfmcashd.json"
                    trigger="hover"
                    state="hover-jump"
                    style={{ width: "50px", height: "50px" }}
                    onClick={toggleNavbar}
                ></lord-icon>
                <p
                    id="username"
                    style={{
                        display: isNavbarOpen ? "flex" : "none",
                        position: "relative",
                        top: 11,
                        left: 4,
                    }}
                >
                    {username}
                </p>
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
                    <div className="tasks">
                        <box-icon name="calendar"></box-icon>
                        <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                            Calendar
                        </li>
                    </div>
                    <NavLink to="/community" className="nav-link" activeClassName="active" onClick={() => { setProfCorner(false); setStudentCorner(false) }}>
                        <div className="tasks">
                            <box-icon name="message-rounded-detail"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Community
                            </li>
                        </div>
                    </NavLink>
                </ul>

                {/* Student Corner */}
                <br />
                <div
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
                </div>
                {studentCorner && (
                    <ul>
                        <div className="tasks">
                            <box-icon name="note"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Notes
                            </li>
                        </div>
                        <div className="tasks">
                            <box-icon name="image-add"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                SnapSolver
                            </li>
                        </div>
                        <div className="tasks">
                            <box-icon name="brain"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Memory Cards
                            </li>
                        </div>
                        <div className="tasks">
                            <box-icon name="book-open"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Summarizer
                            </li>
                        </div>
                    </ul>
                )}

                {/* Professional Corner */}
                <br />
                <div
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
                </div>
                {profCorner && (
                    <ul>
                        <div className="tasks">
                            <box-icon name="laptop"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Interview Preparation
                            </li>
                        </div>
                        <div className="tasks">
                            <box-icon name="file"></box-icon>
                            <li style={{ display: isNavbarOpen ? "block" : "none" }}>
                                Resume Scorer
                            </li>
                        </div>
                    </ul>
                )}
            </div>

            {/* Logout Button */}
            <div id="logoutButton">
                <box-icon name="power-off" color="#aaa" size="20px"></box-icon>
                {isNavbarOpen && <p>Logout</p>}
            </div>
        </div>
    );
};

export default NavBar;
