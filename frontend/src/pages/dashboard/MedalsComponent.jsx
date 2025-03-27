import React, { useState, useEffect } from 'react';
import Gold from "../../assets/gold.svg";
import Silver from "../../assets/silver.svg";
import Bronze from "../../assets/bronze.svg";
import GoldCoin from "../../assets/gold_coin.svg";
import SilverCoin from "../../assets/silver_coin.svg";
import BronzeCoin from "../../assets/bronze_coin.svg";
import { medalsData } from "../../data/MedalsData";

const MedalsComponent = () => {
    const coinImages = {
        BronzeCoin: BronzeCoin,
        SilverCoin: SilverCoin,
        GoldCoin: GoldCoin,
    };

    const [goldCount, setGoldCount] = useState(0);
    const [silverCount, setSilverCount] = useState(0);
    const [bronzeCount, setBronzeCount] = useState(0);

    const calculateMedals = () => {
        let gold = 0, silver = 0, bronze = 0;

        medalsData.forEach((medal) => {
            medal.levels.forEach((level) => {
                if (level.isCompleted) {
                    if (level.name === "Gold") gold++;
                    if (level.name === "Silver") silver++;
                    if (level.name === "Bronze") bronze++;
                }
            });
        });

        setGoldCount(gold);
        setSilverCount(silver);
        setBronzeCount(bronze);
    };

    useEffect(() => {
        calculateMedals();
    }, []);

    return (
        <div id="medalsComponent">
            <div>
                <div style={{ display: "flex", alignItems: "center", borderRadius: "5px", flex: "1", justifyContent: "space-around" }}>
                    <div className="medalgold medal">
                        <img src={Gold} alt="Gold Medal" />
                    </div>
                    <div className='number-box'>{goldCount}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", borderRadius: "5px", flex: "1", justifyContent: "space-around" }}>
                    <div className="medalsilver medal">
                        <img src={Silver} alt="Silver Medal" />
                    </div>
                    <div className='number-box'>{silverCount}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", borderRadius: "5px", flex: "1", justifyContent: "space-around" }}>
                    <div className="medalbronze medal">
                        <img src={Bronze} alt="Bronze Medal" />
                    </div>
                    <div className='number-box'>{bronzeCount}</div>
                </div>
            </div>
            <div id="medalTasks">
                {medalsData.map((medal) => (
                    <div className="medal-container" key={medal.title}>
                        <div>
                            <div className="medal-title">{medal.title}</div>
                            {medal.levels.map((level) => (
                                <div className={`medal-level ${level.name.toLowerCase()} ${
                                    level.isCompleted ? "completed" : "not-completed"
                                }`} key={level.name}>
                                    <span>{level.tasks}</span>
                                    <div className={level.name}>
                                        <img src={coinImages[level.coin]} alt={`${level.name} Coin`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedalsComponent;
